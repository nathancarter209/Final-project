import React, { useState, useEffect } from 'react';
import { useAuth } from '../config/Context';
import { collection, query, where, getDocs, getFirestore } from 'firebase/firestore';
import { app } from '../config/Firebase';
import './Styles/OrderHistory.css';

const OrderHistory = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                console.log("Fetching orders for user:", user.email); // Debugging
                setLoading(true);
                setError(null);
                try {
                    const ordersCollection = collection(db, 'orders');
                    const q = query(ordersCollection, where('address.email', '==', user.email));
                    const querySnapshot = await getDocs(q);
                    const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    console.log("Fetched orders:", ordersData); // Debugging
                    setOrders(ordersData);
                } catch (err) {
                    console.error("Error fetching orders:", err);
                    setError("Failed to fetch orders.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchOrders();
    }, [user, db]);

    if (!user) {
        return <div className='no-user'>Please log in to view your order history.</div>;
    }

    if (loading) {
        return <div className='loading'>Loading order history...</div>;
    }

    if (error) {
        return <div className='error'>{error}</div>;
    }

    if (orders.length === 0) {
        return (
            <div className="no-orders-container">
                <h1>No Orders Found</h1>
                <p>You haven't placed any orders yet. Why not browse our shop and get started?</p>
                <button onClick={() => window.location.href = '/shop'} className="shop-now-button">
                    Shop Now
                </button>
            </div>
        );
    }

    return (
        <div className="order-history-container">
            <h1>Order History</h1>
            {orders.map(order => (
                <div key={order.id} className="order-invoice">
                    <div className="order-header">
                        <h2>Order ID: {order.id}</h2>
                        <p>Date: {order.timestamp?.toDate().toLocaleString() || "Unknown"}</p>
                    </div>
                    <div className="order-items">
                        <h3>Items:</h3>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index} className="order-item">
                                    <span>{item.name || "Unknown Item"}</span>
                                    <span>Quantity: {item.quantity || 0}</span>
                                    <span>Price: ₹{(item.price * item.quantity) || 0}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="order-summary">
                        <h3>Total Amount: ₹{order.total || "Unknown"}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
