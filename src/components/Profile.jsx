import React, { useState, useEffect } from 'react';
import { useAuth } from '../config/Context';
import { doc, getDoc, updateDoc, getFirestore } from 'firebase/firestore';
import { app } from '../config/Firebase';
import './styles/Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({
        displayName: '',
        phoneNumber: '',
        address: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                setLoading(true);
                setError(null);
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        setProfileData(docSnap.data());
                    } else {
                        await updateDoc(userDocRef, {
                            displayName: user.displayName || "",
                            email: user.email,
                            phoneNumber: "",
                            address: "",
                        });
                        const newSnap = await getDoc(userDocRef);
                        setProfileData(newSnap.data());
                    }
                } catch (err) {
                    console.error("Error fetching profile:", err);
                    setError("Failed to fetch profile.");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [user, db]);

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        setError(null);
        try {
            const userDocRef = doc(db, 'users', user.uid);
            await updateDoc(userDocRef, profileData);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return <div className="no-user">Please log in to view your profile.</div>;
    }

    if (loading) {
        return <div className="loading">Loading profile...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {isEditing ? (
                <div className="profile-edit-form">
                    <input type="text" name="displayName" placeholder="Display Name" value={profileData.displayName} onChange={handleChange} />
                    <input type="tel" name="phoneNumber" placeholder="Phone Number" value={profileData.phoneNumber} onChange={handleChange} />
                    <textarea name="address" placeholder="Address" value={profileData.address} onChange={handleChange}></textarea>
                    <button onClick={handleSave} disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="profile-details">
                    <p><strong>Name:</strong> {profileData.displayName || "N/A"}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {profileData.phoneNumber && <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>}
                    {profileData.address && <p><strong>Address:</strong> {profileData.address}</p>}
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;