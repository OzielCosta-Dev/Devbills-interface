export const formatCurrency = (value: number): string => {
	return new Intl.NumberFormat("pt-BR", {
		currency: "BRL",
		style: "currency",
	}).format(value);
};

/**
 * As datas são salvas na API como meia-noite UTC (ex.: 2026-11-01T00:00:00Z).
 * Formatamos em UTC para não "voltar um dia" em fusos negativos como o do Brasil.
 */
export const formatDate = (date: Date | string): string => {
	const dateObj = date instanceof Date ? date : new Date(date);
	return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(dateObj);
};

/** Converte uma data da API para o formato aceito por <input type="date"> (YYYY-MM-DD). */
export const toInputDate = (date: Date | string): string => {
	const dateObj = date instanceof Date ? date : new Date(date);
	return dateObj.toISOString().slice(0, 10);
};

/** Data de hoje no fuso local, no formato YYYY-MM-DD. */
export const todayInputDate = (): string => {
	const now = new Date();
	const offset = now.getTimezoneOffset() * 60_000;
	return new Date(now.getTime() - offset).toISOString().slice(0, 10);
};
