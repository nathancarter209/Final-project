import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, updateProfile } from 'firebase/auth'; // Import updateProfile
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Correct imports for Firestore
import { getStorage } from 'firebase/storage';
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDpzOtIdIKUsysQJE5eEynBJe20Sv2qFjU",
    authDomain: "kahanikhaneki-c7937.firebaseapp.com",
    databaseURL: "https://kahanikhaneki-c7937-default-rtdb.firebaseio.com",
    projectId: "kahanikhaneki-c7937",
    storageBucket: "kahanikhaneki-c7937.firebasestorage.app",
    messagingSenderId: "511318078095",
    appId: "1:511318078095:web:24783d318784f7752f76fa",
    measurementId: "G-6050EKCH8S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the app instance (Crucial!)
export { app };

// Export auth and provider
export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();

// Export db (Firestore) and storage
export const db = getFirestore(app);
export const storage = getStorage(app);
export const rtdb = getDatabase(app);

export const createUserDocument = async (user, userFirstName, userLastName) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    try {
        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {
            const { email } = user;

            await setDoc(userRef, { // Use setDoc to set the document directly
                email,
                firstName: userFirstName,
                lastName: userLastName,
                createdAt: new Date(), // Add timestamp for consistency
            });

            if (auth.currentUser) {
                try {
                    await updateProfile(auth.currentUser, {
                        displayName: userFirstName,
                    });
                } catch (profileUpdateError) {
                    console.error("Error updating profile:", profileUpdateError);
                }
            }

            console.log('User document created successfully');
        }
    } catch (error) {
        console.error('Error creating/checking user document:', error);
    }
};