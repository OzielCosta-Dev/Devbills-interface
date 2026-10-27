import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getCategories } from "../services/categoryService";
import type { Category } from "../types/category";
import type { TransactionType } from "../types/transactions";

interface FormData {
	description: string;
	amount: number;
	date: string;
	categoryId: string;
	type: TransactionType;
}

const transactionsForm = () => {
	const [categories, setCategories] = useState<Category[]>([]);

	useEffect(() => {
		const fetchCategories = async (): Promise<void> => {
			const response = await getCategories();
			setCategories(response);
		};

		fetchCategories();
	}, []);

	const handleSubmit = () => {};

	return (
		<div>
			<div>
				<h1>Nova Transação</h1>

				<Card>
					<form onSubmit={handleSubmit}>
						<div>
							<label>Tipo de despesa</label>
						</div>
					</form>
				</Card>
			</div>
		</div>
	);
};

export default transactionsForm;
