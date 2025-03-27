import axios from 'axios';

const URL = "http://localhost:5000/api/auth";

export const login = async (userData) => {
  try {
    const { email, password } = userData;
    const response = await axios.post(`${URL}/login`, { email, password }, { withCredentials: true });
    return response.data; 

  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
export const logout = async()=>{
    return await axios.post(`${URL}/logout`,{}, { withCredentials: true });
}

export const registerUser = async(userData)=>{
    return await axios.post(`${URL}/signup`, userData, { withCredentials: true });
};

export const checkAuth = async()=>{
    return await axios.get(`${URL}/expense`, {withCredentials:true} );
}