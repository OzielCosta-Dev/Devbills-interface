import { useEffect, useId, useState } from "react";
import Card from "../components/Card";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import { TransactionType } from "../types/transactions";
import TransactionTypeSelector from "../components/TransTypesSelector";

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

	const handleSubmit = () => {};

	return (
		<div>
			<div>
				<h1>Nova Transação</h1>

				<Card>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor={formId}>Tipo de despesa</label>
							<TransactionTypeSelector 
							id={formId}
							value={formData.Type}
							onChange={handleTransactionType}/>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default transactionsForm;
