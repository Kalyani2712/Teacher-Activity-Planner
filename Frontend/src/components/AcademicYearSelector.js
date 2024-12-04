import React, { useState } from 'react';

const AcademicYearSelector = ({ onSelectYear }) => {
  const currentYear = new Date().getFullYear();
  const years = [
    `${currentYear}-${currentYear + 1}`,
    `${currentYear - 1}-${currentYear}`,
    `${currentYear - 2}-${currentYear - 1}`,
  ];

  const [selectedYear, setSelectedYear] = useState(years[0]);

  const handleYearChange = (event) => {
    const selected = event.target.value;
    setSelectedYear(selected);
    onSelectYear(selected); // Pass selected year to parent component
  };

  return (
    <div className="academic-year-selector">
      <label htmlFor="academic-year">Select Academic Year: </label>
      <select id="academic-year" value={selectedYear} onChange={handleYearChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AcademicYearSelector;
