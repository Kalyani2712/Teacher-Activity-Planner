import React from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Class', key: 'class' },
  { label: 'Subject', key: 'subject' },
  { label: 'Total Topics', key: 'totalTopics' },
  { label: 'Completed Topics', key: 'completedTopics' },
  { label: 'Remaining Topics', key: 'remainingTopics' },
  { label: 'Status', key: 'status' },
];

function SyllabusCompletionView({ data, onDelete, onEdit }) {
  const printRef = React.useRef();
  const navigate = useNavigate();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Class', 'Subject', 'Total Topics', 'Completed Topics', 'Remaining Topics', 'Status']],
      body: data.map(item => [item.class, item.subject, item.totalTopics, item.completedTopics, item.remainingTopics, item.status]),
    });
    doc.save('syllabus_completion.pdf');
  };

  const handleEdit = (entry) => {
    onEdit(entry);
    navigate('/syllabusReport');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Syllabus Completion Data View</Typography>

        <TableContainer component={Paper} sx={{ marginTop: 3 }} ref={printRef}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Class</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Total Topics</TableCell>
                <TableCell>Completed Topics</TableCell>
                <TableCell>Remaining Topics</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.class}</TableCell>
                  <TableCell>{entry.subject}</TableCell>
                  <TableCell>{entry.totalTopics}</TableCell>
                  <TableCell>{entry.completedTopics}</TableCell>
                  <TableCell>{entry.remainingTopics}</TableCell>
                  <TableCell>{entry.status}</TableCell>
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
            <CSVLink data={data} headers={headers} filename="syllabus_completion.csv">
              Export to CSV
            </CSVLink>
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleExportPDF} sx={{ marginRight: 2 }}>
            Export to PDF
          </Button>
          <Button variant="outlined" color="primary" onClick={handlePrint}>
            Print
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SyllabusCompletionView;
