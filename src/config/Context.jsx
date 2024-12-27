import React, { createContext, useContext, useState, useEffect } from "react";
import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth, db, googleprovider } from "./Firebase"; // Import db
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(null); // Important: Initialize as null
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                try {
                    const docRef = doc(db, "users", currentUser.uid);
                    const docSnap = await getDoc(docRef);
                    setIsAdmin(docSnap.exists() ? docSnap.data().isAdmin || false : false);
                    console.log("isAdmin value from firebase", docSnap.data().isAdmin)
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setIsAdmin(false);
                }
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const signUp = async (email, password, isAdmin, displayName, phoneNumber, address) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userData = {
                email,
                isAdmin: isAdmin || false,
                displayName,
                phoneNumber,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
            };

            if (address) {
                userData.address = address;
            }

            await setDoc(doc(db, "users", user.uid), userData);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const signIn = async (email, password) => {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            throw error;
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleprovider);
            setPopup(true);
            setTimeout(() => setPopup(false), 3000);
        } catch (error) {
            throw error;
        }
    };
    const signOutUser = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    const value = { user, loading, isAdmin, popup, signUp, signIn, signInWithGoogle, signOutUser };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};