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
import axios from 'axios';

const AssignedLecturesView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState([
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Add new lecture if passed via state
  useEffect(() => {
    axios.get('http://localhost:5000/assignedlectures/'+localStorage.getItem('id')).then((response) => {
      setData(response.data);
    }).catch((error)=>{console.log(error)})
  }, [location.state, data]);

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
    toast.info('Record deleted!');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['className', 'courseName', 'totalPeriods', 'Year']],
      body: data.map((item) => [item.className, item.courseName, item.totalPeriods, item.year]),
    });
    doc.save('assigned_lectures.pdf');
  };

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courseName.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <TableCell>className</TableCell>
                  <TableCell>courseName</TableCell>
                  <TableCell>totalPeriods</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.className}</TableCell>
                    <TableCell>{item.courseName}</TableCell>
                    <TableCell>{item.totalPeriods}</TableCell>
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
