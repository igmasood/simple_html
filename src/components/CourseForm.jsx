// src/components/CourseForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample room options
const roomOptions = [
  'Hall A',
  'Hall B',
  'Hall C',
  'Lab 1',
  'Lab 2',
  'Conference Room 101',
  'Lecture Hall 202'
];

const CourseForm = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    courseNumber: '',
    description: '',
    room: '',
    meetingDay: '',
    totalMeetings: 15
  });
  
  const [rosterFile, setRosterFile] = useState(null);
  const [rosterPreview, setRosterPreview] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setRosterFile(file);
    
    // Simple file preview (in a real app, you'd use a CSV parser)
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n').slice(0, 5); // Preview first 5 lines
      setRosterPreview(lines);
    };
    reader.readAsText(file);
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) errors.title = 'Course title is required';
    if (!formData.courseNumber.trim()) errors.courseNumber = 'Course number is required';
    if (!formData.room) errors.room = 'Meeting room is required';
    if (!formData.meetingDay) errors.meetingDay = 'Meeting day is required';
    if (!rosterFile) errors.roster = 'Course roster is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    // If a custom onSubmit function was provided, call it with the form data
    if (onSubmit) {
      onSubmit({
        ...formData,
        rosterFile
      });
    } else {
      // Default behavior - log data and navigate to dashboard
      console.log('Form Data:', formData);
      console.log('Roster File:', rosterFile);
      navigate('/dashboard');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Course Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="e.g. Introduction to Computer Science"
        />
        {formErrors.title && <span className="error">{formErrors.title}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="courseNumber">Course Number</label>
        <input
          type="text"
          id="courseNumber"
          name="courseNumber"
          value={formData.courseNumber}
          onChange={handleInputChange}
          placeholder="e.g. CS101"
        />
        {formErrors.courseNumber && <span className="error">{formErrors.courseNumber}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="description">Course Description (Optional)</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter a brief description of the course"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="room">Meeting Room</label>
        <select
          id="room"
          name="room"
          value={formData.room}
          onChange={handleInputChange}
        >
          <option value="">Select a room</option>
          {roomOptions.map(room => (
            <option key={room} value={room}>{room}</option>
          ))}
        </select>
        {formErrors.room && <span className="error">{formErrors.room}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="meetingDay">Meeting Day</label>
        <select
          id="meetingDay"
          name="meetingDay"
          value={formData.meetingDay}
          onChange={handleInputChange}
        >
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
        </select>
        {formErrors.meetingDay && <span className="error">{formErrors.meetingDay}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="totalMeetings">Total Number of Meetings</label>
        <input
          type="number"
          id="totalMeetings"
          name="totalMeetings"
          value={formData.totalMeetings}
          onChange={handleInputChange}
          min="1"
          max="30"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="roster">Course Roster (CSV)</label>
        <input
          type="file"
          id="roster"
          accept=".csv"
          onChange={handleFileUpload}
        />
        {formErrors.roster && <span className="error">{formErrors.roster}</span>}
      </div>
      
      {rosterPreview.length > 0 && (
        <div className="roster-preview">
          <h3>Roster Preview</h3>
          <pre>
            {rosterPreview.join('\n')}
          </pre>
        </div>
      )}
      
      <div className="form-actions">
        <button type="button" className="secondary" onClick={() => navigate('/dashboard')}>
          Cancel
        </button>
        <button type="submit">Create Course</button>
      </div>
    </form>
  );
};

export default CourseForm;