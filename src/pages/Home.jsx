import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTotalExpenses } from '../slices/expenseSlice';
import { useGetUserExpensesQuery } from '../slices/expenseApiSlice';
import {
  Container,
  HomeHeader,
  Summary,
  SummaryCard,
  Transactions,
  Footer,
  StyledLink,
} from '../styles/home';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const dispatch = useDispatch();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isFetchingUserData, setIsFetchingUserData] = useState(false); // New state for user data loading
  const [totalAmount, setTotalAmount] = useState(0); // New state for total amount

  // Use the query to fetch the user expenses
  const { data: expenses, isLoading, isError, refetch } = useGetUserExpensesQuery();

  // Check if the user is logged in
  useEffect(() => {
    const token = localStorage.getItem('userInfo');
    if (token) {
      setIsUserLoggedIn(true);
    }
  }, []);

  // Refetch the expenses when the user logs in
  useEffect(() => {
    if (isUserLoggedIn) {
      setIsFetchingUserData(true); // Set fetching state to true
      refetch()
        .finally(() => setIsFetchingUserData(false)); // Reset fetching state after refetch completes
    }
  }, [isUserLoggedIn, refetch]);

  // Set total expenses based on the new user expenses
  useEffect(() => {
    if (expenses) {
      dispatch(setTotalExpenses(expenses.length)); // Set the total expenses length

        // Calculate and set total amount
        const amount = expenses.reduce((acc, expense) => acc + expense.expenseAmount, 0);
        setTotalAmount(amount);
    }
  }, [expenses, dispatch]);

  const totalExpenses = expenses ? expenses.length : 0;

  // Show loading indicator while fetching user-specific data
  if (isLoading || isFetchingUserData) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <div>Error loading expenses</div>;
  }

  return (
    <Container>
      <HomeHeader>
        <h1>Expense Tracker</h1>
        <p>Track your expenses with ease</p>
      </HomeHeader>

      <Summary>
        <SummaryCard>
          <h3>Total Expense</h3>
          <p>{totalExpenses}</p>
        </SummaryCard>

        <SummaryCard>
          <h3>Total Amount</h3>
          <p>#{totalAmount.toLocaleString()}</p> {/* Format with commas */}
        </SummaryCard>
      </Summary>

      <Transactions>
  <h2>Recent Expenses</h2>
  <ul>
    {expenses &&
      [...expenses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date, latest first
        .slice(0, 5) // Get the first six items
        .map((expense) => (
          <li key={expense.id}>
            <span>{expense.expenseDescription}</span>
            <span>#{expense.expenseAmount.toLocaleString()}</span>
          </li>
        ))}
  </ul>
  {/* {expenses && expenses.length > 6 && (
    <p>
      <StyledLink to="/all-expenses">View All Expenses</StyledLink>
    </p>
  )} */}
</Transactions>


      <Footer>
        <button>
          <StyledLink to='/log-expense'>Log Expense</StyledLink>
        </button>
      </Footer>
    </Container>
  );
};

export default Home;
