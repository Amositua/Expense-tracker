import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FiSearch, FiEdit, FiTrash2, FiEye } from 'react-icons/fi'
import { toast } from 'react-toastify'
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
} from '../styles/ExpenseListStyle' // Adjust the path to where this file is saved.
import '../styles/ExpenseList.css'
import { useDeleteExpenseMutation, useGetUserExpensesQuery } from '../slices/expenseApiSlice'

const ExpenseListPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Sort by Month')

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleOptionClick = (value) => {
    setSelectedOption(value)
    setIsOpen(false)
  }

  const dispatch = useDispatch()

  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const [searchInput, setSearchInput] = useState('');
  const [expenses, setExpenses] = useState([])
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  const { data: fetchedExpenses, loading, error, refetch } = useGetUserExpensesQuery()
  
  const [deleteExpense, { isLoading: loadingDelete }] =
    useDeleteExpenseMutation();


  useEffect(() => {
    if (fetchedExpenses) {
      setExpenses(fetchedExpenses);
      setFilteredExpenses(fetchedExpenses);
    }
  }, [fetchedExpenses])

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    const filtered = expenses.filter((expense) =>
      expense.expenseType.toLowerCase().includes(value)
    );
    setFilteredExpenses(filtered);
  };

  const handleDeleteExpense = async (expenseId) => {
    if (window.confirm('Are you sure')) {
      const updatedExpenses = expenses.filter(
        (expense) => expense.expenseId !== expenseId
      );
      setFilteredExpenses(updatedExpenses); // Update filtered expenses
      setExpenses(updatedExpenses); // Update overall expenses

      try {
       await deleteExpense(expenseId)
        refetch();
        toast.success('Expense deleted successfully')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
        setFilteredExpenses(fetchedExpenses);
      setExpenses(fetchedExpenses);
      }
    }
  }

  const handleViewDetails = (expenseId) => {
    navigate(`/expense/${expenseId}`)
  }

  const handleEditOption = (expenseId) => {
    navigate(`/edit-expense/${expenseId}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  console.log(expenses)
  return (
    <div>
      <header className='flex'>
        <p className=''>All Expenses</p>
      </header>

      <Container>
        <FilterSection>
          <SearchBar>
          <Input
              type="text"
              placeholder="Filter by category"
              value={searchInput}
              onChange={handleSearchChange}
            />
            <button>
              <FiSearch />
            </button>
          </SearchBar>

          {/* <div
            style={{
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <div style={{ flex: '1', marginRight: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Month:
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                style={{
                  width: '120px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              >
                <option value=''>All</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Selector 
            <div style={{ flex: '1', marginLeft: '10px' }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: '5px',
                  fontWeight: 'bold',
                }}
              >
                Year:
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  width: '120px',
                  padding: '8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              >
                <option value=''>All</option>
                {[2022, 2023, 2024, 2025].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div> */}
        </FilterSection>

        {/* Expenses Table */}
        <ExpensesTable>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses?.map((expense) => (
              <tr key={expense.expenseId}>
                <td>{expense.currentDate}</td>
                <td>{expense.expenseType}</td>
                <td>{expense.expenseDescription}</td>
                <td>#{expense.expenseAmount.toLocaleString()}</td>
                <td>Pending</td>
                <ActionButton
                  onClick={() => handleViewDetails(expense.expenseId)}
                >
                  Details
                </ActionButton>
                <ActionButton
                  onClick={() => handleEditOption(expense.expenseId)}
                >
                  Edit
                </ActionButton>
                <ActionButton
                    onClick={() => handleDeleteExpense(expense.expenseId)}
                  >
                    <FiTrash2 />
                  </ActionButton>
              </tr>
            ))}
          </tbody>
          {/* <a href="https://employee-image-latest.onrender.com/file/bungalow04.jpeg" aria-label="View bungalow image">View Image</a> */}

        </ExpensesTable>
      </Container>
    </div>
  )
}

export default ExpenseListPage
