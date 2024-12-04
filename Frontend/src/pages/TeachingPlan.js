import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
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
    lectureDetails: [
      { lecNo: '', topic: '', subTopic: '', plannedDate: '', actualDate: '', remark: '' },
    ],
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
    setFormData({
      ...formData,
      lectureDetails: [
        ...formData.lectureDetails,
        { lecNo: '', topic: '', subTopic: '', plannedDate: '', actualDate: '', remark: '' },
      ],
    });
  };

  const removeLectureDetail = (index) => {
    const updatedLectures = formData.lectureDetails.filter((_, idx) => idx !== index);
    setFormData({ ...formData, lectureDetails: updatedLectures });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Teaching Plan Data:', formData);
    navigate('/TeachingPlanView');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2c3e50, #3498db)', // Gradient background
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            padding: 4,
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: 'center', fontWeight: 'bold', color: '#333' }}
          >
            Teaching Plan Entry
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* General Information Section */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Year"
                  variant="outlined"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <InputLabel>Class</InputLabel>
                  <Select name="class" value={formData.class} onChange={handleChange}>
                    <MenuItem value="FY">FY</MenuItem>
                    <MenuItem value="SY">SY</MenuItem>
                    <MenuItem value="TY">TY</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <InputLabel>Month</InputLabel>
                  <Select name="month" value={formData.month} onChange={handleChange}>
                    <MenuItem value="January">January</MenuItem>
                    <MenuItem value="February">February</MenuItem>
                    <MenuItem value="March">March</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
                  <InputLabel>Semester</InputLabel>
                  <Select name="semester" value={formData.semester} onChange={handleChange}>
                    <MenuItem value="Semester 1">Semester 1</MenuItem>
                    <MenuItem value="Semester 2">Semester 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Course Information Section */}
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Course"
                  variant="outlined"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Available Period"
                  variant="outlined"
                  name="availablePeriod"
                  value={formData.availablePeriod}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Paper No"
                  variant="outlined"
                  name="paperNo"
                  value={formData.paperNo}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                />
              </Grid>
            </Grid>

            {/* Lecture Details Section */}
            <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
            <Typography variant="h6" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
              Lecture Details
            </Typography>

            {formData.lectureDetails.map((lec, index) => (
              <Grid container key={index} spacing={2}>
                <Grid item xs={2}>
                  <TextField
                    label="Lec No"
                    name="lecNo"
                    value={lec.lecNo}
                    onChange={(e) => handleLectureDetailChange(index, e)}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="Topic"
                    name="topic"
                    value={lec.topic}
                    onChange={(e) => handleLectureDetailChange(index, e)}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    label="Subtopic"
                    name="subTopic"
                    value={lec.subTopic}
                    onChange={(e) => handleLectureDetailChange(index, e)}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  />
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    type="date"
                    label="Planned Date"
                    name="plannedDate"
                    value={lec.plannedDate}
                    onChange={(e) => handleLectureDetailChange(index, e)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    type="date"
                    label="Actual Date"
                    name="actualDate"
                    value={lec.actualDate}
                    onChange={(e) => handleLectureDetailChange(index, e)}
                    InputLabelProps={{ shrink: true }}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  />
                </Grid>

                <Grid item xs={13}>
                  <TextField
                    label="Remark"
                    name="remark"
                    value={lec.remark}
                    onChange={(e) => handleLectureDetailChange(index, e)}
                    sx={{ backgroundColor: '#f9f9f9', borderRadius: '5px' }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => removeLectureDetail(index)}
                    sx={{ width: '100%', marginTop: 1 }}
                  >
                    Remove Lecture
                  </Button>
                </Grid>
                <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
              </Grid>
            ))}

            <Button
              variant="contained"
              sx={{ width: '100%', marginTop: 2 }}
              onClick={addLectureDetail}
            >
              Add Lecture Detail
            </Button>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  borderRadius: '5px',
                  fontWeight: 'bold',
                }}
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default TeachingPlanEntry;
