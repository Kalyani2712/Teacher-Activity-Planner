import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const headers = [
  { label: 'Class', key: 'className' },
  { label: 'Semester', key: 'semester' },
  { label: 'Paper No', key: 'paperNo' },
  { label: 'Paper Title', key: 'paperTitle' },
  { label: 'Month', key: 'month' },
  { label: 'Planned', key: 'syllabusPlanned' },
  { label: 'Remaining', key: 'syllabusRemained' },
  { label: 'Remark', key: 'remark' },
];

function SyllabusCompletionView() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const printRef = useRef();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [filteredData, setFilteredData] = useState(
    state?.formData ? [{ ...state.formData, id: Math.random() }] : []
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const dataToDisplay = filteredData.filter((entry) =>
    Object.values(entry).some((val) =>
      val?.toString().toLowerCase().includes(searchTerm)
    )
  );

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        [
          'Class',
          'Semester',
          'Paper No',
          'Paper Title',
          'Month',
          'Planned',
          'Remaining',
          'Remark',
        ],
      ],
      body: dataToDisplay.map((item) => [
        item.className,
        item.semester,
        item.paperNo,
        item.paperTitle,
        item.month,
        item.syllabusPlanned,
        item.syllabusRemained,
        item.remark,
      ]),
      styles: { halign: 'center' },
    });
    doc.save('syllabus_data.pdf');
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...dataToDisplay].sort((a, b) => {
      if (order === 'asc') {
        return a.className.localeCompare(b.className);
      } else {
        return b.className.localeCompare(a.className);
      }
    });
    setFilteredData(sorted);
  };

  const handleEdit = (entry) => {
    navigate('/SyllabusReport', { state: { formData: entry } });
  };

  const handleDelete = (id) => {
    const updatedData = filteredData.filter((entry) => entry.id !== id);
    setFilteredData(updatedData);
    toast.success('Record deleted successfully!');
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Syllabus Completion Records
        </Typography>

        {/* Search and Add New Record */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 3,
            flexWrap: 'wrap',
          }}
        >
          <TextField
            label="Search Records"
            variant="outlined"
            onChange={handleSearch}
            fullWidth
            sx={{ maxWidth: '300px', marginBottom: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() =>
              navigate('/SyllabusReport', { state: { formData: {} } })
            }
            sx={{ marginLeft: 2, height: 'fit-content', borderRadius: 2 }}
          >
            Add New Record
          </Button>
        </Box>

        {/* Sort Dropdown */}
        <FormControl fullWidth sx={{ marginBottom: 3 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOrder}
            onChange={handleSortChange}
            label="Sort By"
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        {/* Table with scroll on smaller screens */}
        <TableContainer
          component={Paper}
          ref={printRef}
          sx={{
            maxHeight: '500px',
            overflow: 'auto',
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main', color: 'white' }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Class
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Semester
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Paper No
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Paper Title
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Month
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Planned
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Remaining
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Remark
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataToDisplay.length > 0 ? (
                dataToDisplay.map((entry) => (
                  <TableRow
                    key={entry.id}
                    sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}
                  >
                    <TableCell>{entry.className}</TableCell>
                    <TableCell>{entry.semester}</TableCell>
                    <TableCell>{entry.paperNo}</TableCell>
                    <TableCell>{entry.paperTitle}</TableCell>
                    <TableCell>{entry.month}</TableCell>
                    <TableCell>{entry.syllabusPlanned}</TableCell>
                    <TableCell>{entry.syllabusRemained}</TableCell>
                    <TableCell>{entry.remark}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(entry)}
                          sx={{ color: 'primary.main' }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(entry.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    align="center"
                    sx={{ color: 'text.secondary' }}
                  >
                    No syllabus records available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Export and Print Buttons */}
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ borderRadius: 2 }}
            >
              <CSVLink
                data={dataToDisplay}
                headers={headers}
                filename="syllabus_data.csv"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                Export to CSV
              </CSVLink>
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              sx={{ borderRadius: 2 }}
              onClick={handleExportPDF}
            >
              Export to PDF
            </Button>
            <Button
              variant="outlined"
              size="small"
              sx={{ borderRadius: 2 }}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}

export default SyllabusCompletionView;
