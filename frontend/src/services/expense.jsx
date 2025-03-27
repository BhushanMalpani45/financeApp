import axios from 'axios';

const URL = "http://localhost:5000/api/expense";

export const addExpense = async(expenseData)=>{
    console.log("sdsdcds", expenseData);
    const response = await axios.post(`${URL}/add`, expenseData,{ withCredentials: true })
    console.log("REsponse Data:",response.data);
    if(response.data){alert("Success")}
    else{
        alert("fail");
    }
    return response.data;
};

export const getExpense = async() =>{
    return await axios.get(`${URL}/user`,{ withCredentials: true });
};

export const getExpenseById = async (id) => {
    return await axios.get(`${URL}/${id}`,{ withCredentials: true });
};

export const updateExpense = async(id, updateData)=>{
    return await axios.put(`${URL}/${id}`, updateData,{ withCredentials: true });
};

export const deleteExpense = async(id)=>{
    return await axios.delete(`${URL}/${id}`,{ withCredentials: true });
}

