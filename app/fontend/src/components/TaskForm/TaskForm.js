// TaskForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.scss';

export const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    id: '',
    task: '',
    completed: false
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/tasks', formData);
      onTaskAdded(response.data.task);
      // Clear the form data
      setFormData({
        
        task: '',
        completed: false
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="taskform__container">
    <form className="taskform" onSubmit={handleSubmit}>
      <h2 className="taskform__title">Add New Task</h2>
      <div className="taskform__inner-container">
        <div className="taskform__fields">
          <input
            type="text"
            className="taskform__input"
            name="task"
            value={formData.task}
            onChange={handleInputChange}
            required
          />
        </div>
        
          
      </div>
      <div className="taskform__fields">
        <button type="submit" className="taskform__btn">SUBMIT</button>
      </div>
    </form>
    </section>
  );
};

