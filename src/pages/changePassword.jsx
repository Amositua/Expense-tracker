import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f7f9fc;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h2 {
    color: #fff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #007bff;
  }
`;

const ToggleVisibilityButton = styled.button`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #007bff;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      console.log("Password changed successfully!", formData);
      alert("Password changed successfully!");
    }
  };

  return (
    <Container>
      <Header>
        <h2>Change Password</h2>
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type={showPasswords.currentPassword ? "text" : "password"}
            id="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            required
            placeholder="Enter current password"
          />
          <ToggleVisibilityButton
            type="button"
            onClick={() => togglePasswordVisibility("currentPassword")}
          >
            {showPasswords.currentPassword ? "Hide" : "Show"}
          </ToggleVisibilityButton>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type={showPasswords.newPassword ? "text" : "password"}
            id="newPassword"
            value={newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
          />
          <ToggleVisibilityButton
            type="button"
            onClick={() => togglePasswordVisibility("newPassword")}
          >
            {showPasswords.newPassword ? "Hide" : "Show"}
          </ToggleVisibilityButton>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input
            type={showPasswords.confirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm new password"
          />
          <ToggleVisibilityButton
            type="button"
            onClick={() => togglePasswordVisibility("confirmPassword")}
          >
            {showPasswords.confirmPassword ? "Hide" : "Show"}
          </ToggleVisibilityButton>
        </FormGroup>
        <SubmitButton type="submit">Update Password</SubmitButton>
      </Form>
    </Container>
  );
}

export default ChangePassword;
