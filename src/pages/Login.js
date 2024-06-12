import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Bgc.css';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch("http://localhost:4000/users/login", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const jsonData = await response.json();
                console.log(jsonData);
                alert(jsonData.message);
                if (jsonData.message === "login success") {
                    localStorage.setItem('userEmail', credentials.email);
                    localStorage.setItem('token', jsonData.token);
                    navigate('/');
                }
            } catch (error) {
                console.error('There was an error!', error);
                alert('There was an error during the login process. Please try again.');
            }
        }
    }

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    const validateForm = () => {
        let valid = true;
        let errorsObj = {};
        if (!credentials.email) {
            errorsObj.email = 'Email is required';
            valid = false;
        }
        if (!credentials.password) {
            errorsObj.password = 'Password is required';
            valid = false;
        }
        setErrors(errorsObj);
        return valid;
    }

    return (
        <div id="login">
            <div className='container text-white w-50 h-100vh bg-opacity rounded'>
                <div className='fs-2 fw-bold mb-3'>Login</div>
                <hr className='thick-hr' />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control bg-light" id="exampleInputEmail1" name='email' value={credentials.email} onChange={handleChange} />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control bg-light" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} />
                        {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                    <button type="submit" className="btn btn-success mr-3">Submit</button>
                    <Link to='/signup' className='m-3 btn btn-primary'>New User?</Link>
                </form>
            </div>
        </div>
    )
}
