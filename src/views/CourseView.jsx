// src/views/CourseView.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from '../components/CourseForm';
import '../App.css';

const CourseView = () => {
  const navigate = useNavigate();
  
  const handleFormSubmit = (formData) => {
    // In a real app, you would send this data to your backend
    console.log('Course Data Submitted:', formData);
    
    // You could make an API call here
    // For example:
    // api.createCourse(formData)
    //   .then(() => navigate('/dashboard'))
    //   .catch(error => console.error('Error creating course:', error));
    
    // For now, simply navigate back to dashboard
    navigate('/dashboard');
  };
  
  return (
    <div className="content-container">
      <h1>Create New Course</h1>
      <p>Fill out the form below to create a new course for attendance tracking.</p>
      
      <CourseForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default CourseView;