import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // For redirection after save

const AssignedLecturesView = () => {
  const history = useNavigate();
  const [data, setData] = useState([
    { id: 1, class: "First Year", subject: "Mathematics", periods: 30, year: "2024" },
    { id: 2, class: "Second Year", subject: "Physics", periods: 20, year: "2024" },
  ]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleSort = (field) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    const sortedData = [...data].sort((a, b) => {
      if (newOrder === "asc") {
        return a[field] > b[field] ? 1 : -1;
      }
      return a[field] < b[field] ? 1 : -1;
    });
    setData(sortedData);
  };

  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  const handleEdit = (id) => {
   Navigate(`/assign-lecture/${id}`); // Redirects to the edit page
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = (type) => {
    alert(`Exporting to ${type}`);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const filteredData = data.filter((item) =>
    item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSave = () => {
    alert("Data saved successfully!");
    history.push("/assigned-lectures");
  };

  return (
    <div>
      <h2>Assigned Lectures Data View</h2>
      
      {/* Message after saving */}
      <div style={{ display: "none" }}>
        {/* Show success message conditionally */}
        <p>We’ve got that! The new house has been added and listed successfully.</p>
      </div>

      {/* Year Selection */}
      <select onChange={handleYearChange} value={selectedYear}>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        {/* Add more years as needed */}
      </select>

      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search..." 
        onChange={handleSearch} 
        value={searchTerm} 
      />

      {/* Data Table */}
      <table border="1" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => handleSort("class")}>
              Class {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => handleSort("subject")}>
              Subject {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th style={{ padding: "10px", cursor: "pointer" }} onClick={() => handleSort("periods")}>
              Periods {sortOrder === "asc" ? "↑" : "↓"}
            </th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td style={{ padding: "10px" }}>{item.class}</td>
              <td style={{ padding: "10px" }}>{item.subject}</td>
              <td style={{ padding: "10px" }}>{item.periods}</td>
              <td style={{ padding: "10px", textAlign: "center" }}>
                <button onClick={() => handleEdit(item.id)} style={{ marginRight: "10px" }}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export buttons */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={() => handleExport("CSV")}>Export to CSV</button>
        <button onClick={() => handleExport("Excel")}>Export to Excel</button>
        <button onClick={() => handleExport("PDF")}>Export to PDF</button>
        <button onClick={() => handleExport("Print")}>Print</button>
      </div>
    </div>
  );
};

export default AssignedLecturesView;
