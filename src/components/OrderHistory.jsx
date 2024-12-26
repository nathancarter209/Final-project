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
                setLoading(true);
                setError(null);
                try {
                    const ordersCollection = collection(db, 'orders');
                    const q = query(ordersCollection, where('address.email', '==', user.email)); // Query by user email

                    const querySnapshot = await getDocs(q);
                    const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        return <div className='no-orders'>No orders found.</div>;
    }

    return (
        <div className="order-history-container">
            <h1>Order History</h1>
            <ul className="order-list">
                {orders.map(order => (
                    <li key={order.id} className="order-item">
                        <h2>Order ID: {order.id}</h2>
                        <p>Total: ₹{order.total}</p>
                        <p>Ordered on: {order.timestamp?.toDate().toLocaleString()}</p> {/* Format timestamp */}
                        <h3>Items:</h3>
                        <ul>
                            {order.items.map((item) => (
                                <li key={item.foodId}>
                                    {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                                </li>
                            ))}
                        </ul>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;