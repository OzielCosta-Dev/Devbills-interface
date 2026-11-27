import {
	LayoutDashboard,
	List,
	LogOut,
	Menu,
	Plus,
	Wallet,
	X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const navLinks = [
	{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
	{ to: "/transacoes", label: "Transações", icon: List, end: true },
	{ to: "/transacoes/nova", label: "Nova Transação", icon: Plus, end: true },
];

const linkClasses = ({ isActive }: { isActive: boolean }): string =>
	`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
		isActive
			? "bg-primary-500/10 text-primary-500"
			: "text-gray-400 hover:text-gray-50 hover:bg-gray-800"
	}`;

const Header = () => {
	const { authState, signOut } = useAuth();
	const navigate = useNavigate();
	const [menuOpen, setMenuOpen] = useState(false);
	const user = authState.user;

	const handleSignOut = async (): Promise<void> => {
		try {
			await signOut();
			navigate("/");
		} catch {
			toast.error("Não foi possível sair. Tente novamente.");
		}
	};

	const displayName = user?.displayName ?? user?.email ?? "Usuário";
	const initials = displayName.charAt(0).toUpperCase();

	const avatar = user?.photoURL ? (
		<img
			src={user.photoURL}
			alt={displayName}
			className="w-8 h-8 rounded-full border border-gray-700"
			referrerPolicy="no-referrer"
		/>
	) : (
		<div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center font-semibold">
			{initials}
		</div>
	);

	return (
		<header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-20">
			<div className="container-app flex items-center justify-between h-16">
				<Link to="/dashboard" className="flex items-center gap-2">
					<Wallet className="w-6 h-6 text-primary-500" />
					<span className="text-xl font-bold">
						Dev<span className="text-primary-500">Bills</span>
					</span>
				</Link>

				<nav
					className="hidden md:flex items-center gap-1"
					aria-label="Principal"
				>
					{navLinks.map(({ to, label, icon: Icon, end }) => (
						<NavLink key={to} to={to} end={end} className={linkClasses}>
							<Icon className="w-4 h-4" />
							{label}
						</NavLink>
					))}
				</nav>

				<div className="hidden md:flex items-center gap-3">
					{avatar}
					<span className="text-sm text-gray-400 max-w-40 truncate">
						{displayName}
					</span>
					<button
						type="button"
						onClick={handleSignOut}
						className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-gray-800 transition-colors cursor-pointer"
						aria-label="Sair"
						title="Sair"
					>
						<LogOut className="w-5 h-5" />
					</button>
				</div>

				<button
					type="button"
					className="md:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800 cursor-pointer"
					onClick={() => setMenuOpen((open) => !open)}
					aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
					aria-expanded={menuOpen}
				>
					{menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
				</button>
			</div>

			{menuOpen && (
				<div className="md:hidden border-t border-gray-700">
					<nav
						className="container-app py-3 flex flex-col gap-1"
						aria-label="Menu móvel"
					>
						{navLinks.map(({ to, label, icon: Icon, end }) => (
							<NavLink
								key={to}
								to={to}
								end={end}
								className={linkClasses}
								onClick={() => setMenuOpen(false)}
							>
								<Icon className="w-4 h-4" />
								{label}
							</NavLink>
						))}
						<div className="flex items-center justify-between border-t border-gray-700 mt-2 pt-3">
							<div className="flex items-center gap-2 min-w-0">
								{avatar}
								<span className="text-sm text-gray-400 truncate">
									{displayName}
								</span>
							</div>
							<button
								type="button"
								onClick={handleSignOut}
								className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-gray-800 cursor-pointer"
							>
								<LogOut className="w-4 h-4" />
								Sair
							</button>
						</div>
					</nav>
				</div>
			)}
		</header>
	);
};

export default Header;
