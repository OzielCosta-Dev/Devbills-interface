import { AlertCircle, Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Card from "../components/Card";
import Input from "../components/Input";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactions } from "../services/transactionService";
import type { Transaction } from "../types/transactions";

useEffect(() => {
	const fetchTransactions = async (): Promise<void> => {
		try {
			setLoading(true);
			setError("");
			const data = await getTransactions({ month, year });
			setTransactions(data);
		} catch (err) {
			selectError("Não foi possível carregar as transações, tente novamente");
		} finally {
			setLoading(false);
		}
	};

	fetchTransactions();
}, [Month, year]);

const transactions = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [transactions, setTransactions] = useState<Transaction[]>([]);

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

			<Card className="mb-6">
				<MonthYearSelect
					month={5}
					onMonthChange={setMonth}
					onYearChange={setYear}
					year={2025}
				/>
			</Card>

			<Card className="mb-6">
				<Input
					error="erro ao pesquisar"
					placeholder="Buscar transações..."
					icon={<Search className="w-4 h-4" />}
					fullWidth
				/>
			</Card>

			<Card className="overflow-hidden">
				{loading ? (
					<div>Carregando...</div>
				) : error ? (
					<div className="p-8 text-center">
						<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
						<p>{error}</p>
					</div>
				) : transactions.length === 0 ? (
					<div className="text-center py-12">
						<p className="text-gray-500 mb-4">Nenhuma Transação encontrada.</p>
					</div>
				) : (
					<div>Olá</div>
				)}
			</Card>
		</div>
	);
};

export default transactions;
