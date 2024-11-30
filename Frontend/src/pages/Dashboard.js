import React, { useState } from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, CardActions, Button, LinearProgress, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Assignment, AccessTime, Group } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'; // Optional chart for analytics
import { BarChart, Bar } from 'recharts'; // For bar chart visualization
import { PieChart, Pie, Cell } from 'recharts'; // For Pie chart visualization
import Skeleton from '@mui/material/Skeleton';

// Sample data for demonstration
const data = [
  { name: 'Jan', lectures: 10, leave: 2, contributions: 3 },
  { name: 'Feb', lectures: 12, leave: 1, contributions: 4 },
  { name: 'Mar', lectures: 15, leave: 3, contributions: 5 },
  { name: 'Apr', lectures: 14, leave: 2, contributions: 6 },
  { name: 'May', lectures: 18, leave: 1, contributions: 7 },
];

const pieData = [
  { name: 'Lectures', value: 50 },
  { name: 'Leave', value: 25 },
  { name: 'Contributions', value: 25 },
];

function Dashboard() {
  const [sortValue, setSortValue] = useState('lectures');
  const [isLoading, setIsLoading] = useState(false);

  const handleSortChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Teacher Dashboard
        </Typography>

        {/* Filters */}
        <Box sx={{ marginBottom: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={sortValue}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="lectures">Lectures</MenuItem>
              <MenuItem value="leave">Leave</MenuItem>
              <MenuItem value="contributions">Contributions</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Dashboard Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f1f1f1', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Assigned Lectures</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assignment sx={{ fontSize: 40, color: '#3f51b5', marginRight: 2 }} />
                  <Typography variant="h5">15 Lectures</Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <LinearProgress variant="determinate" value={75} sx={{ height: 10 }} />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" fullWidth>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f1f1f1', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Leave Records</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTime sx={{ fontSize: 40, color: '#ff9800', marginRight: 2 }} />
                  <Typography variant="h5">2 Leaves</Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <LinearProgress variant="determinate" value={50} sx={{ height: 10 }} />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" fullWidth>
                  View Leave Records
                </Button>
              </CardActions>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f1f1f1', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Contributions</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Group sx={{ fontSize: 40, color: '#4caf50', marginRight: 2 }} />
                  <Typography variant="h5">5 Contributions</Typography>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <LinearProgress variant="determinate" value={60} sx={{ height: 10 }} />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" fullWidth>
                  View Contributions
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>

        {/* Analytics Section - Side by Side Charts */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" gutterBottom>
            Activity Analytics
          </Typography>

          <Grid container spacing={3}>
            {/* Line Chart - Analytics */}
            <Grid item xs={12} sm={6}>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={400} />
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="lectures" stroke="#3f51b5" />
                    <Line type="monotone" dataKey="leave" stroke="#ff9800" />
                    <Line type="monotone" dataKey="contributions" stroke="#4caf50" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Grid>

            {/* Bar Chart - Analytics */}
            <Grid item xs={12} sm={6}>
              {isLoading ? (
                <Skeleton variant="rectangular" width="100%" height={400} />
              ) : (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="lectures" fill="#3f51b5" />
                    <Bar dataKey="leave" fill="#ff9800" />
                    <Bar dataKey="contributions" fill="#4caf50" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Grid>
          </Grid>

          {/* Pie Chart - Proportions of Activity */}
          <Typography variant="h6" gutterBottom sx={{ marginTop: 4 }}>
            Activity Proportions
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={pieData}
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3f51b5', '#ff9800', '#4caf50'][index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
