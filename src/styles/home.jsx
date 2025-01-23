import styled from 'styled-components';
import { Link } from 'react-router-dom';

// General Styles
export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f6f9;
  color: #333;
  font-family: Arial, sans-serif;
`;

// Header Styles
export const HomeHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    color: #1e3a8a;
  }

  p {
    color: #555;
    font-size: 1rem;
  }
`;

// Summary Section
export const Summary = styled.section`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 20px;
`;

export const SummaryCard = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.2rem;
    color: #555;
  }

  p {
    font-size: 1.5rem;
    color: #1e3a8a;
    margin-top: 10px;
  }
`;

// Transactions Section
export const Transactions = styled.section`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #eaeaea;
    font-size: 1rem;

    &:last-child {
      border-bottom: none;
    }

    span:nth-child(2) {
      font-weight: bold;
    }
  }
`;

// Footer Buttons
export const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    padding: 13px 20px;
    background-color: #1e3a8a;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
      background-color: #162d6b;
    }
  }
`;

export const StyledLink = styled(Link)`
color: #fff
`
