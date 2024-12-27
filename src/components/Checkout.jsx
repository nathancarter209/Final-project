import React,{useState, useEffect}from'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CartState } from '../components/Shop';
import { food } from '../constants';
import './Styles/Checkout.css';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from '../config/Firebase';
import { useAuth } from '../config/Context'; 
function Checkout() {
    const cart = useRecoilValue(CartState);
    const setCartState = useSetRecoilState(CartState);
    const navigate = useNavigate();
    const db = getFirestore(app);
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        addressLine: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            if (user) { // Check if user is logged in using useAuth
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setFormData({
                            name: userData.displayName || user.displayName || '',
                            email: user.email,
                            phone: userData.phoneNumber || '',
                            addressLine: userData.address || '',
                        });
                    } else {
                        setFormData({
                            name: user.displayName || '',
                            email: user.email,
                            phone: '',
                            addressLine: '',
                        })
                    }
                } catch (err) {
                    console.error("Error fetching user data:", err);
                }
            }
        };
        fetchUserData();
    }, [user, db]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const calculateSubtotal = (id, quantity) => {
        return food[id].Price * (quantity || 1);
    };

    const calculateTotalPrice = () => {
        let total = 0;
        for (const [id, quantity] of Object.entries(cart)) {
            total += calculateSubtotal(id, quantity);
        }
        return total;
    };

    const handlePlaceOrder = async () => {
        if (Object.keys(cart).length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!formData.name || !formData.email || !formData.phone || !formData.addressLine) {
            alert("Please fill in all required address fields.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const ordersCollection = collection(db, "orders");
            const orderItems = Object.entries(cart).map(([id, quantity]) => ({
                foodId: id,
                name: food[id].Name,
                price: food[id].Price,
                quantity: quantity,
            }));

            const orderData = {
                items: orderItems,
                total: calculateTotalPrice(),
                timestamp: serverTimestamp(),
                address: formData, // Use formData directly here
            };

            const docRef = await addDoc(ordersCollection, orderData);
            const orderId = docRef.id;

            setCartState({});
            navigate(`/order-confirmation/${orderId}`);
        } catch (error) {
            console.error("Error adding document: ", error);
            setError('An error occurred: ' + error.message)
        } finally{
            setLoading(false)
        }
    };

    if (Object.keys(cart).length === 0) {
        return <div className="empty-cart"><h1>No Items in the cart</h1></div>;
    }

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-sections">
                <div className="checkout-section">
                    <h2>Shipping Address</h2>
                    <form>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required /> {/* Correct binding */}

                        <label htmlFor="phone">Phone Number:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required /> {/* Correct binding */}

                        <label htmlFor="addressLine">Address:</label>
                        <textarea id="addressLine" name="addressLine" value={formData.addressLine} onChange={handleChange} required /> {/* Correct binding */}
                    </form>
                </div>

                <div className="checkout-section">
                    <h2>Order Summary</h2>
                    <div className="checkout-items">
                        {Object.entries(cart).map(([id, quantity]) => (
                            <div key={id} className="checkout-item">
                                <img src={food[id].pic} alt={food[id].Name} width="80px" />
                                <div className="item-details">
                                    <h3>{food[id].Name}</h3>
                                    <p>Quantity: {quantity}</p>
                                    <p>Price: ₹{food[id].Price}</p>
                                    <p>Subtotal: ₹{calculateSubtotal(id, quantity)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="checkout-total">
                        <h2>Total: ₹{calculateTotalPrice()}</h2>
                    </div>
                </div>

                <div className="checkout-section">
                    <h2>Payment</h2>
                    <p>Payment integration will be added later</p>
                </div>
            </div>
            <button className="place-order-btn" onClick={handlePlaceOrder} disabled={loading}>Place Order</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Checkout;