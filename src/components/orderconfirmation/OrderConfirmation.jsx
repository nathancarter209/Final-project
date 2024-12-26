import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { app } from '../../config/Firebase.js';
import '../Styles/OrderConformmation.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore(app);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            setError(null);
            try {
                const orderDocRef = doc(db, 'orders', orderId);
                const docSnap = await getDoc(orderDocRef);

                if (docSnap.exists()) {
                    setOrder(docSnap.data());
                } else {
                    setError("Order not found");
                }
            } catch (err) {
                console.error("Error fetching order:", err);
                setError("Failed to fetch order");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, db]);

    const handleContinueShopping = () => {
        navigate('/'); 
    };

    if (error) {
        return (
            <div className="order-confirmation-container error">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    if (loading) {
        return <div className="order-confirmation-container loading">Loading order details...</div>;
    }

    if (!order) {
        return <div className="order-confirmation-container not-found">Order not found.</div>;
    }

    return (
        <div className="order-confirmation-container">
            <h1>Order Confirmation</h1>
            <p className="thank-you">Thank you for your order!</p>
            <p className="order-id">Order ID: {orderId}</p>

            <div className="order-details">
                <h2>Order Details</h2>
                {order.items && order.items.length > 0 ? (
                    <ul className="order-items">
                        {order.items.map((product) => (
                            <li key={product.foodId} className="order-item">
                                
                                <div className="product-info">
                                    <p className="product-name">{product.name}</p>
                                    <div className="price-quantity">
                                        <p className="product-quantity">Quantity: {product.quantity}</p>
                                        <p className="product-price">Price: ₹{product.price}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items found in this order.</p>
                )}
                <div className="address-details">
                    <h2>Shipping Address</h2>
                    <p>Name: {order.address?.name}</p>
                    <p>Address: {order.address?.addressLine}</p>
                    <p>Phone: {order.address?.phone}</p>
                    <p>Email: {order.address?.email}</p>
                </div>
                <p className="order-total">Total: ₹{order.total}</p>
            </div>

            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                Start Another Order
            </button>
        </div>
    );
};

export default OrderConfirmation;