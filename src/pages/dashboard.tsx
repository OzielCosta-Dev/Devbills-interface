import { useEffect, useState } from "react";
import MonthYearSelect from "../components/MonthYearSelect";
import { getTransactions } from "../services/transactionService";
import type { TransactionSummary } from "../types/transactions";
import Card from "../components/Card";

const initialSumary: TransactionSummary = {
	balance: 0,
	totalExpenses: 0,
	totalIncomes: 0,
	expensesByCategory: [],
};

const Dashboard = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState(currentDate.getMonth() + 1);
	const [summary, setSummary] = useState<TransactionSummary>(initialSumary);

	useEffect(() => {
		async function loadTransactionsSummary() {
			const response = await getTransactionsSummary(month, year);

			setSummary(response);
		}

		loadTransactionsSummary();
	}, [month, year]);

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</div>
			<Card />
		</div>
	);
};

export default Dashboard;
