import { CreditCard, List, TrendingUp, Wallet } from "lucide-react";
import type { JSX } from "react";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

interface Feature {
	icon: JSX.Element;
	title: string;
	description: string;
}

const features: ReadonlyArray<Feature> = [
	{
		icon: <Wallet className="w-8 h-8 text-primary-500" />,
		title: "Controle Financeiro",
		description:
			"Monitore suas despesas e receitas em um só lugar, com uma interface intuitiva e fácil de usar.",
	},
	{
		icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
		title: "Relatórios",
		description:
			"Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.",
	},
	{
		icon: <List className="w-8 h-8 text-primary-500" />,
		title: "Categorias",
		description: "Organize suas transações em categorias para melhor análise.",
	},
	{
		icon: <CreditCard className="w-8 h-8 text-primary-500" />,
		title: "Transações Ilimitadas",
		description:
			"Adicione quantas transações quiser e mantenha um histórico completo de suas finanças.",
	},
];

const Home = () => {
	const navigate = useNavigate();
	const { authState } = useAuth();
	const isLogged = Boolean(authState.user);

	const handleStart = (): void => {
		navigate(isLogged ? "/dashboard" : "/login");
	};

	return (
		<div className="bg-gray-950 min-h-screen flex flex-col">
			<header className="container-app flex items-center justify-between h-16">
				<div className="flex items-center gap-2">
					<Wallet className="w-6 h-6 text-primary-500" />
					<span className="text-xl font-bold">
						Dev<span className="text-primary-500">Bills</span>
					</span>
				</div>
				<Button variant="outline" onClick={handleStart}>
					{isLogged ? "Ir para o Dashboard" : "Entrar"}
				</Button>
			</header>

			<div className="container-app flex-grow">
				<section className="py-12 md:py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div>
							<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
								Gerencie suas finanças com o{" "}
								<span className="text-primary-500">DevBills</span>
							</h1>
							<p className="text-lg text-gray-400 mb-8">
								Uma plataforma simples e eficiente para controlar suas despesas
								e receitas. Organize suas finanças pessoais ou do seu negócio
								com facilidade.
							</p>
							<Button className="px-6 py-3" onClick={handleStart}>
								{isLogged ? "Acessar minha conta" : "Começar Agora"}
							</Button>
						</div>
						<div className="hidden md:flex justify-center">
							<div className="glow rounded-2xl border border-gray-700 bg-gray-900 p-8 w-full max-w-sm space-y-4">
								<p className="text-sm text-gray-400">Saldo do mês</p>
								<p className="text-3xl font-bold text-primary-500">
									R$ 3.250,00
								</p>
								<div className="flex justify-between text-sm">
									<span className="text-primary-500">↑ R$ 5.000,00</span>
									<span className="text-red-500">↓ R$ 1.750,00</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="py-12 md:py-20 px-4 bg-gray-900 rounded-xl">
					<div className="text-center mb-12">
						<h2 className="text-3xl font-bold text-white mb-4">
							Recursos do DevBills
						</h2>
						<p className="text-lg text-gray-400 max-w-2xl mx-auto">
							Nossa plataforma oferece tudo o que você precisa para manter suas
							finanças organizadas.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{features.map((feature) => (
							<div
								key={feature.title}
								className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow"
							>
								<div className="mb-4 bg-primary-500/10 p-3 rounded-full inline-block">
									{feature.icon}
								</div>
								<h3 className="text-xl font-semibold text-white mb-2">
									{feature.title}
								</h3>
								<p className="text-gray-400">{feature.description}</p>
							</div>
						))}
					</div>
				</section>

				<section className="py-12 md:py-20">
					<div className="bg-gray-900 p-8 md:p-12 rounded-xl text-center border border-gray-700">
						<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
							Pronto para organizar suas finanças?
						</h2>
						<p className="text-gray-400 max-w-2xl mx-auto mb-8">
							Comece a usar o DevBills hoje mesmo e tenha o controle total sobre
							o seu dinheiro. É gratuito e fácil de usar!
						</p>
						<Button className="mx-auto px-6 py-3" onClick={handleStart}>
							{isLogged ? "Ir para o Dashboard" : "Criar Conta Gratuita"}
						</Button>
					</div>
				</section>
			</div>

			<Footer />
		</div>
	);
};

export default Home;
