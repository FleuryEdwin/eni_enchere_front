import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorPage from "./ErrorPage";
import { Login } from "./LoginPage/Login";
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import { Register } from "./RegisterPage/Register";
import { Home } from "./Home/Home";
import { ProductDetails } from "./Component/Products/ProductDetails";
import { UserProfile } from "./UserProfile/UserProfile";
import ProductAdd from "./Component/Products/ProductAdd";
import { UserProfileEdit } from "./UserProfileEdit/UserProfileEdit";
import PrivateRoute from "./Security/PrivatedRoutes.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "auth/login",
                element: <Login />,
            },
            {
                path: "auth/register",
                element: <Register />,
            },
            {
                path: "products/:id/detail",
                element: <PrivateRoute component={ProductDetails} />
            },
            {
                path: "users/:id/profile",
                element: <PrivateRoute component={UserProfile} />
            },
            {
                path: "/product/add",
                element: <PrivateRoute component={ProductAdd} />
            },
            {
                path: "users/:id/profile/edit",
                element: <PrivateRoute component={UserProfileEdit} />
            }
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
