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
            <div className="invoice-container error">
                <p>Error: {error}</p>
                <button onClick={() => window.location.reload()}>Try Again</button>
            </div>
        );
    }

    if (loading) {
        return <div className="invoice-container loading">Loading order details...</div>;
    }

    if (!order) {
        return <div className="invoice-container not-found">Order not found.</div>;
    }

    return (
        <div className="invoice-container">
            <div className="invoice-header">
                <h1>Invoice</h1>
                <p className="invoice-number">Order ID: {orderId}</p>
                <p className="invoice-date">Date: {new Date().toLocaleDateString()}</p>
            </div>

            <div className="invoice-billing-info">
                <h2>Billing Information</h2>
                <p>Name: {order.address?.name || "N/A"}</p> {/* Optional chaining with default value */}
                <p>Address: {order.address?.addressLine || "N/A"}</p>
                <p>Phone: {order.address?.phone || "N/A"}</p>
                <p>Email: {order.address?.email || "N/A"}</p>
            </div>

            <div className="invoice-items">
                <h2>Order Items</h2>
                {order.items && order.items.length > 0 ? (
                    <table className="order-items-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((product) => (
                                <tr key={product.foodId}>
                                    <td>{product.name || "N/A"}</td>
                                    <td>{typeof product.quantity === 'number' ? product.quantity : "N/A"}</td>
                                    <td>₹{(typeof product.price === 'number' ? product.price : 0).toFixed(2)}</td>
                                    <td>₹{(typeof product.price === 'number' && typeof product.quantity === 'number' ? product.quantity * product.price : 0).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items found in this order.</p>
                )}
            </div>

            <div className="invoice-summary">
                <p className="invoice-subtotal">Subtotal: ₹{(typeof order.subtotal === 'number' ? order.subtotal : 0).toFixed(2)}</p>
                <p className="invoice-total">Total: ₹{(typeof order.total === 'number' ? order.total : 0).toFixed(2)}</p>
            </div>

            <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                Start Another Order
            </button>
        </div>
    );
};

export default OrderConfirmation;