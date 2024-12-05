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
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { CSVLink } from 'react-csv';
import { jsPDF } from 'jspdf';
import { useReactToPrint } from 'react-to-print';
import { useNavigate } from 'react-router-dom';

const headers = [
  { label: 'Principal Investigator', key: 'principalInvestigator' },
  { label: 'Co-Investigators', key: 'coInvestigators' },
  { label: 'Project Title', key: 'projectTitle' },
  { label: 'Duration', key: 'duration' },
  { label: 'Funding Agency', key: 'fundingAgency' },
  { label: 'Amount Sanctioned', key: 'amountSanctioned' },
  { label: 'Date of Sanction', key: 'dateOfSanction' },
  { label: 'Status', key: 'status' },
  { label: 'Date of Submission', key: 'dateOfSubmission' },
];

function ResearchProjectsView({ data, onDelete, onEdit }) {
  const printRef = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Principal Investigator', 'Co-Investigators', 'Project Title', 'Duration', 'Funding Agency', 'Amount Sanctioned', 'Date of Sanction', 'Status', 'Date of Submission']],
      body: data.map((item) => [
        item.principalInvestigator,
        item.coInvestigators,
        item.projectTitle,
        item.duration,
        item.fundingAgency,
        item.amountSanctioned,
        item.dateOfSanction,
        item.status,
        item.dateOfSubmission,
      ]),
    });
    doc.save('research_projects.pdf');
  };

  // Filter data by search term
  const filteredData = data.filter(
    (item) =>
      item.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.principalInvestigator.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.coInvestigators.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#1D2B64', // Gradient background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            padding: 4,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Research Projects Data View
          </Typography>

          {/* Add/Edit Button */}
          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/ResearchProjects')}
              size="small"
              sx={{ fontWeight: 'bold', borderRadius: '5px' }}
            >
              Add Project
            </Button>
          </Box>

          {/* Search Box */}
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
          />

          {/* Table */}
          <TableContainer component={Paper} ref={printRef} sx={{ marginBottom: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr. No.</TableCell>
                  <TableCell>Principal Investigator</TableCell>
                  <TableCell>Co-Investigators</TableCell>
                  <TableCell>Project Title</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Funding Agency</TableCell>
                  <TableCell>Amount Sanctioned</TableCell>
                  <TableCell>Date of Sanction</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Date of Submission</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((entry, index) => (
                  <TableRow key={entry.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{entry.principalInvestigator}</TableCell>
                    <TableCell>{entry.coInvestigators}</TableCell>
                    <TableCell>{entry.projectTitle}</TableCell>
                    <TableCell>{entry.duration}</TableCell>
                    <TableCell>{entry.fundingAgency}</TableCell>
                    <TableCell>{entry.amountSanctioned}</TableCell>
                    <TableCell>{entry.dateOfSanction}</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>{entry.dateOfSubmission}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          color="primary"
                          onClick={() => onEdit(entry)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          color="secondary"
                          onClick={() => onDelete(entry.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Export Buttons */}
          <Box sx={{ marginTop: 2 }}>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" color="primary">
                <CSVLink
                  data={filteredData}
                  headers={headers}
                  filename="research_projects.csv"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  Export to CSV
                </CSVLink>
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleExportPDF}>
                Export to PDF
              </Button>
              <Button variant="outlined" onClick={handlePrint}>
                Print
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResearchProjectsView;
