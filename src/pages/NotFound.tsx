import { Home } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => (
	<div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-950 px-4 text-center">
		<p className="text-6xl font-extrabold text-primary-500">404</p>
		<h1 className="text-2xl font-bold">Página não encontrada</h1>
		<p className="text-gray-400 max-w-md">
			A página que você procura não existe ou foi movida.
		</p>
		<Link
			to="/"
			className="mt-2 inline-flex items-center gap-2 bg-primary-500 text-[#051626] font-semibold px-5 py-2.5 rounded-xl hover:bg-primary-600 transition-all"
		>
			<Home className="w-4 h-4" />
			Voltar para o início
		</Link>
	</div>
);

export default NotFound;
