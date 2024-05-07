import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span>Loading....</span>;
    }

    if (user?.email) {
        return children;
    }

    return (
        <Navigate
            to="/sign-in"
            state={{ from: location }}
            replace
        />
    );
};

export default PrivateRoute;
