import { Navigate, Outlet, useLocation } from "react-router";
import Spinner from "../components/Spinner";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
	const { authState } = useAuth();
	const location = useLocation();

	if (authState.loading && !authState.user) {
		return <Spinner fullScreen label="Verificando sessão..." />;
	}

	if (!authState.user) {
		return <Navigate to="/login" replace state={{ from: location.pathname }} />;
	}

	return <Outlet />;
};

export default PrivateRoutes;
