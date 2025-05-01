// src/views/ClassroomLayout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../App.css';

const ClassroomLayout = () => {
  const { courseId } = useParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  
  // Sample data for the classrooms
  const coursesData = [
    {
      id: 1,
      courseCode: 'INFO 530',
      name: 'Systems Development',
      room: 'Hall A',
      layout: {
        rows: 5,
        seatsPerRow: 8,
        occupiedSeats: [
          { row: 1, seat: 3, studentId: 'S12345' },
          { row: 2, seat: 5, studentId: 'S67890' },
          { row: 3, seat: 2, studentId: 'S11122' },
          { row: 4, seat: 6, studentId: 'S33344' },
          { row: 2, seat: 1, studentId: 'S55566' },
        ],
        yourSeat: { row: 3, seat: 4, studentId: 'YOUR_ID' }
      }
    },
    {
      id: 2,
      courseCode: 'INFO 520',
      name: 'Database Management',
      room: 'Lab 2',
      layout: {
        rows: 4,
        seatsPerRow: 6,
        occupiedSeats: [
          { row: 1, seat: 2, studentId: 'S12345' },
          { row: 2, seat: 3, studentId: 'S67890' },
          { row: 3, seat: 4, studentId: 'S11122' },
          { row: 1, seat: 5, studentId: 'S33344' },
        ],
        yourSeat: { row: 2, seat: 5, studentId: 'YOUR_ID' }
      }
    }
  ];
  
  useEffect(() => {
    // In a real app, you would fetch data from an API
    setCourses(coursesData);
    
    if (courseId) {
      const course = coursesData.find(c => c.id === parseInt(courseId));
      if (course) {
        setSelectedCourse(course);
        // Pre-select the student's seat
        setSelectedSeat(course.layout.yourSeat);
      }
    } else if (coursesData.length > 0) {
      // If no courseId provided, select the first course
      setSelectedCourse(coursesData[0]);
      setSelectedSeat(coursesData[0].layout.yourSeat);
    }
  }, [courseId]);
  
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedSeat(course.layout.yourSeat);
  };
  
  const isSeatOccupied = (row, seat) => {
    if (!selectedCourse) return false;
    return selectedCourse.layout.occupiedSeats.some(
      occupiedSeat => occupiedSeat.row === row && occupiedSeat.seat === seat
    );
  };
  
  const isYourSeat = (row, seat) => {
    if (!selectedCourse) return false;
    const yourSeat = selectedCourse.layout.yourSeat;
    return yourSeat && yourSeat.row === row && yourSeat.seat === seat;
  };
  
  const renderSeatingLayout = () => {
    if (!selectedCourse) return <div>Select a course to view its layout</div>;
    
    const { rows, seatsPerRow } = selectedCourse.layout;
    const seatingLayout = [];
    
    for (let row = 1; row <= rows; row++) {
      const rowSeats = [];
      
      for (let seat = 1; seat <= seatsPerRow; seat++) {
        const occupied = isSeatOccupied(row, seat);
        const yourSeat = isYourSeat(row, seat);
        
        let seatClass = 'classroom-seat';
        if (occupied) seatClass += ' occupied';
        if (yourSeat) seatClass += ' your-seat';
        
        rowSeats.push(
          <div 
            key={`seat-${row}-${seat}`}
            className={seatClass}
            title={yourSeat ? 'Your seat' : occupied ? 'Occupied' : 'Available'}
          >
            {row}-{seat}
          </div>
        );
      }
      
      seatingLayout.push(
        <div key={`row-${row}`} className="classroom-row">
          {rowSeats}
        </div>
      );
    }
    
    return seatingLayout;
  };
  
  return (
    <div className="classroom-layout-container">
      <h1>Classroom Layouts</h1>
      <p>View the seating arrangements for your registered courses. Your seat is highlighted in blue.</p>
      
      <div className="course-selector">
        <h3>Select a Course:</h3>
        <div className="course-buttons">
          {courses.map(course => (
            <button
              key={course.id}
              className={`course-button ${selectedCourse && selectedCourse.id === course.id ? 'active' : ''}`}
              onClick={() => handleCourseSelect(course)}
            >
              {course.courseCode} - {course.name}
            </button>
          ))}
        </div>
      </div>
      
      {selectedCourse && (
        <div className="selected-course-info">
          <h2>{selectedCourse.courseCode} - {selectedCourse.name}</h2>
          <p>Room: {selectedCourse.room}</p>
        </div>
      )}
      
      <div className="classroom-container">
        <div className="classroom-front-label">FRONT OF CLASSROOM</div>
        <div className="instructor-desk">Instructor Desk</div>
        
        <div className="classroom-seating">
          {renderSeatingLayout()}
        </div>
        
        <div className="seat-legend">
          <div className="legend-item">
            <div className="legend-box available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="legend-box occupied"></div>
            <span>Occupied</span>
          </div>
          <div className="legend-item">
            <div className="legend-box your-seat"></div>
            <span>Your Seat</span>
          </div>
        </div>
      </div>
      
      <div className="back-link">
        <Link to="/student/dashboard">← Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default ClassroomLayout;