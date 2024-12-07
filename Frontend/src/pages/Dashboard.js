import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, CardActions, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Assignment, AccessTime, Group, LibraryBooks, RateReview, Book } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart, Bar } from 'recharts';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';

// Sample Data for demonstration
const initialData = [
  { name: 'Mon', lectures: 10, leave: 2, teacherPlan: 3, syllabusCompletion: 5 },
  { name: 'Tue', lectures: 12, leave: 1, teacherPlan: 4, syllabusCompletion: 6 },
  { name: 'Wed', lectures: 15, leave: 3, teacherPlan: 5, syllabusCompletion: 7 },
  { name: 'Thu', lectures: 14, leave: 2, teacherPlan: 6, syllabusCompletion: 8 },
  { name: 'Fri', lectures: 18, leave: 1, teacherPlan: 7, syllabusCompletion: 9 },
];

const timetableData = [
  { day: 'Monday', time: '9:00 AM - 10:00 AM', subject: 'Mathematics', year: 'FY' },
  { day: 'Monday', time: '10:00 AM - 11:00 AM', subject: 'Physics', year: 'SY' },
  { day: 'Tuesday', time: '9:00 AM - 10:00 AM', subject: 'Chemistry', year: 'TY' },
  { day: 'Tuesday', time: '10:00 AM - 11:00 AM', subject: 'Biology', year: 'FY' },
  { day: 'Wednesday', time: '9:00 AM - 10:00 AM', subject: 'English', year: 'SY' },
  { day: 'Wednesday', time: '10:00 AM - 11:00 AM', subject: 'History', year: 'TY' },
  { day: 'Thursday', time: '9:00 AM - 10:00 AM', subject: 'Computer Science', year: 'FY' },
  { day: 'Thursday', time: '10:00 AM - 11:00 AM', subject: 'Geography', year: 'SY' },
  { day: 'Friday', time: '9:00 AM - 10:00 AM', subject: 'Physical Education', year: 'TY' },
  { day: 'Friday', time: '10:00 AM - 11:00 AM', subject: 'Music', year: 'FY' },
];

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [selectedYear, setSelectedYear] = useState('FY');
  const [timetable, setTimetable] = useState(timetableData);
  const [newEntry, setNewEntry] = useState({ day: '', time: '', subject: '', year: '' });
  const [editableRow, setEditableRow] = useState(null); // Track the row being edited
  const navigate = useNavigate();

  // Handle adding a new timetable entry
  const handleAddTimetable = () => {
    setTimetable([...timetable, newEntry]);
    setNewEntry({ day: '', time: '', subject: '', year: '' }); // Reset after adding
  };

  // Handle deleting a timetable entry
  const handleDeleteTimetable = (index) => {
    const updatedTimetable = timetable.filter((_, i) => i !== index);
    setTimetable(updatedTimetable);
  };

  // Handle editing a timetable entry
  const handleEditTimetable = (index) => {
    setEditableRow(index); // Set the row to be edited
    setNewEntry(timetable[index]); // Set form values to the selected entry
  };

  // Handle year filter change
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Filter timetable data by selected year
  const filteredTimetable = timetable.filter(entry => entry.year === selectedYear);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f0f8ff', padding: 2 }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ width: '100%', padding: 2, backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: 3 }}>
        <Container maxWidth="lg">
          <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#ff4081', fontFamily: '', fontWeight: 'bold' }}>
              Teacher Dashboard
            </Typography>

            {/* Dashboard Cards */}
            <Grid container spacing={2} justifyContent="center">
              {/* Assigned Lectures Card */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#f1f8e9', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#3f51b5' }}>Assigned Lectures</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                      <Assignment sx={{ fontSize: 50, color: '#3f51b5', marginRight: 2 }} />
                      <Typography variant="h5" sx={{ fontSize: '1.5rem', color: '#3f51b5' }}>
                        {data.reduce((acc, day) => acc + day.lectures, 0)} Lectures
                      </Typography>
                    </Box>
                    <CardActions>
                      <Button variant="contained" color="primary" onClick={() => navigate('/assigned-lectures-view')}>
                        View Details
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>

              {/* Teaching Plan Card */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#e8f5e9', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#388e3c' }}>Teaching Plan</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                      <LibraryBooks sx={{ fontSize: 50, color: '#388e3c', marginRight: 2 }} />
                      <Typography variant="h5" sx={{ fontSize: '1.5rem', color: '#388e3c' }}>
                        {data.reduce((acc, day) => acc + day.teacherPlan, 0)} Plans
                      </Typography>
                    </Box>
                    <CardActions>
                      <Button variant="contained" color="primary" onClick={() => navigate('/TeachingPlanView')}>
                        View Details
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>

              {/* Leave Record Card */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#fff3e0', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#ff5722' }}>Leave Record</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                      <AccessTime sx={{ fontSize: 50, color: '#ff5722', marginRight: 2 }} />
                      <Typography variant="h5" sx={{ fontSize: '1.5rem', color: '#ff5722' }}>
                        {data.reduce((acc, day) => acc + day.leave, 0)} Leaves
                      </Typography>
                    </Box>
                    <CardActions>
                      <Button variant="contained" color="primary" onClick={() => navigate('/leave-records-view')}>
                        View Details
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>

              {/* Syllabus Completion Card */}
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#e1bee7', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#8e24aa' }}>Syllabus Completion</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1 }}>
                      <RateReview sx={{ fontSize: 50, color: '#8e24aa', marginRight: 2 }} />
                      <Typography variant="h5" sx={{ fontSize: '1.5rem', color: '#8e24aa' }}>
                        {data.reduce((acc, day) => acc + day.syllabusCompletion, 0)} Completed
                      </Typography>
                    </Box>
                    <CardActions>
                      <Button variant="contained" color="primary" onClick={() => navigate('/SyllabusCompletionView')}>
                        View Details
                      </Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Analytics Reports */}
            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: 3 }}>
              {/* Report 1 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#1976d2' }}>Weekly Lecture Analysis</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="lectures" stroke="#1976d2" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Report 2 */}
              {/* <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: '#f1f8e9', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#388e3c' }}>Leave Analysis</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="leave" fill="#388e3c" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid> */}

              {/* Report 3 */}
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ backgroundColor: '#fff9c4', boxShadow: 6, borderRadius: '12px', padding: 2 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontSize: '1.2rem', color: '#fbc02d' }}>Syllabus Progress</Typography>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={data}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="syllabusCompletion" fill="#fbc02d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/* Timetable */}
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6" gutterBottom>
                Weekly Timetable
              </Typography>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={handleYearChange}
                >
                  <MenuItem value="FY">FY</MenuItem>
                  <MenuItem value="SY">SY</MenuItem>
                  <MenuItem value="TY">TY</MenuItem>
                </Select>
              </FormControl>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Day</TableCell>
                      <TableCell>Time</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Year</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTimetable.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.day}</TableCell>
                        <TableCell>{entry.time}</TableCell>
                        <TableCell>{entry.subject}</TableCell>
                        <TableCell>{entry.year}</TableCell>
                        <TableCell>
                          <Button variant="outlined" onClick={() => handleEditTimetable(index)}>
                            Edit
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            sx={{ marginLeft: 1 }}
                            onClick={() => handleDeleteTimetable(index)}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Form to Add/Edit Timetable Entry */}
              <Box sx={{ marginTop: 2 }}>
                <TextField
                  label="Day"
                  variant="outlined"
                  value={newEntry.day}
                  onChange={(e) => setNewEntry({ ...newEntry, day: e.target.value })}
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Time"
                  variant="outlined"
                  value={newEntry.time}
                  onChange={(e) => setNewEntry({ ...newEntry, time: e.target.value })}
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Subject"
                  variant="outlined"
                  value={newEntry.subject}
                  onChange={(e) => setNewEntry({ ...newEntry, subject: e.target.value })}
                  sx={{ marginRight: 2 }}
                />
                <TextField
                  label="Year"
                  variant="outlined"
                  value={newEntry.year}
                  onChange={(e) => setNewEntry({ ...newEntry, year: e.target.value })}
                  sx={{ marginRight: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTimetable}
                  sx={{ marginLeft: 2 }}
                >
                  {editableRow === null ? 'Add Entry' : 'Save Changes'}
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Dashboard;
