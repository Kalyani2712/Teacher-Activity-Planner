import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { CalendarToday, Menu } from '@mui/icons-material';
import { DatePicker } from '@mui/lab'; // If using MUI DatePicker
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import format from 'date-fns/format';

function Navbar({ onYearChange }) {
  const [selectedYear, setSelectedYear] = useState(new Date());

  // Handle year change
  const handleYearChange = (date) => {
    setSelectedYear(date);
    if (onYearChange) {
      onYearChange(format(date, 'yyyy')); // Return the year in 'yyyy' format
    }
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Teacher Activity Planner
        </Typography>

        {/* Year Picker */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            views={['year']}
            value={selectedYear}
            onChange={handleYearChange}
            renderInput={(params) => (
              <IconButton {...params}>
                <CalendarToday sx={{ color: '#fff' }} />
              </IconButton>
            )}
          />
        </LocalizationProvider>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
