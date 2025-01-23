import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const StyledImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const BackButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ReceiptViewer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const imageUrl = location.state?.imageUrl;

  if (!imageUrl) {
    return <p>No receipt found.</p>;
  }

  return (
    <ImageWrapper>
      <BackButton onClick={() => navigate(-1)}>Back</BackButton>
      <StyledImage src={imageUrl} alt="Receipt" />
    </ImageWrapper>
  );
};

export default ReceiptViewer;
