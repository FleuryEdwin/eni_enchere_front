import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorPage from "./ErrorPage.jsx";
import {Login} from "./LoginPage/Login.jsx";
import './index.css'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {Register} from "./RegisterPage/Register.jsx";
import {Home} from "./Home/Home.jsx";
import {ProductDetails} from "./Component/Products/ProductDetails.jsx";
import {UserProfile} from "./UserProfile/UserProfile.jsx";

import ProductAdd from "./Component/Products/ProductAdd.jsx";

import {UserProfileEdit} from "./UserProfileEdit/UserProfileEdit.jsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "auth/login",
                element: <Login/>,
            },
            {
                path: "auth/register",
                element: <Register/>,
            },
            {
                path: "products/:id/detail",
                element: <ProductDetails/>
            },
            {
                path: "users/:id/profile",
                element: <UserProfile/>
            },
            {
                path: "/product/add",
                element: <ProductAdd/>
            }, {
                path: "users/:id/profile/edit",
                element: <UserProfileEdit/>
            }

        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
