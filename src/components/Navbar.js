import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { Badge } from 'react-bootstrap'
import Modal from '../Modal'
import MyCart from '../pages/MyCart'
import { useCart } from './ContextReducer'

export default function Navbar() {
    const navigate=useNavigate()
    let data=useCart()
    const handleLogout=()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    const [cartView,setCartView]=useState(false)


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid">
    <Link className="navbar-brand fs-4" to="/">VickyFoodz</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav me-auto mb-2">
        <Link className="nav-link mx-3 fs-5 text-white" aria-current="page" to="/">Home</Link>
        {(localStorage.getItem('token'))?
        <Link className="nav-link mx-3 fs-5 text-white" aria-current="page" to="/my-orders">My Orders</Link>:''}
      </div>
      {(!localStorage.getItem('token'))?
      <div className='d-flex'>
      <Link className="nav-link mx-3 fs-5 text-white" to="/login">Login</Link>
        <Link className="nav-link mx-3 fs-5 text-white" to="/signup">Signup</Link>
      </div> : <div>
        <div className="btn bg-white text-primary mx-2 " onClick={()=>setCartView(true)}>
            My Cart{" "}
            <Badge pill bg="danger" >{data.length===0?'':data.length}</Badge>
        </div>
        {cartView?<Modal onClose={()=>setCartView(false)}><MyCart/></Modal>:null}
        <div className="btn bg-white text-danger mx-2 " onClick={handleLogout}>LogOut</div>
      </div>
}
    </div>
  </div>
</nav>
    </div>
  )
}
