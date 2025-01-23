import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
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
} from '../../styles/ExpenseListStyle' // Adjust the path to where this file is saved.
import '../../styles/ExpenseList.css'

const AllExpenseList = () => {
  const [expenses, setExpenses] = useState([]) // All expenses or filtered expenses
  const [displayedExpenses, setDisplayedExpenses] = useState([]) // Displayed expenses for "Load More"
  const [totalPages, setTotalPages] = useState(1) // Total pages for pagination
  const [currentPage, setCurrentPage] = useState(0) // Current page number
  const [selectedMonth, setSelectedMonth] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [allDataLoaded, setAllDataLoaded] = useState(false) // Track if all filtered data is loaded
  const [isFilterApplied, setIsFilterApplied] = useState(false) // Track if filter is applied


  const navigate = useNavigate()
  const pageSize = 7 // Default page size

  // Fetch expenses from the appropriate endpoint
  const fetchExpenses = async (
    pageNum,
    pageSize,
    month = 'All',
    year = 'All'
  ) => {
    setLoading(true)
    setError('')
    try {
      const token = localStorage.getItem('userInfo')
      const parsedToken = JSON.parse(token)

      let response
      if (month === 'All' && year === 'All') {
        // Fetch all expenses with pagination
        response = await axios.get(
          `/api/v1/expense/getAllExpenseWithPagination`,
          {
            params: { pageNum, pageSize },
            headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
          }
        )

        if (response.data && Array.isArray(response.data.expenseDto)) {
          setExpenses(response.data.expenseDto) // Access `expenses` property
          setDisplayedExpenses([]) // Clear displayed expenses for pagination
          setTotalPages(response.data.totalPages || 1)
        } else {
          setExpenses([]) // Handle empty or malformed response
        }
      } else {
        // Fetch filtered expenses
        response = await axios.get(`/api/v1/expense/searchByMonthAndYear`, {
          params: {
            month: month !== 'All' ? month : undefined,
            year: year !== 'All' ? year : undefined,
          },
          headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
        })

        if (Array.isArray(response.data)) {
          setExpenses(response.data) // Set all filtered expenses
          setDisplayedExpenses(response.data.slice(0, pageSize)) // Display first batch
          setTotalPages(1) // No pagination for filtered results
          setAllDataLoaded(response.data.length <= pageSize) // Check if all data is loaded
        } else {
          setExpenses([]) // Handle empty or malformed response
        }
      }
    } catch (err) {
      setError('Failed to fetch expenses. Please try again.')
      setExpenses([]) // Clear expenses on error
    } finally {
      setLoading(false)
    }
  }

  // Load more filtered expenses
  const handleLoadMore = () => {
    const currentLength = displayedExpenses.length
    const nextBatch = expenses.slice(currentLength, currentLength + pageSize)
    setDisplayedExpenses([...displayedExpenses, ...nextBatch])

    if (currentLength + nextBatch.length >= expenses.length) {
      setAllDataLoaded(true)
    }
  }

  // Load initial data (all expenses) on mount
  useEffect(() => {
    fetchExpenses(0, pageSize)
  }, [])

  // Handle filter submission
  const handleFilter = () => {
    setCurrentPage(0) // Reset to first page
    setIsFilterApplied(true) // Mark filter as applied
    fetchExpenses(0, pageSize, selectedMonth, selectedYear)
  }

  // Handle page change for unfiltered data
  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum)
    fetchExpenses(pageNum, pageSize, 'All', 'All')
  }

  const handleViewDetails = (expenseId) => {
    navigate(`/admin-expense/${expenseId}`)
  }

 

  return (
    <div>
      <header className='flex'>
        <p className=''>All Expenses</p>
      </header>

      <Container>
        <FilterSection>
          <SearchBar>
            <Input type='text' placeholder='Search by name or category' />
            <button>
              <FiSearch />
            </button>
          </SearchBar>

          {/* Filter Controls */}
          <div
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
                <option value='All'>All</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', {
                      month: 'long',
                    })}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Selector */}
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
                <option value='All'>All</option>
                {[2022, 2023, 2024, 2025].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              style={{ marginLeft: '10px' }}
              onClick={handleFilter}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Filter'}
            </button>
          </div>
        </FilterSection>
        {/* Error Display */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Expense Table */}
        {expenses.length === 0 && displayedExpenses.length === 0 ? (
          <p>No expenses available.</p>
        ) : (
          <ExpensesTable>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Employee</th>
                <th>Type</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(displayedExpenses.length > 0
                ? displayedExpenses
                : expenses
              ).map((expense) => (
                <tr key={expense.expenseId}>
                  <td>{expense.expenseId}</td>
                  <td>{new Date(expense.currentDate).toLocaleDateString()}</td>
                  <td>{expense.nameOfEmployee}</td>
                  <td>{expense.expenseType}</td>
                  <td>{expense.expenseDescription}</td>
                  <ActionButton
                    onClick={() => handleViewDetails(expense.expenseId)}
                  >
                    View Details
                  </ActionButton>
                 
                </tr>
              ))}
            </tbody>
          </ExpensesTable>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className='pagination'>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i)}
                disabled={i === currentPage}
                className={`pagination-button ${
                  i === currentPage ? 'active' : ''
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {isFilterApplied &&
          displayedExpenses.length < expenses.length &&
          selectedMonth !== 'All' &&
          selectedYear !== 'All' && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              style={{ marginTop: '10px' }}
            >
              {loading ? 'Loading...' : 'Load More'}
            </button>
          )}
      </Container>
    </div>
  )
}

export default AllExpenseList
