import React, { useEffect, useState, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
  IconButton,
  Stack,
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TablePagination,
} from '@mui/material';
import { Edit, Delete, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useLocation, useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Teacher Name', key: 'teacherName' },
  { label: 'Examination Name', key: 'examinationName' },
  { label: 'Class', key: 'class' },
  { label: 'Sub/Course', key: 'subCourse' },
  { label: 'Total Sets', key: 'totalSets' },
  { label: 'Translation Required', key: 'translation' },
  { label: 'Start Date', key: 'startDate' },
  { label: 'Last Date', key: 'lastDate' },
  { label: 'Total Answer Books Assessed', key: 'totalAnswerBooksAssessed' },
  { label: 'No. of Supervisions', key: 'noOfSupervisions' },
];

function CentralAssessmentView() {
  const location = useLocation();
  const { formData } = location.state || {};
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('teacherName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const printRef = useRef();

  useEffect(() => {
    if (Array.isArray(formData)) {
      setData(formData);
    } else if (formData) {
      setData([formData]);
    }
  }, [formData]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          'Teacher Name',
          'Examination Name',
          'Class',
          'Sub/Course',
          'Total Sets',
          'Translation Required',
          'Start Date',
          'Last Date',
          'Total Answer Books Assessed',
          'No. of Supervisions',
        ],
      ],
      body: data.map((item) => [
        item.teacherName,
        item.examinationName,
        item.class,
        item.subCourse,
        item.totalSets,
        item.translation,
        item.startDate,
        item.lastDate,
        item.totalAnswerBooksAssessed,
        item.noOfSupervisions,
      ]),
    });
    doc.save('central_assessment_data.pdf');
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(
    (item) =>
      item.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.examinationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSortChange = (column) => {
    const isAscending = sortColumn === column && sortDirection === 'asc';
    setSortColumn(column);
    setSortDirection(isAscending ? 'desc' : 'asc');
  };

  const sortedData = filteredData.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const handleDeleteDialogOpen = (index) => {
    setDeleteDialogOpen(true);
    setDeleteIndex(index);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeleteIndex(null);
  };

  const handleDelete = () => {
    const updatedData = [...data];
    updatedData.splice(deleteIndex, 1);
    setData(updatedData);
    handleDeleteDialogClose();
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, backgroundColor: '#1D2B64', borderRadius: '10px' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
          Central Assessment Data View
        </Typography>
        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate('/CentralAssessment')}
            sx={{ fontWeight: 'bold' }}
          >
            Add New Entry
          </Button>
          <CSVLink data={data} headers={headers} filename="central_assessment_data.csv">
            <Button variant="outlined" sx={{ fontWeight: 'bold' }}>
              Export CSV
            </Button>
          </CSVLink>
          <Button variant="outlined" onClick={handleExportPDF} sx={{ fontWeight: 'bold' }}>
            Export PDF
          </Button>
          <Button variant="outlined" onClick={handlePrint} sx={{ fontWeight: 'bold' }}>
            Print
          </Button>
        </Stack>
        <TextField
          label="Search"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
          }}
          sx={{ marginBottom: 2 }}
        />
        <TableContainer component={Paper} ref={printRef} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
              <TableRow>
                <TableCell>Sr. No.</TableCell>
                {headers.map(({ label, key }) => (
                  <TableCell key={key}>
                    <Button
                      onClick={() => handleSortChange(key)}
                      sx={{ color: '#fff', textTransform: 'none' }}
                      endIcon={
                        sortColumn === key ? (
                          sortDirection === 'asc' ? (
                            <ArrowUpward />
                          ) : (
                            <ArrowDownward />
                          )
                        ) : null
                      }
                    >
                      {label}
                    </Button>
                  </TableCell>
                ))}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{currentPage * rowsPerPage + index + 1}</TableCell>
                  {headers.map(({ key }) => (
                    <TableCell key={key}>{item[key]}</TableCell>
                  ))}
                  <TableCell>
                    <IconButton onClick={() => handleDeleteDialogOpen(index)} color="error">
                      <Delete />
                    </IconButton>
                    <IconButton onClick={() => navigate(`/edit/${index}`)} color="primary">
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredData.length}
          page={currentPage}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this entry? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default CentralAssessmentView;
