import React, { useState } from 'react';
import { Button, TextField, Container, Grid, Typography, Box, MenuItem, Select, InputLabel, FormControl, IconButton, Divider } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TeachingPlanEntry() {
  const [formData, setFormData] = useState({
    year: '',
    class: '',
    month: '',
    semester: '',
    course: '',
    availablePeriod: '',
    title: '',
    paperNo: '',
    lectureDetails: [{ lecNo: '', topic: '', subTopic: '', plannedDate: '', actualDate: '', remark: '' }]
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLectureDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLectures = [...formData.lectureDetails];
    updatedLectures[index][name] = value;
    setFormData({ ...formData, lectureDetails: updatedLectures });
  };

  const addLectureDetail = () => {
    setFormData({ ...formData, lectureDetails: [...formData.lectureDetails, { lecNo: '', topic: '', subTopic: '', plannedDate: '', actualDate: '', remark: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teaching Plan Data:', formData);
    navigate('/TeachingPlanView');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Teaching Plan Entry
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Year and Class Dropdown Fields */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <TextField
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Class</InputLabel>
                <Select name="class" value={formData.class} onChange={handleChange}>
                  <MenuItem value="FY">FY</MenuItem>
                  <MenuItem value="SY">SY</MenuItem>
                  <MenuItem value="TY">TY</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Month and Semester Dropdown Fields */}
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Month</InputLabel>
                <Select name="month" value={formData.month} onChange={handleChange}>
                  <MenuItem value="January">January</MenuItem>
                  <MenuItem value="February">February</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Semester</InputLabel>
                <Select name="semester" value={formData.semester} onChange={handleChange}>
                  <MenuItem value="Semester 1">Semester 1</MenuItem>
                  <MenuItem value="Semester 2">Semester 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Course, Available Period, Title, Paper No Fields */}
            <Grid item xs={12}>
              <TextField fullWidth label="Course" variant="outlined" name="course" value={formData.course} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Available Period" variant="outlined" name="availablePeriod" value={formData.availablePeriod} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Title of the Page" variant="outlined" name="title" value={formData.title} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Paper No" variant="outlined" name="paperNo" value={formData.paperNo} onChange={handleChange} />
            </Grid>

            {/* Lecture Details Section */}
            <Grid item xs={12}>
              <Divider sx={{ marginBottom: 2 }} />
              <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
                Lecture Details
              </Typography>
              {formData.lectureDetails.map((lec, index) => (
                <Grid container key={index} spacing={2}>
                  <Grid item xs={1}>
                    <TextField label="Lec No" name="lecNo" value={lec.lecNo} onChange={(e) => handleLectureDetailChange(index, e)} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Topic" name="topic" value={lec.topic} onChange={(e) => handleLectureDetailChange(index, e)} />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField label="Subtopic" name="subTopic" value={lec.subTopic} onChange={(e) => handleLectureDetailChange(index, e)} />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField type="date" label="Planned Date" name="plannedDate" value={lec.plannedDate} onChange={(e) => handleLectureDetailChange(index, e)} InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField type="date" label="Actual Date" name="actualDate" value={lec.actualDate} onChange={(e) => handleLectureDetailChange(index, e)} InputLabelProps={{ shrink: true }} />
                  </Grid>
                  <Grid item xs={1}>
                    <TextField label="Remark" name="remark" value={lec.remark} onChange={(e) => handleLectureDetailChange(index, e)} />
                  </Grid>
                </Grid>
              ))}
              <Button variant="outlined" sx={{ marginTop: 2 }} onClick={addLectureDetail}>Add Lecture</Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit" fullWidth sx={{ padding: '12px' }}>
                Submit Teaching Plan
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default TeachingPlanEntry;
