import {useContext, useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "../Context/AuthContext.jsx";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { getUser,user} = useContext(AuthContext);


    console.log("secu ",user)
    if (user === null) {
        return <Navigate to="/auth/login" replace />;
    }

    return (
        <div>
            {user ? (
                <Component {...rest} />
            ) : (
                <Navigate to="/auth/login" replace />
            )}
        </div>
    );
};

export default PrivateRoute;
