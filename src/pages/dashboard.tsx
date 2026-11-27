import { ArrowDown, ArrowUp, Calendar, TrendingUp, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	PieChart,
	type PieLabelRenderProps,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import Card from "../components/Card";
import MonthYearSelect from "../components/MonthYearSelect";
import Spinner from "../components/Spinner";
import {
	getTransactionSummary,
	getTransactionsMontly,
} from "../services/transactionService";
import type { MonthlyItem, TransactionSummary } from "../types/transactions";
import { formatCurrency } from "../utils/formatters";

const initialSummary: TransactionSummary = {
	balance: 0,
	totalExpenses: 0,
	totalIncomes: 0,
	expensesByCategory: [],
};

const tooltipStyle = {
	contentStyle: {
		backgroundColor: "#141F2B",
		border: "1px solid #1A2B3E",
		borderRadius: 8,
	},
	itemStyle: { color: "#FFFFFF" },
	labelStyle: { color: "#94A3B8", textTransform: "capitalize" as const },
};

const currencyTooltipFormatter = (value: unknown): string =>
	typeof value === "number" ? formatCurrency(value) : String(value ?? "");

const Dashboard = () => {
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [summary, setSummary] = useState<TransactionSummary>(initialSummary);
	const [monthlyItemsData, setMonthlyItemsData] = useState<MonthlyItem[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		let active = true;

		const loadData = async (): Promise<void> => {
			setLoading(true);
			const [summaryResult, historyResult] = await Promise.allSettled([
				getTransactionSummary(month, year),
				getTransactionsMontly(month, year),
			]);

			if (!active) return;

			if (summaryResult.status === "fulfilled") {
				setSummary(summaryResult.value);
			} else {
				console.error("Erro ao carregar resumo", summaryResult.reason);
				setSummary(initialSummary);
			}

			if (historyResult.status === "fulfilled") {
				setMonthlyItemsData(historyResult.value.history ?? []);
			} else {
				console.error("Erro ao carregar histórico", historyResult.reason);
				setMonthlyItemsData([]);
			}

			setLoading(false);
		};

		loadData();

		return () => {
			active = false;
		};
	}, [month, year]);

	const renderPieChartLabel = ({
		name,
		percent,
	}: PieLabelRenderProps): string =>
		`${name}: ${(Number(percent ?? 0) * 100).toFixed(1)}%`;

	const hasHistory = monthlyItemsData.some(
		(item) => item.income > 0 || item.expenses > 0,
	);

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
				<h1 className="text-2xl font-bold">Dashboard</h1>
				<MonthYearSelect
					month={month}
					year={year}
					onMonthChange={setMonth}
					onYearChange={setYear}
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<Card
					icon={<Wallet size={20} className="text-primary-500" />}
					title="Saldo"
					hover
					glowEffect={summary.balance > 0}
				>
					<p
						className={`text-2xl font-semibold mt-2 ${summary.balance >= 0 ? "text-primary-500" : "text-red-500"}`}
					>
						{formatCurrency(summary.balance)}
					</p>
				</Card>

				<Card
					icon={<ArrowUp size={20} className="text-primary-500" />}
					title="Receitas"
					hover
				>
					<p className="text-2xl font-semibold mt-2 text-primary-500">
						{formatCurrency(summary.totalIncomes)}
					</p>
				</Card>

				<Card
					icon={<ArrowDown size={20} className="text-red-500" />}
					title="Despesas"
					hover
				>
					<p className="text-2xl font-semibold mt-2 text-red-500">
						{formatCurrency(summary.totalExpenses)}
					</p>
				</Card>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 mt-6">
				<Card
					icon={<TrendingUp size={20} className="text-primary-500" />}
					title="Despesas por Categoria"
					className="min-h-80"
				>
					{loading ? (
						<Spinner />
					) : summary.expensesByCategory.length > 0 ? (
						<div className="h-72 mt-4">
							<ResponsiveContainer>
								<PieChart>
									<Pie
										data={summary.expensesByCategory}
										cx="50%"
										cy="50%"
										outerRadius={80}
										dataKey="amount"
										nameKey="categoryName"
										label={renderPieChartLabel}
									>
										{summary.expensesByCategory.map((entry) => (
											<Cell key={entry.categoryId} fill={entry.categoryColor} />
										))}
									</Pie>
									<Tooltip
										formatter={currencyTooltipFormatter}
										{...tooltipStyle}
									/>
									<Legend />
								</PieChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="flex items-center justify-center h-64 text-gray-400">
							Nenhuma despesa registrada neste período
						</div>
					)}
				</Card>

				<Card
					icon={<Calendar size={20} className="text-primary-500" />}
					title="Histórico Mensal"
					className="min-h-80"
				>
					<div className="h-72 mt-4">
						{loading ? (
							<Spinner />
						) : hasHistory ? (
							<ResponsiveContainer>
								<BarChart
									data={monthlyItemsData}
									margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
								>
									<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
									<XAxis
										dataKey="name"
										stroke="#9CA3AF"
										tick={{ style: { textTransform: "capitalize" } }}
									/>
									<YAxis
										stroke="#9CA3AF"
										width="auto"
										tickFormatter={formatCurrency}
										tick={{ style: { fontSize: 12 } }}
									/>
									<Tooltip
										formatter={currencyTooltipFormatter}
										cursor={{ fill: "rgba(255,255,255,0.05)" }}
										{...tooltipStyle}
									/>
									<Legend />
									<Bar
										dataKey="income"
										name="Receitas"
										fill="#37E359"
										radius={[10, 10, 0, 0]}
									/>
									<Bar
										dataKey="expenses"
										name="Despesas"
										fill="#FF6384"
										radius={[10, 10, 0, 0]}
									/>
								</BarChart>
							</ResponsiveContainer>
						) : (
							<div className="flex items-center justify-center h-64 text-gray-400">
								Nenhuma transação registrada neste período
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Dashboard;
