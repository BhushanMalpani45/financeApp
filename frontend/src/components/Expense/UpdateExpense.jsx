import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getExpenseById, updateExpense } from "../../services/expense";

const UpdateExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    isRecurring: false,
    notes: '',
    transactionType: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        if (!id) {
          setError("Expense ID is missing");
          setIsLoading(false);
          return;
        }

        const response = await getExpenseById(id);
        
        if (response && response.data) {
          const expense = response.data;
          setFormData({
            amount: expense.amount || '',
            category: expense.category || '',
            date: expense.date ? expense.date.split('T')[0] : '',
            isRecurring: expense.isRecurring || false,
            notes: expense.notes || '',
            transactionType: expense.transactionType || ''
          });
        } else {
          setError("Unable to fetch expense details");
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
        setError(error.response?.data?.message || "Failed to fetch expense");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpense();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (!formData.category.trim()) {
      setError('Category is required');
      return false;
    }
    if (!formData.date) {
      setError('Date is required');
      return false;
    }
    if (!formData.transactionType.trim()) {
      setError('Transaction Type is required');
      return false;
    }
    setError('');
    return true;
  };

  const handleUpdateExpense = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      // Convert amount to number
      const updateData = {
        ...formData,
        amount: parseFloat(formData.amount)
      };

      await updateExpense(id, updateData);
      navigate("/expense");
    } catch (error) {
      console.error("Error updating expense:", error);
      setError(error.response?.data?.message || 'Failed to update expense');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-expense-container">
      <h2>Update Expense</h2>
      
      {error && (
        <div 
          className="error-message" 
          style={{ 
            color: 'red', 
            marginBottom: '15px', 
            padding: '10px', 
            backgroundColor: '#ffeeee',
            borderRadius: '5px'
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleUpdateExpense}>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="Enter amount"
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            id="category"
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="transactionType">Transaction Type</label>
          <select
            id="transactionType"
            name="transactionType"
            value={formData.transactionType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Transaction Type</option>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleInputChange}
            />
            Recurring Expense
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            placeholder="Enter additional notes"
          />
        </div>

        <button type="submit" className="submit-btn">
          Update Expense
        </button>
      </form>
    </div>
  );
};

export default UpdateExpense;