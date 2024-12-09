import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Container,
  Grid,
  Typography,
  Box,
  Divider,
  LinearProgress,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LectureDetails({entry_id, month, year, className}) {

  const [lectureData, setLectureData] = useState({
    t_id: localStorage.getItem('id'),
    date: '',
    div: '',
    class: '',
    title: '',
    module: '',
    time: '',
    lecNo: ''
  });
  useEffect(() => {
    if (entry_id !== null) {
      axios.put('http://localhost:5000/lecturestaken/'+localStorage.getItem('id'), {id: entry_id}).then(res => {
        setLectureData(res.data[0]);
        console.log(res.data[0]);
      }).catch(error => {
        console.log(error);
      });
    }
  }, []);

  const [progress, setProgress] = useState(0);
  const [errors, setErrors] = useState({});
  const [curTitle, setCurTitle] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/lectures/'+localStorage.getItem('id')).then(res => {
      //filter title from res
      setCurTitle(res.data.map(item => item.title));
      console.log(res.data);
      console.log(curTitle);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLectureData((prev) => {
      const updatedData = { ...prev, [name]: value };
      calculateProgress(updatedData);
      return updatedData;
    });
  };

  const calculateProgress = (data) => {
    console.log(data);
    const filledFields = Object.values(data).filter((value) => {
      return (typeof value === 'string' ? value.trim() !== '' : value);
    }).length;
    setProgress((filledFields / Object.keys(data).length) * 100);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!lectureData.date) newErrors.date = 'Date is required';
    if (!lectureData.class) newErrors.class = 'Class is required';
    if (!lectureData.title) newErrors.title = 'title is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(entry_id !== null){
      axios.put('http://localhost:5000/lecturestakenUpdate/'+localStorage.getItem('id'), lectureData).then(res => {
        console.log(res);
      }).catch(error => {
        console.log(error);
      });
      
    }
    else{
      axios.post('http://localhost:5000/lecturestaken', lectureData).then((res) => {
        console.log(res);
      }).catch((error) => {
        console.log(error);
      });
    }

    let data = {}
    var check = false;
    axios.put('http://localhost:5000/lecturesCheck/'+localStorage.getItem('id'), {month: month, year: year,
      title: lectureData.title, 
      className: lectureData.class}).then(res => {
      check = true;
      data = {
        t_id: res.data[0].t_id,
        year: res.data[0].year,
        month: res.data[0].month,
        semester: res.data[0].semester,
        class: res.data[0].class,
        course: res.data[0].course,
        availablePeriod: res.data[0].availablePeriod,
        title: res.data[0].title,
        paperNo: res.data[0].paperNo,
        lectureDetails: JSON.parse(res.data[0].lectureDetails)
      }
    }).then(res => {
      data.lectureDetails.forEach(element => {
        if (element.lecNo === lectureData.lecNo) {
          element.remark = "completed";
          element.actualDate = lectureData.date;
        }
      })
      console.log(data);
      data = {
        t_id: data.t_id,
        year: data.year,
        month: data.month,
        semester: data.semester,
        class: data.class,
        course: data.course,
        availablePeriod: data.availablePeriod,
        title: data.title,
        paperNo: data.paperNo,
        lectureDetails: JSON.stringify(data.lectureDetails)
      }
      console.log(data);
      axios.post('http://localhost:5000/lectures', data )
      .then(res => {console.log({t_id: data.t_id,
      year: data.year,
      month: data.month,
      semester: data.semester,
      class: data.class,
      course: data.course,
      availablePeriod: data.availablePeriod,
      title: data.title,
      paperNo: data.paperNo,
      lectureDetails: JSON.stringify(data.lectureDetails)});})
      .catch((error) => {
        console.log({t_id: data.t_id,
          year: data.year,
          month: data.month,
          semester: data.semester,
          class: data.class,
          course: data.course,
          availablePeriod: data.availablePeriod,
          title: data.title,
          paperNo: data.paperNo,
          lectureDetails: JSON.stringify(data.lectureDetails)});
    console.log(error);
    });
    }).catch(error => {
      console.log(error);
    });
    navigate('/LectureDetailsView', { state: { lectureData } });
  };

  const handleReset = () => {
    setLectureData({
      t_id: localStorage.getItem('id'),
      date: '',
      div: '',
      class: '',
      title: '',
      module: '',
      time: '',
      lecNo: '',
    });
    setErrors({});
    setProgress(0);
  };

  return (
    <Box sx={{ minHeight: '100vh', background: '#1D2B64', padding: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ padding: 4, borderRadius: 4, boxShadow: 6, backgroundColor: '#ffffff' }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', color: '#1976d2', marginBottom: 3 }}
          >
            Lecture Details Entry
          </Typography>

          <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 3 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  variant="outlined"
                  name="date"
                  type="date"
                  value={lectureData.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                  InputLabelProps={{ shrink: true }}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.class} sx={{ backgroundColor: '#f9f9f9' }}>
                  <InputLabel id="class-label">Class</InputLabel>
                  <Select
                    labelId="class-label"
                    id="class"
                    name="class"
                    value={lectureData.class}
                    onChange={handleChange}
                    label="Class"
                  >
                    <MenuItem value="FY">FY</MenuItem>
                    <MenuItem value="SY">SY</MenuItem>
                    <MenuItem value="TY">TY</MenuItem>
                  </Select>
                  {errors.class && <FormHelperText>{errors.class}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.title} sx={{ backgroundColor: '#f9f9f9' }}>
                  <InputLabel id="title-label">Title</InputLabel>
                  <Select
                    labelId="title-label"
                    id="title"
                    name="title"
                    value={lectureData.title}
                    onChange={handleChange}
                    label="Title"
                  >
                    {curTitle.length > 0 ? (
                        curTitle.map((curtitle) => (
                        <MenuItem key={curtitle} value={curtitle}>{curtitle}</MenuItem>
                      ))
                    ):(<MenuItem value="No Lectures">No Lectures</MenuItem>)
                    }
                  </Select>
                  {errors.curtitle && <FormHelperText>{errors.curtitle}</FormHelperText>}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Division"
                  variant="outlined"
                  name="div"
                  value={lectureData.div}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Time"
                  variant="outlined"
                  name="time"
                  value={lectureData.time}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lecture Number"
                  variant="outlined"
                  name="lecNo"
                  value={lectureData.lecNo}
                  onChange={handleChange}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Lecture Topic"
                  variant="outlined"
                  name="module"
                  value={lectureData.module}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  sx={{ backgroundColor: '#f9f9f9' }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ marginY: 3 }} />
                <Box display="flex" justifyContent="space-between">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleReset}
                    startIcon={<RestartAltIcon />}
                  >
                    Reset
                  </Button>
                  <Button variant="contained" color="primary" type="submit">
                    Save Lecture Details
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default LectureDetails;
