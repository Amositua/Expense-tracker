import styled from "styled-components";
import { Link } from "react-router-dom";

// Main Container
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #333;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

// Header Section
export const Header = styled.header`
  background-color: #1E3A8A; /* Deep blue */
  color: white;
  padding: 0px 0px;
  text-align: left;
  font-size: 1.1rem;
  font-weight: 800;

  display: flex;
    justify-content: space-between;
    align-items: center;


  p {
   margin: 0px 0px 0px 10px;
   color: #fff;
   padding: 25px 20px;

    @media (max-width: 768px) {
      font-size: 1.3rem;
    }
  }
`;

// Filter Section
export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    // flex-direction: column;
    gap: 15px;
  }
`;

export const Input = styled.input`
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  @media (max-width: 768px) {
    flex: 1;
    font-size: 0.9rem;
  }
`;

export const Select = styled.select`
  flex: 1;
  padding: 10px;
  background-color: #fff;
//   border: 1px solid #ccc;
//   border-radius: 5px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const DateInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Expenses Table
export const ExpensesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;

  thead {
    background-color: #1e3a8a;
    color: #fff;

    th {
      padding: 15px;
      text-align: left;
      font-size: 1rem;

      @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 10px;
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background-color: #f1f5f9;
      }
    }

    td {
      padding: 15px;
      border-bottom: 1px solid #eaeaea;
      font-size: 1rem;

      &:last-child {
        text-align: center;
      }

      @media (max-width: 768px) {
        font-size: 0.9rem;
        padding: 10px;
      }
    }
  }

  /* Make table scrollable on small screens */
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;

    thead,
    tbody {
      display: block;
    }

    thead tr {
      display: flex;
      justify-content: space-between;
    }

    tbody tr {
      display: flex;
      justify-content: space-between;
    }

    td,
    th {
      flex: 1;
    }
  }
`;

export const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  width: 800px;

  input {
    flex: 1;
    padding: 0.5rem 1rem;
    border: 1px solid #cbd5e1;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }

  button {
    background-color: #1e3a8a;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #1c2f73;
    }
  }
`

// Actions Button
export const ActionButton = styled.button`
  padding: 10px;
  margin: 5px;
  
  border-radius: 5px;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 5px;
    font-size: 0.8rem;
  }
`;


export const StyledLink = styled(Link)`
 color: ${(props) => (props.delete ? "#fff" : "#1e3a8a")};
  background-color: ${(props) => (props.delete ? "#d32f2f" : "transparent")};
  // border: 1px solid ${(props) => (props.delete ? "#d32f2f" : "#1e3a8a")};
`