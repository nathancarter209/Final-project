import React, { useState, useEffect } from 'react';
import { ref, onValue, update, getDatabase } from 'firebase/database'; // Import getDatabase
import { app } from '../../config/Firebase'; // Import your Firebase app instance
import { Table, TableBody, TableCell, TableHead, TableRow, TableHeader } from '../ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export default function AdminPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);       

    useEffect(() => {
        const db = getDatabase(app); 
        const ordersRef = ref(db, 'orders');

        const unsubscribe = onValue(ordersRef, (snapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const orderList = Object.entries(data).map(([id, order]) => ({
                        id,
                        ...order,
                    }));
                    setOrders(orderList);
                } else {
                    setOrders([]); 
                }
            } catch (err) {
                setError(err);
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe(); 
    }, []);

    const updateOrderStatus = (orderId, newStatus) => {
        const db = getDatabase(app);
        const orderRef = ref(db, `orders/${orderId}`);
        update(orderRef, { status: newStatus })
            .then(() => {
                // Optionally provide user feedback here (e.g., a toast message)
                console.log("Order status updated successfully!");
            })
            .catch((error) => {
                console.error("Error updating order status:", error);
                // Optionally show an error message to the user
            });
    };

    if (loading) {
        return <div>Loading orders...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Restaurant Admin Dashboard</h1>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableHeader>Order ID</TableHeader>
                        <TableHeader>Customer Name</TableHeader>
                        <TableHeader>Items</TableHeader>
                        <TableHeader>Status</TableHeader>
                        <TableHeader>Timestamp</TableHeader>
                        <TableHeader>Actions</TableHeader>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell>{order.items?.join(', ') || "No items"}</TableCell> {/* Handle undefined items */}
                            <TableCell>{order.status}</TableCell>
                            <TableCell>{order.timestamp ? new Date(order.timestamp).toLocaleString() : "No timestamp"}</TableCell> {/* Handle undefined timestamp */}
                            <TableCell>
                                <Select
                                    onValueChange={(value) => updateOrderStatus(order.id, value)}
                                    defaultValue={order.status}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Update status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="preparing">Preparing</SelectItem>
                                        <SelectItem value="ready">Ready</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}