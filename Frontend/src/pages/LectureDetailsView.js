import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { Navigate,  useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Date', key: 'date' },
  { label: 'Class', key: 'class' },
  { label: 'Subject', key: 'subject' },
  { label: 'Lecture Topic', key: 'lectureTopic' },
  { label: 'Duration', key: 'duration' },
];

function LectureDetailsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Date', 'Class', 'Subject', 'Lecture Topic', 'Duration']],
      body: data.map(item => [item.date, item.class, item.subject, item.lectureTopic, item.duration]),
    });
    doc.save('lecture_details.pdf');
  };

  const handleEdit = (entry) => {
    onEdit(entry);
    Navigate('/lecture-details-entry');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Lecture Details Data View</Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Lecture Topic</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.class}</TableCell>
                  <TableCell>{entry.subject}</TableCell>
                  <TableCell>{entry.lectureTopic}</TableCell>
                  <TableCell>{entry.duration}</TableCell>
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
            <CSVLink data={data} headers={headers} filename="lecture_details.csv">
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

export default LectureDetailsView;
