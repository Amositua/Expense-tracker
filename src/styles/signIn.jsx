import styled from 'styled-components';

const SignInButton = styled.button`
  background-color: #28a745;
  color: white; 
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  padding: 15px 25px; /* Add padding */
  margin: 15px 15px; /* Add margin */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s; /* Smooth transition for hover effect */

  &:hover {
    background-color: #218838; /* Darker green on hover */
  }

  &:active {
    background-color: #1e7e34; /* Even darker green on click */
  }
`;

const FlexEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export { SignInButton, FlexEnd };
