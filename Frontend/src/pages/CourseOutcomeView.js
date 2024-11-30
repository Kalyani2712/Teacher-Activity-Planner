import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { Navigate, useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Course Name', key: 'courseName' },
  { label: 'Learning Outcomes', key: 'learningOutcomes' },
  { label: 'Assessment Method', key: 'assessmentMethod' },
  { label: 'Achievement Level', key: 'achievementLevel' },
  { label: 'Feedback', key: 'feedback' },
];

function CourseOutcomeView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Course Name', 'Learning Outcomes', 'Assessment Method', 'Achievement Level', 'Feedback']],
      body: data.map(item => [item.courseName, item.learningOutcomes, item.assessmentMethod, item.achievementLevel, item.feedback]),
    });
    doc.save('course_outcome.pdf');
  };

  const handleEdit = (entry) => {
    onEdit(entry);
    Navigate('/course-outcome-entry');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Measurement of Course Outcome Data View</Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Course Name</TableCell>
                <TableCell>Learning Outcomes</TableCell>
                <TableCell>Assessment Method</TableCell>
                <TableCell>Achievement Level</TableCell>
                <TableCell>Feedback</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.courseName}</TableCell>
                  <TableCell>{entry.learningOutcomes}</TableCell>
                  <TableCell>{entry.assessmentMethod}</TableCell>
                  <TableCell>{entry.achievementLevel}</TableCell>
                  <TableCell>{entry.feedback}</TableCell>
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
            <CSVLink data={data} headers={headers} filename="course_outcome.csv">
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

export default CourseOutcomeView;
