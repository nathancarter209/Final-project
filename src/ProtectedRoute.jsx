import { useAuth } from '../src/config/Context';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const { user, loading, isAdmin } = useAuth();
    const location = useLocation();

    useEffect(() => {
        console.log("--- Protected Route Render ---");
        console.log("User:", user);
        console.log("Loading:", loading);
        console.log("isAdmin:", isAdmin);
        console.log("--- End of Protected Route Render ---");
    }, [user, loading, isAdmin]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Crucial change: Check if isAdmin is NOT undefined before checking its value
    if (isAdmin === undefined || !isAdmin) { 
        if (isAdmin === undefined) {
            return <div>Authorizing...</div>; // Render a different message while isAdmin is being determined
        }
        return <Navigate to="/forbidden" replace />;
    }

    return children;
};

export default ProtectedRoute;