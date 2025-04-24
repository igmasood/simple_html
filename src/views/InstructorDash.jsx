// src/views/InstructorDashboard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// Sample data for demonstration
const sampleCourses = [
  { id: 1, title: 'Introduction to Computer Science', courseNumber: 'CS101', room: 'Hall A', meetings: 15 },
  { id: 2, title: 'Database Systems', courseNumber: 'CS305', room: 'Lab 2', meetings: 12 },
  { id: 3, title: 'Software Engineering', courseNumber: 'INFO530', room: 'Hall C', meetings: 15 },
];

const InstructorDash = () => {
  const [courses, setCourses] = useState(sampleCourses);
  
  const handleDeleteCourse = (courseId) => {
    // Filter out the deleted course
    setCourses(courses.filter(course => course.id !== courseId));
    // In a real app, you would also make an API call to delete from the backend
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Instructor Dashboard</h1>
        <Link to="/create-course">
          <button>+ New Course</button>
        </Link>
      </div>
      
      <div className="content-container">
        <h2>Your Courses</h2>
        
        {courses.length === 0 ? (
          <div className="empty-state">
            <p>You haven't created any courses yet.</p>
            <Link to="/create-course">Create your first course</Link>
          </div>
        ) : (
          <div className="courses-list">
            <table>
              <thead>
                <tr>
                  <th>Course Number</th>
                  <th>Title</th>
                  <th>Room</th>
                  <th>Total Meetings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.courseNumber}</td>
                    <td>{course.title}</td>
                    <td>{course.room}</td>
                    <td>{course.meetings}</td>
                    <td className="actions-cell">
                      <Link to={`/record-attendance/${course.id}`}>
                        <button className="action-btn">Record Attendance</button>
                      </Link>
                      <button 
                        className="action-btn danger"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDash;