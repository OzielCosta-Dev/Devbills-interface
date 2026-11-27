import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../context/AuthContext";
import AppLayout from "../layout/AppLayout";
import Spinner from "../components/Spinner";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Transactions from "../pages/transactions";
import TransactionForm from "../pages/transactionsForm";
import PrivateRoutes from "./PrivateRoutes";

// O dashboard usa recharts (pesado), então é carregado sob demanda
const Dashboard = lazy(() => import("../pages/dashboard"));

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />

					<Route element={<PrivateRoutes />}>
						<Route element={<AppLayout />}>
							<Route
								path="/dashboard"
								element={
									<Suspense fallback={<Spinner label="Carregando..." />}>
										<Dashboard />
									</Suspense>
								}
							/>
							<Route path="/transacoes" element={<Transactions />} />
							<Route path="/transacoes/nova" element={<TransactionForm />} />
							<Route
								path="/transacoes/:id/editar"
								element={<TransactionForm />}
							/>
						</Route>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
				<ToastContainer
					position="top-right"
					autoClose={3000}
					newestOnTop
					closeOnClick
					pauseOnHover
					theme="dark"
				/>
			</AuthProvider>
		</BrowserRouter>
	);
};

export default AppRoutes;
