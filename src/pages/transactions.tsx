import { Link } from "react-router";

const transactions = () => {
	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
				<Link
					to="/transacoes/nova"
					className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl
                flex items-center justify-center hover:bg-primary-600 transition-all"
				>
					Nova Transação
				</Link>
			</div>
		</div>
	);
};

export default transactions;
