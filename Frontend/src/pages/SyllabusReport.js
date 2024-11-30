import React, { useState } from 'react';
import { Container, Typography, Box, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function SyllabusCompletionPage() {
  const [syllabusData, setSyllabusData] = useState([]);
  const [formData, setFormData] = useState({
    className: '',
    subject: '',
    totalTopics: '',
    completedTopics: '',
    remainingTopics: '',
    status: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSyllabusData([...syllabusData, { ...formData, id: Date.now() }]);
    setFormData({
      className: '',
      subject: '',
      totalTopics: '',
      completedTopics: '',
      remainingTopics: '',
      status: ''
    });
  };

  const handleEdit = (id) => {
    const item = syllabusData.find((entry) => entry.id === id);
    setFormData(item);
    setSyllabusData(syllabusData.filter((entry) => entry.id !== id));
  };

  const handleDelete = (id) => {
    setSyllabusData(syllabusData.filter((entry) => entry.id !== id));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>
          Syllabus Completion Record
        </Typography>

        <form onSubmit={handleSubmit}>
          <Paper sx={{ padding: 2, marginBottom: 3 }}>
            <Typography variant="h6" gutterBottom>
              Enter Syllabus Completion Details
            </Typography>
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
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
                  <TableRow>
                    <TableCell>
                      <input
                        type="text"
                        name="className"
                        value={formData.className}
                        onChange={handleChange}
                        placeholder="Enter Class"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter Subject"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        name="totalTopics"
                        value={formData.totalTopics}
                        onChange={handleChange}
                        placeholder="Total Topics"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        name="completedTopics"
                        value={formData.completedTopics}
                        onChange={handleChange}
                        placeholder="Completed Topics"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="number"
                        name="remainingTopics"
                        value={formData.remainingTopics}
                        onChange={handleChange}
                        placeholder="Remaining Topics"
                      />
                    </TableCell>
                    <TableCell>
                      <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        placeholder="Status"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" type="submit">
                        Add Record
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </form>

        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Syllabus Completion Records
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
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
                {syllabusData.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.className}</TableCell>
                    <TableCell>{entry.subject}</TableCell>
                    <TableCell>{entry.totalTopics}</TableCell>
                    <TableCell>{entry.completedTopics}</TableCell>
                    <TableCell>{entry.remainingTopics}</TableCell>
                    <TableCell>{entry.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(entry.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(entry.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
}

export default SyllabusCompletionPage;
