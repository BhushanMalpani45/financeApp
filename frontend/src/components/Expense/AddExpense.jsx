import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../services/expense";
import {
  DollarSign,
  Tag,
  Calendar,
  Repeat,
  FileText,
  ArrowRight,
  X,
} from "lucide-react";

const AddExpense = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    date: "",
    isRecurring: false,
    notes: "",
    transactionType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const categories = [
    "Groceries",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Dining Out",
    "Shopping",
    "Rent/Mortgage",
    "Savings",
    "Other",
  ];
  
  const transactionTypes = ["Cash", "Gpay", "PhonePay", "CreditCard"];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddExpense = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Destructure formData
      const { category, amount, date, isRecurring, transactionType, notes } = formData;

      // Validate form data
      if (!amount || !category || !transactionType) {
        setError("Please fill in all required fields");
        setIsLoading(false);
        return;
      }

      await addExpense({
        ...formData,
        amount: parseFloat(amount),
      });

      // Navigate after successful addition
      navigate("/user");
    } catch (error) {
      console.error("Error adding expense:", error);
      setError(error.message || "Failed to add expense");
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    navigate("/user");
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal Header */}
        <div className="bg-blue-50 p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <DollarSign className="mr-3 text-blue-600" />
            Add New Transaction
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Record your income or expense to track your financial activities
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddExpense} className="p-6 space-y-4">
          {/* Amount Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <input
                type="number"
                name="amount"
                step="0.01"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Transaction Type
            </label>
            <select
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Transaction Type</option>
              {transactionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Recurring Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isRecurring"
              checked={formData.isRecurring}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm text-gray-900">
              Mark as recurring transaction
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              name="notes"
              rows={3}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional details"
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
