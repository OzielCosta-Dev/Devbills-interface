import { Wallet } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { signWithGoogle, authState } = useAuth();

	const redirectTo =
		(location.state as { from?: string } | null)?.from ?? "/dashboard";

	useEffect(() => {
		if (authState.user && !authState.loading) {
			navigate(redirectTo, { replace: true });
		}
	}, [authState.user, authState.loading, navigate, redirectTo]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<header className="text-center">
					<Link to="/" className="inline-flex items-center gap-2">
						<Wallet className="w-8 h-8 text-primary-500" />
						<h1 className="text-3xl font-extrabold">
							Dev<span className="text-primary-500">Bills</span>
						</h1>
					</Link>
					<p className="mt-2 text-sm text-gray-400">
						Gerencie suas finanças de forma simples e eficiente
					</p>
				</header>

				<main className="bg-gray-900 border border-gray-700 py-8 px-4 shadow-md rounded-xl sm:px-10 space-y-6">
					<section>
						<h2 className="text-lg font-medium">Faça login para continuar</h2>
						<p className="mt-1 text-sm text-gray-400">
							Acesse sua conta para começar a gerenciar as suas finanças
						</p>
					</section>

					<GoogleLoginButton
						onClick={signWithGoogle}
						isLoading={authState.loading}
					/>

					{authState.error && (
						<div
							className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-center text-sm text-red-500"
							role="alert"
						>
							{authState.error}
						</div>
					)}

					<footer>
						<p className="text-xs text-gray-400 text-center">
							Ao fazer login, você concorda com nossos termos de uso e política
							de privacidade.
						</p>
					</footer>
				</main>
			</div>
		</div>
	);
};

export default Login;
