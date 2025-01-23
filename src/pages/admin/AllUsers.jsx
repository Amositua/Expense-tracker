import React from 'react'
import { useState } from 'react'
import { FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import {
  Container,
  Header,
  FilterSection,
  Input,
  Select,
  DateInput,
  ExpensesTable,
  ActionButton,
  StyledLink,
  SearchBar,
} from '../../styles/adminStyles/AllExpenseListStyle' // Adjust the path to where this file is saved.
import '../../styles/adminStyles/ExpenseList.css'
import { useEffect } from 'react'

const AllUsers = () => {
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(true);

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
        setFilteredUsers(data);
        setLoading(false);
        console.log(data);
      
      } else {
        console.error('Failed to fetch users');
        setLoading(false);
      }
    };

    
    fetchUsers();
  }, [])

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading users...</p>
      </div>
    );
  }


  return (
    <div>
      <header className='flex'>
        <p className=''>All Users</p>
      </header>

      <Container>
        <FilterSection>
          <SearchBar>
            <Input
              type='text'
              placeholder='Filter by category'
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button>
              <FiSearch />
            </button>
          </SearchBar>
        </FilterSection>

        {/* Expenses Table */}
        <ExpensesTable>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
          {filteredUsers?.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </ExpensesTable>
      </Container>
    </div>
  )
}

export default AllUsers
