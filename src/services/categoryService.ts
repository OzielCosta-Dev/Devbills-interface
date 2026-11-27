import type { Category } from "../types/category";
import { api } from "./api";

export const getCategories = async (): Promise<Category[]> => {
	const response = await api.get<Category[]>("/categories");
	return response.data;
};
