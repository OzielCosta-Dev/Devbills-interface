import type {
	MonthlyItem,
	Transaction,
	TransactionFilter,
	TransactionPayload,
	TransactionSummary,
} from "../types/transactions";
import { api } from "./api";

export const getTransactions = async (
	filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
	const response = await api.get<Transaction[]>("/transactions", {
		params: filter,
	});

	return response.data;
};

export const getTransactionById = async (id: string): Promise<Transaction> => {
	const response = await api.get<Transaction>(`/transactions/${id}`);
	return response.data;
};

export const createTransaction = async (
	payload: TransactionPayload,
): Promise<Transaction> => {
	const response = await api.post<Transaction>("/transactions", payload);
	return response.data;
};

export const updateTransaction = async (
	id: string,
	payload: TransactionPayload,
): Promise<Transaction> => {
	const response = await api.put<Transaction>(`/transactions/${id}`, payload);
	return response.data;
};

export const getTransactionSummary = async (
	month: number,
	year: number,
): Promise<TransactionSummary> => {
	const response = await api.get<TransactionSummary>("/transactions/summary", {
		params: { month, year },
	});

	return response.data;
};

export const getTransactionsMontly = async (
	month: number,
	year: number,
	months?: number,
): Promise<{ history: MonthlyItem[] }> => {
	const response = await api.get<{ history: MonthlyItem[] }>(
		"/transactions/historical",
		{ params: { month, year, months } },
	);

	return response.data;
};

export const deleteTransactions = async (id: string): Promise<void> => {
	await api.delete(`/transactions/${id}`);
};
