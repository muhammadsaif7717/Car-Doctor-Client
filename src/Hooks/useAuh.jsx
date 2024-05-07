import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";


const useAuh = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuh;