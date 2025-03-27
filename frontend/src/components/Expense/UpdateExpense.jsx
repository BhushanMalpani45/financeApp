import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateExpense } from "../../services/expense";
import { DollarSign, Tag, Calendar, X } from "lucide-react";

const UpdateExpense = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { expense } = location.state || {}; 

  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    category: "",
    transactionType: "",
  });

  useEffect(() => {
    if (!expense) {
      navigate("/user");
    } else {
      setFormData({
        date: expense.date ? new Date(expense.date).toISOString().split("T")[0] : "",
        amount: expense.amount || "",
        category: expense.category || "",
        transactionType: expense.transactionType || "Cash",
      });
    }
  }, [expense, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateExpense(expense._id, formData);
      navigate("/user");
    } catch (error) {
      console.error("Failed to update expense:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => navigate("/user")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <div className="bg-blue-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <DollarSign className="mr-3 text-blue-600" />
            Update Transaction
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="relative">
              <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Cash">Cash</option>
              <option value="Gpay">Gpay</option>
              <option value="PhonePay">PhonePay</option>
              <option value="CreditCard">CreditCard</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateExpense;
