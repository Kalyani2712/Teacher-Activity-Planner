import React, { useEffect, useState } from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Box, Tooltip, Divider } from '@mui/material';
import { Home, Dashboard, LibraryBooks, Assignment, ExitToApp, Menu, Person, Settings } from '@mui/icons-material';  // Material icons
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

function Sidebar() {
  const [open, setOpen] = useState(true); // Manage sidebar open state
  const theme = useTheme();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/info/' + localStorage.getItem('id')).then(res => {
      console.log(res.data[0].name);
      setUserName(res.data[0].name);
      setUserRole(res.data[0].designation);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  // Toggle the sidebar
  const handleSidebarToggle = () => setOpen(!open);

  const logout = () => {
    localStorage.removeItem('id');
    window.location.href = '/';
  }

  return (
    <Drawer
      sx={{
        width: open ? 200 : 60, // Adjust width when open or collapsed
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? 200 : 60,
          boxSizing: 'border-box',
          backgroundColor: '#f9f9f9', // Light background
          color: '#333', // Dark text
          transition: 'width 0.3s ease', // Smooth transition
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* Hamburger Menu Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 1 }}>
        <IconButton onClick={handleSidebarToggle}>
          <Menu sx={{ color: '#333' }} />
        </IconButton>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
        <Tooltip title="User Profile">
          <ListItemIcon>
            <Person sx={{ color: '#333', fontSize: 40 }} />
          </ListItemIcon>
        </Tooltip>
        {open && (
          <Box sx={{ marginLeft: 2 }}>
            <ListItemText primary={userName} secondary={userRole} />
          </Box>
        )}
      </Box>

      <Divider />

      {/* Sidebar Links */}
      <List>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon>
            <Home sx={{ color: '#3f51b5' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Dashboard" />}
        </ListItem>

        <ListItem button component={Link} to="/Profile">
          <ListItemIcon>
            <Person sx={{ color: '#3f51b5' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Profile" />}
        </ListItem>

        <ListItem button component={Link} to="/assigned-lectures-view">
          <ListItemIcon>
            <Assignment sx={{ color: '#ff9800' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Assigned Lectures" />}
        </ListItem>
        <ListItem button component={Link} to="/TeachingPlanView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#8bc34a' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Teaching Plan" />}
        </ListItem>
        <ListItem button component={Link} to="/SynopsisView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#8bc34a' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Teaching Synopsis" />}
        </ListItem>

        <ListItem button component={Link} to="/LectureDetailsView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#8bc34a' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Lecture Details" />}
        </ListItem>

        <ListItem button component={Link} to="/SyllabusCompletionView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#ff9800' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Syllabus Completion" />}
        </ListItem>

        <ListItem button component={Link} to="/ActivityReportsView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#009688' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Activity Reports" />}
        </ListItem>
        <ListItem button component={Link} to="/leave-records-view">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#4caf50' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Leave Records" />}
        </ListItem>

        <ListItem button component={Link} to="/CommitteeWorkView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#9c27b0' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Committee Work" />}
        </ListItem>

        <ListItem button component={Link} to="/ContributionsView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#ff5722' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Contributions" />}
        </ListItem>

        <ListItem button component={Link} to="/ParticipationView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#03a9f4' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Participation" />}
        </ListItem>

        <ListItem button component={Link} to="/PublicationsView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#673ab7' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Publications" />}
        </ListItem>

        <ListItem button component={Link} to="/ResearchPublicationsView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#795548' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Research projects" />}
        </ListItem>

        <ListItem button component={Link} to="/MOOCsView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#607d8b' }} />
          </ListItemIcon>
          {open && <ListItemText primary="MOOCs & E-content" />}
        </ListItem>
       
        <ListItem button component={Link} to="/CourseOutcomeView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#9e9e9e' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Course Outcome" />}
        </ListItem>

        <ListItem button component={Link} to="/CentralAssessmentView">
          <ListItemIcon>
            <LibraryBooks sx={{ color: '#e91e63' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Central Assessment" />}
        </ListItem>

        {/* Logout Button */}
        <ListItem button onClick={logout} component={Link} to="/logout">
          <ListItemIcon>
            <ExitToApp sx={{ color: '#333' }} />
          </ListItemIcon>
          {open && <ListItemText primary="Logout" />}
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
