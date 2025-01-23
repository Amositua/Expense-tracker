import React from 'react'
import { FaHome, FaPlusCircle, FaBell, FaUser } from 'react-icons/fa'
import { MdAccountBalanceWallet } from 'react-icons/md' // "All Expenses" icon
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const AdminNavbar = () => {
  const location = useLocation()
  return (
    <NavContainer>
        <NavButton active={location.pathname === "/admin-home"}>
      <Link to='/admin-home'>
      
          <FaHome />
          <ButtonLabel>Home</ButtonLabel>
       
      </Link>
      </NavButton>
      <NavButton>
      <Link to='/all-expense'>
        <FaPlusCircle />
        <ButtonLabel>
         All Expense
        </ButtonLabel>
        </Link>
      </NavButton>
      <NavButton>
      <Link to='/all-users'>
        <MdAccountBalanceWallet />
        <ButtonLabel>
          All Users
        </ButtonLabel>
        </Link>
      </NavButton>
      <NavButton>
      <Link to='/admin-notifications'>
        <FaBell />
        <ButtonLabel>
          Notifications
        </ButtonLabel>
        </Link>
      </NavButton>
      <NavButton>
      <Link to='/admin-profile'>
        <FaUser />
        <ButtonLabel>
         Profile
        </ButtonLabel>
        </Link>
      </NavButton>
    </NavContainer>
  )
}

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #fff;
  padding: 10px 0;
  border-top: 1px solid #e5e5e5;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
`

const NavButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #555;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  transition: color 0.3s, transform 0.3s;
  
  /* Apply styles for active button */
  background-color: ${(props) => (props.active ? '' : 'transparent')};
  color: ${(props) => (props.active ? '#1e3a8a' : '#7881f')};

  &:hover {
    color: #1e3a8a; /* Blue on hover */
    transform: scale(1.1);
  }



  svg {
    font-size: 25px;
    margin-bottom: 5px;
  }
      a {
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
`

const ButtonLabel = styled.span`
  font-size: 12px;
  color: #555;
`

export default AdminNavbar
