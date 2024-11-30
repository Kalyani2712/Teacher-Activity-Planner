import React from 'react';
import { Container, Table, TableHead, TableRow, TableCell, TableBody, Box, IconButton, Button, TableContainer, Paper, Typography } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TeachingPlanView({ data = [], onDelete, onEdit }) { // Defaulting data to an empty array
  const history = useNavigate();

  const handleEdit = (entry) => {
    onEdit(entry);
    history('/TeachingPlan');
  };

  const handleAdd = () => {
    history('/TeachingPlan');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>Teaching Plan Data View</Typography>

        <Button variant="contained" color="primary" onClick={handleAdd} sx={{ marginBottom: 3 }}>
          Add New Teaching Plan
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Year</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Topics Allocated</TableCell>
                <TableCell>Planned Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(Array.isArray(data) ? data : []).map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.year}</TableCell>
                  <TableCell>{entry.class}</TableCell>
                  <TableCell>{entry.course}</TableCell>
                  <TableCell>{entry.topicsAllocated}</TableCell>
                  <TableCell>{entry.plannedDate}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(entry)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => onDelete(entry.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default TeachingPlanView;
