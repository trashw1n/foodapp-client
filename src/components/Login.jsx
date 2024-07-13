import React, {useState} from 'react';
import axios from 'axios';
import '../styles/Login.css';
import Cookies from 'js-cookie';
import dotenv from 'dotenv';
import { useNavigate } from 'react-router-dom';
import useAuthToken from '../hooks/useAuthToken';

function Login() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState('valid');
    const {setToken} = useAuthToken();
    const handleRegister = async () => {
      if(!name || !password){
        setMessage('please fill in the required details');
        setIsValid('invalid');
      } else{
        try{
          const response = await axios.post(
            process.env.REACT_APP_REGISTER_URL, 
            {name, password, role}
          );
          if(response.status === 200){
            setName('');
            setPassword('');
            setIsValid('valid');
            setMessage(response.data.msg);
          }
        } catch(err){
          setIsValid('invalid');
          setName('');
          setPassword('');
          setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
        }
      }
    }
    const handleLogin = async () => {
      if(!name || !password){
        setMessage('please fill in the required details');
        setIsValid('invalid');
      } else{
        try{
          const response = await axios.post(
            process.env.REACT_APP_LOGIN_URL, 
            {name, password, role}
          );
          if(response.status === 200){
            setIsValid('valid');
            setMessage(response.data.msg);
            setToken(response.data.token);
            setTimeout(() => navigate(`/${role}`), 1500);
          }
        } catch(err){
          setIsValid('invalid');
          setName('');
          setPassword('');
          setMessage(err.response?.data?.msg || 'An error occurred. Please try again.');
        }
      }
    }
    return (
        <div className="login-container">
        <h2>Food App</h2>
        <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="role">Role:</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="staff">Staff</option>
            </select>
        </div>
        <div className="button-group">
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
        </div>
        {message && <p className={`message-${isValid}`}>{message}</p>}
        </div>
    )
}

export default Login