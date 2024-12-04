import React, { useState, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
  Stack,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const headers = [
  { label: 'Class', key: 'className' },
  { label: 'Year', key: 'year' },
  { label: 'Semester', key: 'semester' },
  { label: 'Course Title', key: 'courseTitle' },
  { label: 'Outcome', key: 'outcome' },
  { label: 'Assessment Method', key: 'assessmentMethod' },
  { label: '% Attainment', key: 'percentAttainment' },
];

function CourseOutcomeView({ data }) {
  const printRef = useRef();
  const navigate = useNavigate();

  const [sortedData, setSortedData] = useState(data || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Class', 'Year', 'Semester', 'Course Title', 'Outcome', 'Assessment Method', '% Attainment']],
      body: sortedData.map((item) => [
        item.className,
        item.year,
        item.semester,
        item.courseTitle,
        item.outcome,
        item.assessmentMethod,
        item.percentAttainment,
      ]),
    });
    doc.save('course_outcomes.pdf');
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    setSortedData(
      data.filter((item) =>
        Object.values(item).some((val) =>
          val?.toString().toLowerCase().includes(query)
        )
      )
    );
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);
    const sorted = [...sortedData].sort((a, b) => {
      if (order === 'asc') {
        return a.courseTitle.localeCompare(b.courseTitle);
      } else {
        return b.courseTitle.localeCompare(a.courseTitle);
      }
    });
    setSortedData(sorted);
  };

  const handleEdit = (entry) => {
    navigate('/CourseOutcome', { state: { formData: entry } });
  };

  const handleDelete = (id) => {
    const updatedData = sortedData.filter((entry) => entry.id !== id);
    setSortedData(updatedData);
    toast.success('Record deleted successfully!');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.15)',
            padding: 4,
            overflow: 'hidden',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              marginBottom: 3,
              textAlign: 'center',
              color: '#333',
            }}
          >
            Course Outcome Records
          </Typography>

          <Box
            sx={{
              marginBottom: 3,
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <TextField
              label="Search Records"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ flex: 1, marginRight: 2, maxWidth: '300px' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">🔍</InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/CourseOutcome')}
              sx={{
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              Add New Record
            </Button>
          </Box>

          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOrder} onChange={handleSortChange}>
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>

          <TableContainer
            component={Paper}
            ref={printRef}
            sx={{
              borderRadius: '12px',
              border: '1px solid #e0e0e0',
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                  {headers.map((header) => (
                    <TableCell
                      key={header.key}
                      sx={{ fontWeight: 'bold', color: '#555' }}
                    >
                      {header.label}
                    </TableCell>
                  ))}
                  <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedData.length > 0 ? (
                  sortedData.map((entry, index) => (
                    <TableRow key={entry.id || index} hover>
                      <TableCell>{entry.className}</TableCell>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>{entry.semester}</TableCell>
                      <TableCell>{entry.courseTitle}</TableCell>
                      <TableCell>{entry.outcome}</TableCell>
                      <TableCell>{entry.assessmentMethod}</TableCell>
                      <TableCell>{entry.percentAttainment}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(entry)}
                            sx={{ color: '#3f51b5' }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(entry.id)}
                            sx={{ color: '#f44336' }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No course outcome records available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 3,
              gap: 2,
            }}
          >
            <CSVLink
              data={sortedData}
              headers={headers}
              filename="course_outcomes.csv"
              style={{
                textDecoration: 'none',
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{ fontWeight: 'bold' }}
              >
                Export CSV
              </Button>
            </CSVLink>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleExportPDF}
              sx={{ fontWeight: 'bold' }}
            >
              Export PDF
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handlePrint}
              sx={{ fontWeight: 'bold' }}
            >
              Print
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default CourseOutcomeView;
