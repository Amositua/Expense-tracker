import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import {
  Container,
  Header,
  DetailsContainer,
  Section,
  Label,
  Value,
  ReceiptImage,
  ButtonContainer,
  Button,
  ButtonDelete,
  StyledLink,
  ReceiptButton,
} from '../../styles/ExpenseStyle'
import { Link } from 'react-router-dom'

const AdminExpenseDetailsPage = () => {
  const { id } = useParams();
  console.log(id);
  const [expense, setExpense] = useState(null);

  const navigate = useNavigate();
  const imageUrl = `${expense?.image}`;

  const handleViewReceipt = () => {
    navigate('/view-receipt', { state: { imageUrl } });
  };


  useEffect(() => {
    const fetchExpenseDetails = async () => {
      const token = localStorage.getItem('userInfo');
      const tok = JSON.parse(token);
      const response = await fetch(
        `/api/v1/expense/get-expense/${id}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${tok.accessToken}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setExpense(data);
        console.log(data);
      } else {
        console.error('Failed to fetch expense details');
      }
    };

    fetchExpenseDetails();
  }, [id]);
  console.log(expense);

  if (!expense) return <p>Loading expense details...</p>;
  return (
    <Container>
    <Header>
      <h1>Expense Details</h1>
    </Header>
    <DetailsContainer>
      <Section>
        <Label>User Name:</Label>
        <Value>{expense.nameOfEmployee}</Value>
      </Section>
      <Section>
        <Label>User ID:</Label>
        <Value>{expense.employeeEmploymentNumber}</Value>
      </Section>
      <Section>
        <Label>Department:</Label>
        <Value>{expense.employeeDepartment}</Value>
      </Section>
      <Section>
        <Label>Date:</Label>
        <Value>{expense.currentDate}</Value>
      </Section>
      <Section>
        <Label>Category:</Label>
        <Value>{expense.expenseType}</Value>
      </Section>
      <Section>
        <Label>Status:</Label>
        <Value>{expense.status}</Value>
      </Section>
      <Section>
        <Label>Total Amount:</Label>
        <Value>{expense.expenseAmount}</Value>
      </Section>

      <Section>
        <Label>Details:</Label>
        <Value>{expense.expenseDescription}</Value>
      </Section>
      <Section>
        <Label>Receipt:</Label>
        {/* <a href={`${expense.image}`} target="_blank" rel="noopener noreferrer">click</a>
        <ReceiptImage src={expense.image} alt='Receipt' /> */}
         <ReceiptButton onClick={handleViewReceipt}>View Receipt</ReceiptButton>
      </Section>
      <ButtonContainer>
        <StyledLink>
          <Button>Approve</Button>
        </StyledLink>
        <StyledLink className='link' to='/all-expense'>
          <Button>Go Back</Button>
        </StyledLink>
      </ButtonContainer>
    </DetailsContainer>
  </Container>
  )
}

export default AdminExpenseDetailsPage
