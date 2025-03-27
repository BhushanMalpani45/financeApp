import React, { useEffect, useState } from 'react'
import { checkAuth } from '../services/authentication';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(null);
    
    useEffect(()=>{
        const verifyUser = async()=>{
            try {
                await checkAuth();
                setIsAuthorized(true);
            } catch (error) {
                setIsAuthorized(false);
            }
        }
        verifyUser();
    }, []);
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;