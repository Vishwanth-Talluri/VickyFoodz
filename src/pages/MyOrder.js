import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:4000/orders/my-orders", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrderData(data.orderData ? [data.orderData] : []);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMyOrder();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Navbar />
            <div className='container' style={{minHeight:"80vh"}}>
                <div className='row'>
                    {orderData.length > 0 ? (
                        orderData.map(order => (
                            order && order.order_data && order.order_data.map((orderItem, index) => (
                                <div key={index}>
                                    {orderItem[0] && orderItem[0].order_date && (
                                        <div className='m-auto mt-5'>
                                            <div>
                                                Order Date: {orderItem[0].order_date}
                                                <hr />
                                            </div>
                                        </div>
                                    )}
                                    <div className='col-12 col-md-6 col-lg-3'>
                                        {orderItem.slice(1).map((arrayData, idx) => (
                                            <div key={idx} className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                <div className="card-body">
                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                        <span className='m-1'>{arrayData.qty}</span>
                                                        <span className='m-1'>{arrayData.size}</span>
                                                        <span className='m-1'>{orderItem[0].order_date}</span>
                                                        <div className='d-inline ms-2 h-100 w-20 fs-5'>₹{arrayData.price}/-</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        ))
                    ) : (
                        <div className='fs-3 fw-bold text-center'>No orders found</div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}
