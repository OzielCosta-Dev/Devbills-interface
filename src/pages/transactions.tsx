import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import Input from "../components/Input";
import MonthYearSelect from "../components/MonthYearSelect";

const transactions = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Transações</h1>
				<Link
					to="/transacoes/nova"
					className="bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl
                flex items-center justify-center hover:bg-primary-600 transition-all"
				>
					<Plus className="w-4 h-4 mr-2" />
					Nova Transação
				</Link>
			</div>

			<div className="mb-6">
				<MonthYearSelect
					month={5}
					onMonthChange={setMonth}
					onYearChange={setYear}
					year={2025}
				/>
			</div>

			<div className="mb-6">
				<Input
					error="erro ao pesquisar"
					placeholder="Buscar transações..."
					icon={<Search className="w-4 h-4" />}
					fullWidth
				/>
			</div>
		</div>
	);
};

export default transactions;
