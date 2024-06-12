import React ,{useEffect, useRef, useState} from 'react';
import '../components/Card.css'
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card(props) {
    let data=useCart()
    let dispatch = useDispatchCart()
    let options = props.options 
    let priceOptions= Object.keys(options)
    const [quantity,setQuantity]=useState(1)
    const [size,setSize] = useState('')
    let handleAddtoCart= async()=>{
        let food = []
        for(const item of data){
            if(item.id === props.foodItem._id){
                food=item
                break
            }
        }

        if(food!=[]){
            if(food.size===size){
                await dispatch({type:'UPDATE',id:props.foodItem._id,price:finalPrice,qty:quantity,img:props.img})
                return
            }
            else if(food.size!==size){
                await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice, qty:quantity,size:size,img:props.img})
                return
            }
            return
        }
        await dispatch({type:'ADD',id:props.foodItem._id,name:props.foodItem.name,price:finalPrice, qty:quantity,size:size,img:props.img})
    }
    const priceRef = useRef()
    let finalPrice = quantity* parseInt(options[size])
    useEffect(()=>{
        setSize(priceRef.current.value)
    },[])
    return (
        <div>
            <div>
                <div className="card mt-3" id='card' style={{"width": "18rem","height":"360px"}}>
                    <img src={props.foodItem.img} class="card-img-top" alt="..." style={{height:"180px",objectFit:"fill"}}/>
                        <div className="card-body">
                            <h5 className="card-title ms-2">{props.foodItem.name}</h5>
                            <div className="container w-100">
                                <select  className=" h-100 bg-success rounded text-white" onChange={(e)=> setQuantity( e.target.value)}>
                                    {
                                        Array.from(Array(6),(e,i)=>{
                                            return(
                                                <option key={i+1} value={i+1}>{i+1}</option>
                                            )
                                        })
                                    }
                                </select>
                                <select className='mx-2 h-100 bg-success rounded text-white' ref={priceRef}  onChange={(e)=> setSize(e.target.value)}>
                                    {priceOptions.map((data)=>{
                                        return <option key={data} value={data}>{data}</option>
                                    })}
                                </select>
                                <div className="d-inline h-100 fs-5 mx-2 ">
                                    ₹{finalPrice}/-
                                </div>
                                <hr />
                                <button className="btn btn-success justify-center " onClick={handleAddtoCart}>Add to Cart</button>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}
