import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, Button, Select, FormControl, OutlinedInput, Drawer } from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';

function Navbar({ onYearChange, user, onLogout }) {
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    if (onYearChange) {
      onYearChange(event.target.value); // Pass selected year to parent
    }
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#1976d2', // Set primary color
          boxShadow: 'none',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          height: '70px',
          padding: '0 20px',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontSize: '1.4rem', color: '#fff', fontWeight: 600 }}
          >
            Teacher Activity Planner
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl variant="outlined" sx={{ m: 0, minWidth: 120, color: '#fff' }}>
              <Select
                value={selectedYear}
                onChange={handleYearChange}
                displayEmpty
                input={<OutlinedInput sx={{ color: '#fff' }} />}
                sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', borderRadius: 2 }}
              >
                <MenuItem value="2024-25">2024-25</MenuItem>
                <MenuItem value="2025-26">2025-26</MenuItem>
                <MenuItem value="2026-27">2026-27</MenuItem>
              </Select>
            </FormControl>

            {user ? (
              <>
                <Typography
                  variant="body1"
                  sx={{ marginRight: 2, color: '#fff', fontSize: '1rem', fontWeight: 500 }}
                >
                  {user.username}
                </Typography>
                <IconButton onClick={handleMenuClick} color="inherit">
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <Button color="inherit" sx={{ fontSize: '0.9rem' }}>
                Login
              </Button>
            )}

            <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* User Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} sx={{ marginTop: '40px' }}>
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250, padding: 2 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Menu
          </Typography>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
