
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Components/Home/Home";
import About from "../Components/About/About";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import axios from "axios";
import Bookings from "../Components/Bookings/Bookings";
import PrivateRoute from "./PrivateRoute";
import BookService from "../Components/BookService/BookService";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/about",
                element: <PrivateRoute><About></About></PrivateRoute>,
            },
            {
                path: "/book-service/:id",
                element: <PrivateRoute><BookService></BookService></PrivateRoute>,
                loader: ({ params }) => axios.get(`http://localhost:5000/services/${params.id}`)
            },
            {
                path: "/bookings",
                element: <PrivateRoute><Bookings></Bookings></PrivateRoute>,
            },
            {
                path: "/sign-in",
                element: <SignIn></SignIn>,
            },
            {
                path: "/sign-up",
                element: <SignUp></SignUp>,
            },
        ]
    },
]);


export default router;