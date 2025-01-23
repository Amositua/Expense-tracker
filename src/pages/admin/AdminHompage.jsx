import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaUsers, FaClipboardList, FaFileInvoiceDollar, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useGetAllExpenseQuery } from "../../slices/expenseApiSlice";
import LoadingSpinner from "../../components/LoadingSpinner";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 28px;
    color: #fff;
    margin-bottom: 5px;
  }

  p {
    font-size: 16px;
    color: #fff;
  }
`;

const StatsGrid = styled.div`
  display: grid;
 grid-template-columns: repeat(2, 1fr); /* Two columns on smaller screens */
    gap: 15px;  gap: 20px;
  margin-bottom: 15px;

      @media (max-width: 768px) {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const StatCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    font-size: 18px;
    color: #555;
    margin-bottom: 10px;
  }

  p {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
  }
`;

const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 20px;
 

    @media (max-width: 768px) {
   margin-bottom:100px;
  }
`;

const ActionCard = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  background: #fff;
  padding: 30px;
    
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  svg {
    font-size: 28px;
    color: #007bff;
    margin-bottom: 10px;
  }

  span {
    font-size: 14px;
    color: #555;
    font-weight: bold;
  }
`;

const AdminHomepage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true);

  const { data: expenses, isLoading, } = useGetAllExpenseQuery()
  console.log(expenses);

  useEffect(() => {
   
    const fetchUsers = async () => {
      const token = localStorage.getItem('userInfo')
      const parsedToken = JSON.parse(token)
      const response = await fetch(
        `/api/v1/auth/get-all-user`,

        {
          method: 'GET',
          headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
        setLoading(false);
        console.log(data);
      
      } else {
        console.error('Failed to fetch users');
        setLoading(false);
      }
    };

    
    fetchUsers();
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  const totalUsers = users ? users.length : 0;
  const totalExpenses = expenses ? expenses.length : 0;
  console.log(totalExpenses)

  return (
    <Container>
      <Header>
        <h1>Expense Tracker</h1>
        <p>Welcome back, Manage expenses and users effortlessly.</p>
      </Header>

      <StatsGrid>
        <StatCard>
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </StatCard>
        <StatCard>
          <h3>Total Expenses</h3>
          <p>{totalExpenses}</p>
        </StatCard>
        <StatCard>
          <h3>Pending Approvals</h3>
          <p>8</p>
        </StatCard>
        <StatCard>
          <h3>Approved Expense</h3>
          <p>25</p>
        </StatCard>
      </StatsGrid>

      <ActionsGrid>
        <ActionCard to="/all-users">
          <FaUsers />
          <span>Manage Users</span>
        </ActionCard>
        <ActionCard to="/all-expense">
          <FaClipboardList />
          <span>Manage Expenses</span>
        </ActionCard>
       
      </ActionsGrid>
    </Container>
  );
};

export default AdminHomepage;
