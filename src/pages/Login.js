import React ,{useState} from 'react'
import {  Link, useNavigate } from 'react-router-dom'
import '../components/Bgc.css'

export default function Login() {
    const[credentials,setCredentials]=useState({username:'',email:'',password:'',location:''})

    let navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:4000/users/login", {
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
            }

            const jsonData = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
            if(jsonData.message==="login success"){
                localStorage.setItem('userEmail',credentials.email)
                localStorage.setItem('token',jsonData.token)
                navigate('/')
            }
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error during the login process. Please try again.');
        }


    }

    const handleChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <div className='container w-50 mt-5 h-100vh' id="login">
            <form onSubmit={handleSubmit}>
                
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={handleChange}/>
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"  name='password' value={credentials.password} onChange={handleChange}/>
                </div>
                <button type="submit" class="btn btn-success mr-3">Submit</button>
                <Link to='/signup' className='m-3 btn btn-outline-primary'>New User?</Link>
            </form>
        </div>
  )
}