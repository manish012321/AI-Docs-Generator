import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore.js";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuthStore();
    return isAuthenticated
        ? children
        : <Navigate to="/login" />;
}

export default ProtectedRoute;