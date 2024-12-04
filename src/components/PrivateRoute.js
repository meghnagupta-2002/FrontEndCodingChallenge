import React from 'react';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = !!localStorage.getItem('token');
    return isLoggedIn ? children : <Route to="/" />;
};

export default PrivateRoute;
