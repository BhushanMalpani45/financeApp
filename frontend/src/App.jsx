import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ExpenseTracker from './components/Expense/ExpenseTracker';
import AddExpense from './components/Expense/AddExpense';
import UpdateExpense from './components/Expense/UpdateExpense';
import Login from './components/Authentication/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Authentication/Signup';

const App = () => {
  return (
    <Routes>
      <Route path='/user' element={<ExpenseTracker/>} />
      <Route path="/add" element={<AddExpense />}/>
      <Route path="/updateExpense/:id" element={<UpdateExpense/>}/>
      <Route path='/login' element={<Login></Login>} ></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
    </Routes>
  );
};

export default App;
