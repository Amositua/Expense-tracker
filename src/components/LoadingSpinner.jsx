import React from "react";
import styled, { keyframes } from "styled-components";

// Keyframes for the spinner animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Styled components for spinner and wrapper
const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full page height */
  background-color: #f9f9f9; /* Light background for better visibility */
`;

const Spinner = styled.div`
  width: 50px; /* Fixed size */
  height: 50px; /* Fixed size */
  border: 6px solid #e0e0e0; /* Light gray border */
  border-top: 6px solid #1e3a8a; /* Blue active border */
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;
