import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { Navigate, useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Assessment Type', key: 'assessmentType' },
  { label: 'Course', key: 'course' },
  { label: 'Date', key: 'date' },
  { label: 'Total Marks', key: 'totalMarks' },
  { label: 'Marks Obtained', key: 'marksObtained' },
];

function CentralAssessmentView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Assessment Type', 'Course', 'Date', 'Total Marks', 'Marks Obtained']],
      body: data.map(item => [item.assessmentType, item.course, item.date, item.totalMarks, item.marksObtained]),
    });
    doc.save('central_assessment.pdf');
  };

  const handleEdit = (entry) => {
    onEdit(entry);
   Navigate('/central-assessment-entry');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Central Assessment Programme Data View</Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Assessment Type</TableCell>
                <TableCell>Course</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Total Marks</TableCell>
                <TableCell>Marks Obtained</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.assessmentType}</TableCell>
                  <TableCell>{entry.course}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.totalMarks}</TableCell>
                  <TableCell>{entry.marksObtained}</TableCell>
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
            <CSVLink data={data} headers={headers} filename="central_assessment.csv">
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

export default CentralAssessmentView;
