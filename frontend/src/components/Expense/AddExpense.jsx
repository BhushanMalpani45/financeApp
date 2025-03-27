import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { addExpense } from '../../services/expense';

const AddExpense = () => {
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [isRecurring, setIsRecurring] = useState(false);
    const [notes, setNotes] = useState("");
    const [transactionType, setTransactionType] = useState("");

    const navigate = useNavigate();

    const handleAddExpense = async (event) => {
        event.preventDefault(); // Prevent form refresh
        
        try {
            const expenseData = { category, amount, date, isRecurring,transactionType, notes };
            console.log(expenseData);
            const response = await addExpense(expenseData);
            alert("Success");

            console.log("Data added: ", response);
            
            // Reset form fields
            setAmount("");
            setCategory("");
            setDate("");
            setIsRecurring(false);
            setNotes("");
            setTransactionType("")

            navigate("/expense");
        } catch (error) {
            console.error("Error adding expense:", error);
            alert(error);
        }
    };
    
    return (
        <div>
            <form onSubmit={handleAddExpense}>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" required /> Amount
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" required /> Category
                <input type="text" value={transactionType} onChange={(e) => setTransactionType(e.target.value)} placeholder="transaction Type"/> TransactionType
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/> Date
                <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} /> Recurring Expense
                <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes (optional)" /> Notes
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
