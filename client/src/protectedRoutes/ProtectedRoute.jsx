// ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import PropType from 'prop-types'

const ProtectedRoute = ({ requiredRole }) => {
    const { Loading, isAutenticated, user } = useAuth();

    if (Loading) return <h1>Loading...</h1>;

    if (!isAutenticated) return <Navigate to="/login" replace />;
    if (requiredRole && user.type !== requiredRole) return <Navigate to="/unauthorized" replace />;

    return <Outlet />;
}

ProtectedRoute.propTypes = {
    requiredRole: PropType.string.isRequired
}

export default ProtectedRoute;
