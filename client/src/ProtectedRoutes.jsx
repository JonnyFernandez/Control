import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from './context/AuthContext';

const ProtectedRoute = () => {
    const { loading, isAuthenticated, user } = useAuth();

    if (loading) return <h1>Cargando...</h1>;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    // if (!isAuthenticated || (user && user.type !== "admin")) {
    //     return <Navigate to="/login" replace />;
    // }

    return <Outlet />;
};

export default ProtectedRoute;

