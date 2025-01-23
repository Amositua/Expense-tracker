import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/success.css';

const SuccessMessage = ({ navigate }) => {
  return (
    <div className="success-container">
      <h1>Your Expense Has Been Logged Successfully!</h1>
      <p>Thank you for submitting your expense.</p>
      <button className="return-button" onClick={() => navigate('/')}>
        Return to Home Page
      </button>
    </div>
  );
};

export default SuccessMessage;
