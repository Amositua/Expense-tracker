import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import axios from "axios";

const EditExpense = () => {
  const { id } = useParams(); // Get expense ID from URL
  const [expense, setExpense] = useState(null);
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem('userInfo')
  let userId
  if (token) {
    const decodedToken = jwtDecode(token)
    userId = decodedToken.userId
    console.log(userId)
  }

  useEffect(() => {
    const fetchExpense = async () => {
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

    fetchExpense();
  }, [id, userId]);

  console.log(expense)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData()

    if (file) {
      data.append('file', file) // Attach the file
    }

    // Append form fields to FormData
    const expenseDto = expense;
    console.log(expenseDto)

    data.append('expenseDto', JSON.stringify(expenseDto))

    try {
      const token = localStorage.getItem("userInfo");
      const parsedToken = JSON.parse(token);

      await axios.put(
        `/api/v1/expense/update-expense/${id}`,
        data,
        {
          headers: { Authorization: `Bearer ${parsedToken.accessToken}` },
        }
      );

      alert("Expense updated successfully!");
      navigate("/"); // Redirect to expense table
    } catch (err) {
      setError("Failed to update expense. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]) // Store the file for submission
  }


  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Edit Expense</h2>
      {true && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="nameOfEmployee"
              value={expense?.nameOfEmployee}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type:</label>
            <input
              type="text"
              name="expenseType"
              value={expense?.expenseType}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="expenseDescription"
              value={expense?.expenseDescription}
              onChange={handleChange}
            />
          </div>

          <div className='row'>
            <h3>Upload File</h3>
            <label>Choose an image or PDF file</label>
            <div className='input-group'>
              <input
                type='file'
                // id='file'
                accept='image/*,.pdf'
                onChange={handleFileChange}
                required
              />
            </div>
          </div>

          <div>
            <label>Date:</label>
            <input 
              type="date" 
              name="currentDate"
              value={expense?.currentDate}
              onChange={handleChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Expense"}
          </button>
        </form>
      )}
    </div>
  );
};

export default EditExpense;
