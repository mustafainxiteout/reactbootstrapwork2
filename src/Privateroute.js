import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute({ isAdmin }) {
    const auth = localStorage.getItem("access_token"); // determine if authorized, from context or however you're doing it
    const isAuthorized = auth && (isAdmin ? isAdmin : true); // determine if authorized based on isAdmin prop

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return isAuthorized ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute