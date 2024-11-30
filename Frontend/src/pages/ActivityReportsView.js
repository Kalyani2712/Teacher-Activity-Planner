import React, { useState, useRef } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { Navigate, useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Activity Type', key: 'activityType' },
  { label: 'Description', key: 'description' },
  { label: 'Date', key: 'date' },
  { label: 'Class', key: 'class' },
  { label: 'Remarks', key: 'remarks' },
];

function ActivityReportsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const history = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Activity Type', 'Description', 'Date', 'Class', 'Remarks']],
      body: data.map(item => [item.activityType, item.description, item.date, item.class, item.remarks]),
    });
    doc.save('activity_reports.pdf');
  };

  const handleEdit = (entry) => {
    onEdit(entry);
    Navigate('/activity-reports-entry');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Activity Reports Data View</Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Activity Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.activityType}</TableCell>
                  <TableCell>{entry.description}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.class}</TableCell>
                  <TableCell>{entry.remarks}</TableCell>
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
            <CSVLink data={data} headers={headers} filename="activity_reports.csv">
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

export default ActivityReportsView;
