import React, { useState, useEffect } from "react";
import { addExpense, getExpense, deleteExpense, updateExpense } from "../../services/expense";
import { useNavigate } from "react-router-dom";

const ExpenseTracker = () => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadExpenses();
    }, []);

    const loadExpenses = async () => {
        try {
            const res = await getExpense();
            setExpenses(res.data);
        } catch (error) {
            console.error("Failed to load expenses:", error);
            // Optional: Add error handling, such as setting an error state
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);
            loadExpenses();
        } catch (error) {
            console.error("Failed to delete expense:", error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/updateExpense/${id}`);
    };

    const handleAddExpense = () => {
        navigate('/add');
    };

    return (
        <div className="expense-tracker">
            <h2>Expenses</h2>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Transaction Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map((exp) => (
                        <tr key={exp._id}>
                            <td>{exp.date}</td>
                            <td>{exp.amount}</td>
                            <td>{exp.category}</td>
                            <td>{exp.transactionType}</td>
                            <td>
                                <button onClick={() => handleDelete(exp._id)}>Delete</button>
                                <button onClick={() => handleUpdate(exp._id)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleAddExpense}>Add Expense</button>
        </div>
    );
};

export default ExpenseTracker;