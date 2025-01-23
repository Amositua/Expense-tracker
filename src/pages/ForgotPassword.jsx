import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #d6d6d6;
    cursor: not-allowed;
  }
`;

const Message = styled.div`
  margin-top: 15px;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  ${(props) =>
    props.type === "error"
      ? "background-color: #f8d7da; color: #721c24;"
      : "background-color: #d4edda; color: #155724;"}
`;

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email) {
      setMessage({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    console.log(email)
    try {
      setLoading(true);

      // Backend API call
      const response = await axios.post(`/api/v1/forgot-password/verify-email/${ email }`);
      setMessage({
        type: "success",
        text: response.data.message || "Reset link sent successfully!",
      });
      setEmail("");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Forgot Password</Title>
      <Subtitle>Enter your email to receive a reset link</Subtitle>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
      {message.text && <Message type={message.type}>{message.text}</Message>}
    </Container>
  );
};

export default ForgotPassword;
