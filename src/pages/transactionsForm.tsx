import { useEffect, useId, useState } from "react";
import Card from "../components/Card";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import { TransactionType } from "../types/transactions";
import TransactionTypeSelector from "../components/TransTypesSelector";
import Input from "../components/Input";
import { Calendar, DollarSign } from "lucide-react";
import Select from "../components/Select";

interface FormData {
	description: string;
	amount: number;
	date: string;
	categoryId: string;
	type: TransactionType;
}

const initialFormData = {
	description: "",
	amount: 0,
	date: "",
	categoryId: "",
	type: TransactionType.EXPENSE,
}

const transactionsForm = () => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [formData, setFormData] = useState<FormData>(initialFormData)
	const formId = useId();

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			const response = await getCategories();
			setCategories(response);
		};

		fetchCategories();
	}, []);


	const handleTransactionType = (itemType: TransactionType):void => {
		setFormData( (prev) => ({...prev, type: itemType}))
	}

	const handleChange = () => {

	}

	const handleSubmit = () => {};

	return (
		<div>
			<div>
				<h1>Nova Transação</h1>

				<Card>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label htmlFor={formId}>Tipo de despesa</label>
							<TransactionTypeSelector 
							id={formId}
							value={formData.Type}
							onChange={handleTransactionType}/>
						</div>

						<Input 
						   label="Descrição"
						   name="description"
                           value={formData.description}
						   onChange={handleChange}
						   placeholder="Ex: Supermercado, Salário, etc..."
						   required
						/>

						<Input 
						   label="Valor"
						   name="amount"
						   type="number"
						   step="0.01"
						   min="0.01"
                           value={formData.amount}
						   onChange={handleChange}
						   placeholder="R$ 0,00"
						   icon={<DollarSign className="w-4 h-4"/>}
						   required
						/>

						<Input 
						   label="Date"
						   name="date"
						   type="date"
                           value={formData.date}
						   onChange={handleChange}
						   icon={<Calendar className="w-4 h-4"/>}
						   required
						/>

						<Select 
						   label="Date"
						   name="date"
						   type="date"
                           value={formData.date}
						   onChange={handleChange}
						   icon={<Calendar className="w-4 h-4"/>}
						   required
						/>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default transactionsForm;
