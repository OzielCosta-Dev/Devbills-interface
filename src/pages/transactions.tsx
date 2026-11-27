import {
	AlertCircle,
	ArrowDown,
	ArrowUp,
	Pencil,
	Plus,
	Search,
	Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import MonthYearSelect from "../components/MonthYearSelect";
import Select from "../components/Select";
import Spinner from "../components/Spinner";
import { getApiErrorMessage } from "../services/api";
import { getCategories } from "../services/categoryService";
import {
	deleteTransactions,
	getTransactions,
} from "../services/transactionService";
import type { Category } from "../types/category";
import { type Transaction, TransactionType } from "../types/transactions";
import { formatCurrency, formatDate } from "../utils/formatters";

type TypeFilter = "all" | TransactionType;

const normalize = (text: string): string =>
	text
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase();

const newTransactionLinkClasses =
	"bg-primary-500 text-[#051626] font-semibold px-4 py-2.5 rounded-xl flex items-center justify-center hover:bg-primary-600 transition-all";

const Transactions = () => {
	const navigate = useNavigate();
	const currentDate = new Date();
	const [year, setYear] = useState<number>(currentDate.getFullYear());
	const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [reloadKey, setReloadKey] = useState<number>(0);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [deletingId, setDeletingId] = useState<string>("");
	const [searchText, setSearchText] = useState<string>("");
	const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
	const [categoryFilter, setCategoryFilter] = useState<string>("");

	// reloadKey força uma nova busca (botão "Tentar novamente")
	useEffect(() => {
		let active = true;

		getTransactions({ month, year })
			.then((data) => {
				if (!active) return;
				setTransactions(data);
				setError("");
			})
			.catch((err) => {
				if (!active) return;
				setError(
					getApiErrorMessage(
						err,
						"Não foi possível carregar as transações, tente novamente",
					),
				);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, [month, year, reloadKey]);

	const reload = useCallback((): void => {
		setLoading(true);
		setReloadKey((key) => key + 1);
	}, []);

	const handleMonthChange = (value: number): void => {
		setLoading(true);
		setMonth(value);
	};

	const handleYearChange = (value: number): void => {
		setLoading(true);
		setYear(value);
	};

	useEffect(() => {
		getCategories()
			.then(setCategories)
			.catch(() => setCategories([]));
	}, []);

	const filteredTransactions = useMemo(() => {
		const search = normalize(searchText.trim());
		return transactions.filter((transaction) => {
			if (typeFilter !== "all" && transaction.type !== typeFilter) return false;
			if (categoryFilter && transaction.categoryId !== categoryFilter)
				return false;
			if (search && !normalize(transaction.description).includes(search))
				return false;
			return true;
		});
	}, [transactions, searchText, typeFilter, categoryFilter]);

	const totals = useMemo(
		() =>
			filteredTransactions.reduce(
				(acc, t) => {
					if (t.type === TransactionType.INCOME) acc.income += t.amount;
					else acc.expense += t.amount;
					return acc;
				},
				{ income: 0, expense: 0 },
			),
		[filteredTransactions],
	);

	const categoryOptions = useMemo(
		() => [
			{ value: "", label: "Todas as categorias" },
			...categories
				.filter((c) => typeFilter === "all" || c.type === typeFilter)
				.map((c) => ({
					value: c.id,
					label:
						typeFilter === "all"
							? `${c.name} (${c.type === TransactionType.INCOME ? "Receita" : "Despesa"})`
							: c.name,
				})),
		],
		[categories, typeFilter],
	);

	const hasActiveFilters =
		searchText !== "" || typeFilter !== "all" || categoryFilter !== "";

	const clearFilters = (): void => {
		setSearchText("");
		setTypeFilter("all");
		setCategoryFilter("");
	};

	const handleDelete = async (id: string): Promise<void> => {
		try {
			setDeletingId(id);
			await deleteTransactions(id);
			toast.success("Transação deletada com sucesso");
			setTransactions((prev) => prev.filter((t) => t.id !== id));
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Falha ao deletar transação"));
		} finally {
			setDeletingId("");
		}
	};

	const confirmDelete = (transaction: Transaction): void => {
		if (
			window.confirm(
				`Tem certeza que deseja deletar a transação "${transaction.description}"?`,
			)
		) {
			handleDelete(transaction.id);
		}
	};

	const renderContent = () => {
		if (loading) return <Spinner label="Carregando transações..." />;

		if (error) {
			return (
				<div className="p-8 text-center">
					<AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
					<p>{error}</p>
					<Button onClick={reload} className="mx-auto mt-6">
						Tentar novamente
					</Button>
				</div>
			);
		}

		if (transactions.length === 0) {
			return (
				<div className="text-center py-12">
					<p className="text-gray-400 mb-4">
						Nenhuma transação encontrada neste mês.
					</p>
					<Link
						to="/transacoes/nova"
						className={`w-fit mx-auto mt-6 ${newTransactionLinkClasses}`}
					>
						<Plus className="w-4 h-4 mr-2" />
						Nova Transação
					</Link>
				</div>
			);
		}

		if (filteredTransactions.length === 0) {
			return (
				<div className="text-center py-12">
					<p className="text-gray-400 mb-4">
						Nenhuma transação corresponde aos filtros.
					</p>
					<Button variant="outline" onClick={clearFilters} className="mx-auto">
						Limpar filtros
					</Button>
				</div>
			);
		}

		return (
			<div className="overflow-x-auto">
				<table className="divide-y divide-gray-700 w-full">
					<thead>
						<tr>
							{["Descrição", "Data", "Categoria", "Valor"].map((title) => (
								<th
									key={title}
									scope="col"
									className="px-3 py-3 text-left text-xs font-medium text-gray-400 uppercase"
								>
									{title}
								</th>
							))}
							<th scope="col" className="px-3 py-3">
								<span className="sr-only">Ações</span>
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-700">
						{filteredTransactions.map((transaction) => {
							const isIncome = transaction.type === TransactionType.INCOME;
							return (
								<tr key={transaction.id} className="hover:bg-gray-800">
									<td className="px-3 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div className="mr-2">
												{isIncome ? (
													<ArrowUp className="w-4 h-4 text-primary-500" />
												) : (
													<ArrowDown className="w-4 h-4 text-red-500" />
												)}
											</div>
											<span className="text-sm font-medium text-gray-50">
												{transaction.description}
											</span>
										</div>
									</td>

									<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-400">
										{formatDate(transaction.date)}
									</td>

									<td className="px-3 py-4 whitespace-nowrap">
										<div className="flex items-center">
											<div
												className="w-2 h-2 rounded-full mr-2"
												style={{ backgroundColor: transaction.Category?.color }}
											/>
											<span className="text-sm text-gray-400">
												{transaction.Category?.name ?? "—"}
											</span>
										</div>
									</td>

									<td className="px-3 py-4 whitespace-nowrap">
										<span
											className={`text-sm font-medium ${isIncome ? "text-primary-500" : "text-red-500"}`}
										>
											{isIncome ? "+ " : "- "}
											{formatCurrency(transaction.amount)}
										</span>
									</td>

									<td className="px-3 py-4 whitespace-nowrap">
										<div className="flex items-center justify-end gap-1">
											<button
												type="button"
												onClick={() =>
													navigate(`/transacoes/${transaction.id}/editar`)
												}
												className="p-2 rounded-lg text-gray-400 hover:text-primary-500 hover:bg-gray-700 cursor-pointer"
												aria-label={`Editar ${transaction.description}`}
												title="Editar"
											>
												<Pencil className="w-4 h-4" />
											</button>
											<button
												type="button"
												onClick={() => confirmDelete(transaction)}
												className="p-2 rounded-lg text-red-500 hover:text-red-400 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed"
												disabled={deletingId === transaction.id}
												aria-label={`Deletar ${transaction.description}`}
												title="Deletar"
											>
												{deletingId === transaction.id ? (
													<span className="inline-block w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
												) : (
													<Trash2 className="w-4 h-4" />
												)}
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
				<h1 className="text-2xl font-bold">Transações</h1>
				<Link to="/transacoes/nova" className={newTransactionLinkClasses}>
					<Plus className="w-4 h-4 mr-2" />
					Nova Transação
				</Link>
			</div>

			<Card className="mb-6">
				<MonthYearSelect
					month={month}
					onMonthChange={handleMonthChange}
					onYearChange={handleYearChange}
					year={year}
				/>
			</Card>

			<Card className="mb-6">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-x-4">
					<Input
						label="Buscar"
						placeholder="Buscar transações..."
						icon={<Search className="w-4 h-4" />}
						onChange={(event) => setSearchText(event.target.value)}
						value={searchText}
					/>
					<Select
						label="Tipo"
						value={typeFilter}
						onChange={(event) => {
							setTypeFilter(event.target.value as TypeFilter);
							setCategoryFilter("");
						}}
						options={[
							{ value: "all", label: "Todos" },
							{ value: TransactionType.INCOME, label: "Receitas" },
							{ value: TransactionType.EXPENSE, label: "Despesas" },
						]}
					/>
					<Select
						label="Categoria"
						value={categoryFilter}
						onChange={(event) => setCategoryFilter(event.target.value)}
						options={categoryOptions}
					/>
				</div>
				<div className="flex flex-wrap items-center justify-between gap-3 text-sm">
					<div className="flex flex-wrap gap-4">
						<span className="text-gray-400">
							Receitas:{" "}
							<strong className="text-primary-500">
								{formatCurrency(totals.income)}
							</strong>
						</span>
						<span className="text-gray-400">
							Despesas:{" "}
							<strong className="text-red-500">
								{formatCurrency(totals.expense)}
							</strong>
						</span>
						<span className="text-gray-400">
							Saldo:{" "}
							<strong
								className={
									totals.income - totals.expense >= 0
										? "text-primary-500"
										: "text-red-500"
								}
							>
								{formatCurrency(totals.income - totals.expense)}
							</strong>
						</span>
					</div>
					{hasActiveFilters && (
						<button
							type="button"
							onClick={clearFilters}
							className="text-gray-400 hover:text-primary-500 underline cursor-pointer"
						>
							Limpar filtros
						</button>
					)}
				</div>
			</Card>

			<Card className="overflow-hidden">{renderContent()}</Card>
		</div>
	);
};

export default Transactions;
