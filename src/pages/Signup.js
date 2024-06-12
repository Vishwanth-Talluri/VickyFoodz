import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const[credentials,setCredentials]=useState({username:'',email:'',password:'',location:''})

    let navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
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
            }else{
                navigate('/login')
            }

            const jsonData = await response.json();
            console.log(jsonData);
            alert(jsonData.message);
        } catch (error) {
            console.error('There was an error!', error);
            alert('There was an error during the signup process. Please try again.');
        }


    }

    const handleChange=(event)=>{
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <div className='container w-50 mt-5'>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label for="username" class="form-label">Username</label>
                    <input type="text" class="form-control" name='username' value={credentials.username} onChange={handleChange}/>

                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" name='email' value={credentials.email} onChange={handleChange}/>
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1"  name='password' value={credentials.password} onChange={handleChange}/>
                </div>
                
                <div class="mb-3">
                    <label for="location" class="form-label">Address</label>
                    <input type="text" class="form-control" name='location' value={credentials.location} onChange={handleChange}/>

                </div>

                <button type="submit" class="btn btn-success mr-3">Submit</button>
                <Link to='/login' className='m-3 btn btn-outline-primary'>Already a user?</Link>
            </form>
        </div>
    )
}