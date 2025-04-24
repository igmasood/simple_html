// src/views/RecordAttendanceView.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

// Sample data for demo
const sampleCourses = {
  '1': { 
    id: 1, 
    title: 'Introduction to Computer Science', 
    courseNumber: 'CS101', 
    room: 'Hall A',
    meetings: [
      { id: 101, date: '2024-09-02', status: 'completed' },
      { id: 102, date: '2024-09-09', status: 'completed' },
      { id: 103, date: '2024-09-16', status: 'active' },
      { id: 104, date: '2024-09-23', status: 'upcoming' },
      { id: 105, date: '2024-09-30', status: 'upcoming' }
    ]
  },
  '2': { 
    id: 2, 
    title: 'Database Systems', 
    courseNumber: 'CS305', 
    room: 'Lab 2',
    meetings: [
      { id: 201, date: '2024-09-05', status: 'completed' },
      { id: 202, date: '2024-09-12', status: 'active' },
      { id: 203, date: '2024-09-19', status: 'upcoming' },
      { id: 204, date: '2024-09-26', status: 'upcoming' }
    ]
  },
  '3': { 
    id: 3, 
    title: 'Software Engineering', 
    courseNumber: 'INFO530', 
    room: 'Hall C',
    meetings: [
      { id: 301, date: '2024-09-03', status: 'completed' },
      { id: 302, date: '2024-09-10', status: 'completed' },
      { id: 303, date: '2024-09-17', status: 'active' },
      { id: 304, date: '2024-09-24', status: 'upcoming' }
    ]
  }
};

const Attendance = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [attendanceLink, setAttendanceLink] = useState('');
  
  useEffect(() => {
    // In a real app, this would be an API call
    const courseData = sampleCourses[courseId];
    setCourse(courseData);
    
    // Find the active meeting by default
    if (courseData) {
      const activeMeeting = courseData.meetings.find(m => m.status === 'active');
      if (activeMeeting) {
        setSelectedMeeting(activeMeeting);
        generateAttendanceLink(activeMeeting.id);
      }
    }
  }, [courseId]);
  
  const generateAttendanceLink = (meetingId) => {
    // In a real app, this would call your backend to generate a unique attendance link
    const shortLink = `attend.edu/${meetingId}${Math.floor(Math.random() * 1000)}`;
    setAttendanceLink(shortLink);
  };
  
  const handleMeetingSelect = (meeting) => {
    setSelectedMeeting(meeting);
    generateAttendanceLink(meeting.id);
  };
  
  if (!course) {
    return <div className="loading">Loading course data...</div>;
  }
  
  return (
    <div className="record-attendance-container">
      <div className="course-header">
        <h1>{course.courseNumber}: {course.title}</h1>
        <p>Meeting Room: {course.room}</p>
      </div>
      
      <div className="content-container">
        <div className="meetings-selection">
          <h2>Select Class Meeting</h2>
          <ul className="meetings-list">
            {course.meetings.map(meeting => (
              <li 
                key={meeting.id}
                className={`meeting-item ${meeting.status} ${selectedMeeting && selectedMeeting.id === meeting.id ? 'selected' : ''}`}
                onClick={() => handleMeetingSelect(meeting)}
              >
                <span className="meeting-date">{meeting.date}</span>
                <span className="meeting-status">{meeting.status}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {selectedMeeting && (
          <div className="attendance-display">
            <h2>Attendance for {selectedMeeting.date}</h2>
            
            <div className="qr-section">
              <div className="qr-code-container">
                {/* This would be a real QR code in production */}
                <div className="mock-qr-code">
                  <div className="qr-placeholder">QR Code</div>
                </div>
              </div>
              
              <div className="attendance-link">
                <h3>Attendance Link</h3>
                <div className="link-display">
                  <span>{attendanceLink}</span>
                </div>
                <button 
                  onClick={() => navigator.clipboard.writeText(attendanceLink)}
                  className="copy-btn"
                >
                  Copy Link
                </button>
              </div>
            </div>
            
            <div className="instructions-display">
              <h3>Instructions for Students</h3>
              <ol>
                <li>Scan the QR code or visit the URL above</li>
                <li>Enter your student ID</li>
                <li>Select your seat location in the classroom</li>
                <li>Sign the honor pledge to confirm your attendance</li>
              </ol>
            </div>
            
            <div className="attendance-actions">
              <Link to="/dashboard">
                <button className="secondary">Back to Dashboard</button>
              </Link>
              <button 
                className="refresh-btn"
                onClick={() => generateAttendanceLink(selectedMeeting.id)}
              >
                Regenerate Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;