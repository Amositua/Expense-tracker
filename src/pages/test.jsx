import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Use params for editing a specific expense
import { toast } from 'react-toastify';
import '../styles/LogExpense.css';

function LogEditExpense({ expenseData }) {
  const { expenseId } = useParams(); // Get expenseId for editing
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    expenseId: expenseId || null,
    nameOfEmployee: '',
    employeeEmploymentNumber: '',
    employeeDepartment: '',
    phoneNumber: '',
    currentDate: '',
    expenseType: '',
    expenseDescription: '',
    expenseAmount: '',
    image: '',
    imageUrl: '', // Store existing file URL
  });

  const [file, setFile] = useState(null);

  // Fetch expense data if editing
  useEffect(() => {
    if (expenseId) {
      // Fetch the expense data (mock example)
      const fetchExpense = async () => {
        try {
          // Replace with API call to fetch expense details
          const fetchedExpense = await fetch(`/api/expenses/${expenseId}`).then(res => res.json());
          setFormData({
            ...fetchedExpense,
            expenseId,
            currentDate: new Date(fetchedExpense.currentDate).toISOString().split('T')[0], // Format date
          });
        } catch (err) {
          toast.error('Error fetching expense data');
        }
      };

      fetchExpense();
    }
  }, [expenseId]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'expenseAmount' ? value.replace(/[^\d]/g, '') : value,
    }));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // If you want to show a preview of the new selected file
    setFormData((prevData) => ({
      ...prevData,
      image: selectedFile, // For backend
      imageUrl: URL.createObjectURL(selectedFile), // For preview
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    if (file) {
      data.append('file', file); // Attach the file
    }

    const expenseDto = {
      ...formData,
      expenseId: Number(formData.expenseId),
      expenseAmount: Number(formData.expenseAmount),
    };

    data.append('expenseDto', JSON.stringify(expenseDto));

    try {
      // Submit the form (mock example)
      await fetch(`/api/expenses/${expenseId ? 'update' : 'log'}`, {
        method: 'PUT',
        body: data,
      });
      toast.success(`Expense ${expenseId ? 'updated' : 'logged'} successfully!`);
      navigate('/expenses');
    } catch (err) {
      toast.error('Error submitting expense');
    }
  };

  return (
    <div>
      <header className="flex">
        <p className="pageHeader">{expenseId ? 'Edit Expense' : 'Log Expense'}</p>
      </header>

      <div className="container">
        <form className="log-expense" onSubmit={handleSubmit}>
          {/* Other input fields */}
          <div className="row">
            <h3>Upload File</h3>
            <label>Choose an image or PDF file</label>
            {formData.imageUrl && (
              <div className="file-preview">
                {formData.imageUrl.endsWith('.pdf') ? (
                  <a href={formData.imageUrl} target="_blank" rel="noopener noreferrer">
                    View Uploaded PDF
                  </a>
                ) : (
                  <img src={formData.imageUrl} alt="Uploaded File" style={{ maxWidth: '100%' }} />
                )}
              </div>
            )}
            <div className="input-group">
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="row flex">
            <button type="submit" className="submit-button">
              {expenseId ? 'Update Expense' : 'Submit Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogEditExpense;
