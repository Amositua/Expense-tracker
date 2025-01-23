import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from "axios";
import { jwtDecode } from 'jwt-decode'

import {
  Container,
  Header,
  DetailsContainer,
  Section,
  Label,
  Value,
  ReceiptButton,
  ButtonContainer,
  Button,
  ButtonDelete,
  StyledLink,
} from '../styles/ExpenseStyle'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';

const ExpenseDetailsPage = () => {
  const { id } = useParams();
  console.log(id);
  const [expense, setExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem('userInfo')
  let userId
  if (token) {
    const decodedToken = jwtDecode(token)
    userId = decodedToken.userId
    console.log(userId)
  }
  
  const navigate = useNavigate();
  const imageUrl = `${expense?.image}`;

  const handleViewReceipt = () => {
    navigate('/view-receipt', { state: { imageUrl } });
  };


  useEffect(() => {
    const fetchExpenseDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("userInfo");
        const parsedToken = JSON.parse(token);

        const response = await axios.get(
          `/api/v1/expense/get-expense-for-employee-ById`,
          {
            params: { userId, expenseId: id },
            headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
          }
        );
        setExpense(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch expense details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchExpenseDetails();
  }, [id, userId]);


  if (loading) return <LoadingSpinner />;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <Container>
      <Header>
        <h1>Expense Details</h1>
      </Header>
      <DetailsContainer>
        <Section>
          <Label>Name:</Label>
          <Value>{expense?.expenseType}</Value>
        </Section>
        <Section>
          <Label>Date:</Label>
          <Value>{expense?.currentDate}</Value>
        </Section>
        <Section>
          <Label>Description:</Label>
          <Value>{expense?.expenseDescription}</Value>
        </Section>
        <Section>
          <Label>Status:</Label>
          <Value>Pending</Value>
        </Section>
        <Section>
          <Label>Total Amount:</Label>
          <Value>{expense?.amount}</Value>
        </Section>

        <Section>
          <Label>Details:</Label>
          <Value>{expense?.details}</Value>
        </Section>
        <Section>
          <Label>Receipt:</Label>
          <ReceiptButton onClick={handleViewReceipt}>View Receipt</ReceiptButton>
                  </Section>
        <ButtonContainer>
          <StyledLink className='link' to='/expense-list'>
            <Button>Go Back</Button>
          </StyledLink>
        </ButtonContainer>
      </DetailsContainer>
    </Container>
  )
}

export default ExpenseDetailsPage
