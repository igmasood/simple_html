// src/views/StudentDashboard.jsx
import React, { useState } from 'react';
import '../App.css';

const StudentDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sample data for the dashboard
  const courses = [
    {
      id: 1,
      courseCode: 'INFO 530',
      name: 'Systems Development',
      attendance: [
        { date: '04-10-25', status: 'Present', mode: 'Remote' },
        { date: '04-17-25', status: 'Absent', mode: 'Remote' },
        { date: '04-24-25', status: 'Present', mode: 'Remote' }
      ]
    },
    {
      id: 2,
      courseCode: 'INFO 520',
      name: 'Database Management',
      attendance: [
        { date: '04-08-25', status: 'Present', mode: 'Remote' },
        { date: '04-10-25', status: 'Present', mode: 'In-Person' },
        { date: '04-15-25', status: 'Present', mode: 'Remote' },
        { date: '04-17-25', status: 'Absent', mode: 'N/A' }
      ]
    }
  ];
  
  // Function to handle search
  const handleSearch = () => {
    // This is handled directly in the rendering below
  };
  
  return (
    <div className="student-dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
      </div>
      
      <div className="search-container">
        <input 
          className="search-input" 
          type="text" 
          placeholder="Search by date..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>Search</button>
      </div>

      <div className="class-list">
        {courses.map(course => (
          <div className="class-item" key={course.id}>
            <h2>{course.courseCode} - {course.name}</h2>
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Mode of Attendance</th>
                </tr>
              </thead>
              <tbody>
                {course.attendance
                  .filter(record => record.date.includes(searchTerm))
                  .map((record, index) => (
                    <tr key={index}>
                      <td>{record.date}</td>
                      <td>{record.status}</td>
                      <td>{record.mode}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;