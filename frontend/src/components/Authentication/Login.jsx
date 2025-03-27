import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authentication";
import Error from "../Error";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isError, setIsError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      setFormData({ email: "", password: "" });
      navigate('/expense');
    } catch (error) {
      setIsError("User credential not valid");
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value.trim() })}
          placeholder="Email"
        />{" "}
        Email
        <input
          type="text"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value.trim() })
          }
          placeholder="Password"
        />
        Password
        <button type="submit">Login</button>
      </form>
      {isError && <Error message={isError} />}
    </div>
  );
};

export default Login;
