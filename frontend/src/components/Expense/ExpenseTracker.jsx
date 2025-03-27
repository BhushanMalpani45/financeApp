import React, { useState, useEffect } from "react";
import { getExpense, deleteExpense } from "../../services/expense";
import { useNavigate } from "react-router-dom";
import { 
  Trash2, 
  Edit, 
  PlusCircle, 
  Calendar, 
  DollarSign, 
  Tag, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Utility function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Utility function to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {
        setIsLoading(true);
        try {
            const res = await getExpense();
            console.log("Fetched Expenses:", res.data);
            setExpenses(res.data);
            setError(null);
        } catch (error) {
            console.error("Failed to load expenses:", error);

            if (error.response && error.response.status === 401) {
                navigate("/login");
            } else {
                setError("Failed to load expenses. Please try again.");
            }
        }
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            loadExpenses(); // Reload the expenses after deletion
        } catch (error) {
            console.error("Failed to delete expense:", error);
            setError("Failed to delete expense. Please try again.");
        }
    };

    const handleUpdate = (expense) => {
        console.log("Navigating to updateExpense with ID:", expense._id);
        navigate(`/updateExpense/${expense._id}`, { state: { expense } });
    };

    const handleAddExpense = () => {
        navigate('/add');
    };

    // Calculate summary statistics
    const totalExpenses = expenses.reduce((total, exp) => 
        exp.transactionType === 'Expense' ? total + exp.amount : total, 0);
    const totalIncome = expenses.reduce((total, exp) => 
        exp.transactionType === 'Income' ? total + exp.amount : total, 0);

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
                    <button 
                        onClick={handleAddExpense}
                        className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        <PlusCircle className="mr-2" />
                        Add Expense
                    </button>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-gray-500 text-sm">Total Income</h3>
                                <p className="text-2xl font-bold text-green-600">
                                    {formatCurrency(totalIncome)}
                                </p>
                            </div>
                            <ArrowUpRight className="text-green-600" />
                        </div>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-gray-500 text-sm">Total Expenses</h3>
                                <p className="text-2xl font-bold text-red-600">
                                    {formatCurrency(totalExpenses)}
                                </p>
                            </div>
                            <ArrowDownRight className="text-red-600" />
                        </div>
                    </div>
                </div>

                {/* Expenses Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-6 text-gray-500">Loading expenses...</div>
                    ) : error ? (
                        <div className="text-center py-6 text-red-500">{error}</div>
                    ) : expenses.length === 0 ? (
                        <div className="text-center py-6 text-gray-500">
                            No expenses found. Add your first expense!
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-4 text-left flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                                        Date
                                    </th>
                                    <th className="p-4 text-left">
                                        <DollarSign className="inline-block mr-2 h-4 w-4 text-gray-500" />
                                        Amount
                                    </th>
                                    <th className="p-4 text-left">
                                        <Tag className="inline-block mr-2 h-4 w-4 text-gray-500" />
                                        Category
                                    </th>
                                    <th className="p-4 text-left">
                                        Transaction Type
                                    </th>
                                    <th className="p-4 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {expenses.map((exp) => (
                                    <tr 
                                        key={exp._id} 
                                        className="border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="p-4">{formatDate(exp.date)}</td>
                                        <td className={`p-4 font-semibold ${
                                            exp.transactionType === 'Income' 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
                                        }`}>
                                            {formatCurrency(exp.amount)}
                                        </td>
                                        <td className="p-4">{exp.category}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                                                ${exp.transactionType === 'Income' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                                }`}>
                                                {exp.transactionType}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => handleUpdate(exp)}
                                                className="text-blue-600 hover:text-blue-800 mr-4"
                                                title="Edit"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(exp._id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExpenseTracker;
