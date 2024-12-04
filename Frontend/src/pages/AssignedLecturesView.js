import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AssignedLecturesView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([
    { id: 1, class: 'First Year', subject: 'Mathematics', periods: 30, year: '2024-2025' },
    { id: 2, class: 'Second Year', subject: 'Physics', periods: 20, year: '2024-2025' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Add new lecture if passed via state
  useEffect(() => {
    if (location.state?.newLecture) {
      const newEntry = {
        id: data.length + 1,
        class: location.state.newLecture.className,
        subject: location.state.newLecture.courseName,
        periods: location.state.newLecture.totalPeriods,
        year: '2024-2025',
      };
      setData((prevData) => [...prevData, newEntry]);
    }
  }, [location.state, data]);

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    toast.info('Record deleted!');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Class', 'Subject', 'Periods', 'Year']],
      body: data.map((item) => [item.class, item.subject, item.periods, item.year]),
    });
    doc.save('assigned_lectures.pdf');
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: 4 }}>
          <Typography variant="h5" gutterBottom>
            Assigned Lectures Data View
          </Typography>

          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
          />

          <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Class</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Periods</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.class}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell>{item.periods}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          onClick={() => alert(`Edit functionality for ${item.id} pending.`)}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(item.id)} color="error">
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="success"
              onClick={exportToPDF}
              sx={{ fontWeight: 'bold' }}
            >
              Export PDF
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/assigned-lectures')}
            >
              Add New
            </Button>
          </Stack>
        </Box>
      </Container>

      <ToastContainer />
    </Box>
  );
};

export default AssignedLecturesView;
