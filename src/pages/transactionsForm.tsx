import { ArrowLeft, Calendar, DollarSign, Save, Tag } from "lucide-react";
import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";
import Select from "../components/Select";
import Spinner from "../components/Spinner";
import TransactionTypeSelector from "../components/TransTypesSelector";
import { getApiErrorMessage } from "../services/api";
import { getCategories } from "../services/categoryService";
import {
	createTransaction,
	getTransactionById,
	updateTransaction,
} from "../services/transactionService";
import type { Category } from "../types/category";
import { TransactionType } from "../types/transactions";
import { todayInputDate, toInputDate } from "../utils/formatters";

interface FormData {
	description: string;
	amount: string;
	date: string;
	categoryId: string;
	type: TransactionType;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const createInitialFormData = (): FormData => ({
	description: "",
	amount: "",
	date: todayInputDate(),
	categoryId: "",
	type: TransactionType.EXPENSE,
});

const validate = (data: FormData): FormErrors => {
	const errors: FormErrors = {};
	const amount = Number(data.amount);

	if (!data.description.trim()) {
		errors.description = "Informe uma descrição";
	} else if (data.description.trim().length > 120) {
		errors.description = "A descrição deve ter no máximo 120 caracteres";
	}

	if (!data.amount || Number.isNaN(amount) || amount <= 0) {
		errors.amount = "Informe um valor maior que zero";
	}

	if (!data.date) {
		errors.date = "Informe a data";
	}

	if (!data.categoryId) {
		errors.categoryId = "Selecione uma categoria";
	}

	return errors;
};

const TransactionForm = () => {
	const { id } = useParams<{ id: string }>();
	const isEditing = Boolean(id);
	const navigate = useNavigate();

	const [categories, setCategories] = useState<Category[]>([]);
	const [formData, setFormData] = useState<FormData>(createInitialFormData);
	const [errors, setErrors] = useState<FormErrors>({});
	const [loading, setLoading] = useState<boolean>(true);
	const [submitting, setSubmitting] = useState<boolean>(false);

	useEffect(() => {
		let active = true;

		const loadData = async (): Promise<void> => {
			setLoading(true);
			try {
				const [categoriesResponse, transaction] = await Promise.all([
					getCategories(),
					id ? getTransactionById(id) : Promise.resolve(null),
				]);

				if (!active) return;
				setCategories(categoriesResponse);

				if (transaction) {
					setFormData({
						description: transaction.description,
						amount: String(transaction.amount),
						date: toInputDate(transaction.date),
						categoryId: transaction.categoryId,
						type: transaction.type,
					});
				}
			} catch (err) {
				if (!active) return;
				toast.error(
					getApiErrorMessage(
						err,
						id
							? "Não foi possível carregar a transação"
							: "Não foi possível carregar as categorias",
					),
				);
				if (id) navigate("/transacoes", { replace: true });
			} finally {
				if (active) setLoading(false);
			}
		};

		loadData();

		return () => {
			active = false;
		};
	}, [id, navigate]);

	const filteredCategories = categories.filter(
		(category) => category.type === formData.type,
	);

	const handleTransactionType = (itemType: TransactionType): void => {
		// Ao trocar o tipo, a categoria anterior deixa de ser válida
		setFormData((prev) =>
			prev.type === itemType
				? prev
				: { ...prev, type: itemType, categoryId: "" },
		);
		setErrors((prev) => ({ ...prev, categoryId: undefined }));
	};

	const handleChange = (
		event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	): void => {
		const { name, value } = event.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const handleSubmit = async (
		event: FormEvent<HTMLFormElement>,
	): Promise<void> => {
		event.preventDefault();

		const validationErrors = validate(formData);
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			return;
		}

		const payload = {
			description: formData.description.trim(),
			amount: Number(formData.amount),
			date: formData.date,
			categoryId: formData.categoryId,
			type: formData.type,
		};

		setSubmitting(true);
		try {
			if (id) {
				await updateTransaction(id, payload);
				toast.success("Transação atualizada com sucesso!");
			} else {
				await createTransaction(payload);
				toast.success("Transação criada com sucesso!");
			}
			navigate("/transacoes");
		} catch (err) {
			toast.error(getApiErrorMessage(err, "Falha ao salvar a transação"));
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container-app py-6">
			<div className="max-w-2xl mx-auto">
				<div className="flex items-center gap-3 mb-6">
					<Link
						to="/transacoes"
						className="p-2 rounded-lg text-gray-400 hover:text-gray-50 hover:bg-gray-800 transition-colors"
						aria-label="Voltar para transações"
					>
						<ArrowLeft className="w-5 h-5" />
					</Link>
					<h1 className="text-2xl font-bold">
						{isEditing ? "Editar Transação" : "Nova Transação"}
					</h1>
				</div>

				<Card className="cursor-default">
					{loading ? (
						<Spinner label="Carregando..." />
					) : (
						<form onSubmit={handleSubmit} noValidate>
							<div className="mb-4">
								<span className="block text-sm font-medium text-gray-50 mb-2">
									Tipo de transação
								</span>
								<TransactionTypeSelector
									value={formData.type}
									onChange={handleTransactionType}
								/>
							</div>

							<Input
								label="Descrição"
								name="description"
								value={formData.description}
								onChange={handleChange}
								placeholder="Ex: Supermercado, Salário, etc..."
								maxLength={120}
								error={errors.description}
								required
							/>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
								<Input
									label="Valor"
									name="amount"
									type="number"
									inputMode="decimal"
									step="0.01"
									min="0.01"
									value={formData.amount}
									onChange={handleChange}
									placeholder="0,00"
									icon={<DollarSign className="w-4 h-4" />}
									error={errors.amount}
									required
								/>

								<Input
									label="Data"
									name="date"
									type="date"
									value={formData.date}
									onChange={handleChange}
									icon={<Calendar className="w-4 h-4" />}
									error={errors.date}
									required
								/>
							</div>

							<Select
								label="Categoria"
								name="categoryId"
								value={formData.categoryId}
								onChange={handleChange}
								icon={<Tag className="w-4 h-4" />}
								error={errors.categoryId}
								required
								options={[
									{ value: "", label: "Selecione uma categoria" },
									...filteredCategories.map((category) => ({
										value: category.id,
										label: category.name,
									})),
								]}
							/>

							<div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-6">
								<Button
									variant="outline"
									onClick={() => navigate("/transacoes")}
									disabled={submitting}
								>
									Cancelar
								</Button>
								<Button
									type="submit"
									isLoading={submitting}
									variant={
										formData.type === TransactionType.EXPENSE
											? "danger"
											: "success"
									}
								>
									{!submitting && <Save className="w-4 h-4" />}
									{isEditing ? "Salvar alterações" : "Salvar transação"}
								</Button>
							</div>
						</form>
					)}
				</Card>
			</div>
		</div>
	);
};

export default TransactionForm;
