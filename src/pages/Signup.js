import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/Bgc.css';

export default function Signup() {
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '', location: '' });
    const [errors, setErrors] = useState({});
    let navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (!credentials.username) {
            errors.username = 'Username is required';
        }
        if (!credentials.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!credentials.password) {
            errors.password = 'Password is required';
        } else if (credentials.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }
        if (!credentials.location) {
            errors.location = 'Address is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const response = await fetch("http://localhost:4000/users/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password,
                    location: credentials.location
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                navigate('/login');
            }

            const jsonData = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error during the signup process. Please try again.');
        }
    };

    const handleChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div id='login'>
            <div className='container w-50 mt-5 text-white bg-opacity rounded'>
                <div className='fs-2 fw-bold'>Register</div>
                <hr className='thick-hr '/>
                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" name='username' value={credentials.username} onChange={handleChange} required />
                        {errors.username && <div className="text-danger">{errors.username}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={handleChange} required />
                        {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={handleChange} required />
                        {errors.password && <div className="text-danger " >{errors.password}</div>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" className="form-control" name='location' value={credentials.location} onChange={handleChange} required />
                        {errors.location && <div className="text-danger">{errors.location}</div>}
                    </div>
                    <button type="submit" className="btn btn-success mr-3">Submit</button>
                    <Link to='/login' className='m-3 btn btn-primary'>Already a user?</Link>
                </form>
            </div>
        </div>
    );
}
