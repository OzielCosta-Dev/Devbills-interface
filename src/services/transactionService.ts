import type { Transaction, TransactionFilter } from "../types/transactions";
import api from "./api";

export const getTransactions = async (
	filter?: Partial<TransactionFilter>,
): Promise<Transaction[]> => {
	const response = api.get<Transaction[]>("/transactions", {});
};
