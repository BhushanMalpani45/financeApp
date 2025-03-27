import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authentication';

const Signup = () => {

    const [formData, setFormData] = useState({name: "", email: "", password:""});
    const navigate = useNavigate();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            setFormData({name: "", email: "", password:""});
            navigate('/expense')
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            NAME: <input type="text" placeholder='name' onChange={(e)=> setFormData({...formData, name: e.target.value})} />
            EMAIL: <input type="text" placeholder='email' onChange={(e)=>setFormData({...formData, email: e.target.value})} />
            PASSWORD: <input type="text" placeholder='password' onChange={(e)=>setFormData({...formData, email: e.target.value})} />

            <button type='submit'>Register</button>
        </form>
    </div>
  )
}

export default Signup