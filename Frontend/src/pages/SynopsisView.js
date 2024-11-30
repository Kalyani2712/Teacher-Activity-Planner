import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { Navigate, useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Class', key: 'class' },
  { label: 'Planned Topics', key: 'plannedTopics' },
  { label: 'Topics Covered', key: 'topicsCovered' },
  { label: 'Deviations', key: 'deviations' },
  { label: 'Comments', key: 'comments' },
];

function SynopsisView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Class', 'Planned Topics', 'Topics Covered', 'Deviations', 'Comments']],
      body: data.map(item => [item.class, item.plannedTopics, item.topicsCovered, item.deviations, item.comments]),
    });
    doc.save('synopsis.pdf');
  };

  const handleEdit = (entry) => {
    onEdit(entry);
   Navigate('/synopsis-entry');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Synopsis Data View</Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>Planned Topics</TableCell>
                <TableCell>Topics Covered</TableCell>
                <TableCell>Deviations</TableCell>
                <TableCell>Comments</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.class}</TableCell>
                  <TableCell>{entry.plannedTopics}</TableCell>
                  <TableCell>{entry.topicsCovered}</TableCell>
                  <TableCell>{entry.deviations}</TableCell>
                  <TableCell>{entry.comments}</TableCell>
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

        <Box sx={{ marginTop: 3 }}>
          <Button variant="outlined" color="primary" sx={{ marginRight: 2 }}>
            <CSVLink data={data} headers={headers} filename="synopsis.csv">
              Export to CSV
            </CSVLink>
          </Button>
          <Button variant="outlined" color="secondary" sx={{ marginRight: 2 }} onClick={handleExportPDF}>
            Export to PDF
          </Button>
          <Button variant="outlined" sx={{ marginRight: 2 }} onClick={handlePrint}>
            Print
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SynopsisView;
