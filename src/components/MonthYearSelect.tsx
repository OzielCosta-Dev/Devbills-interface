import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
	month: number;
	year: number;
	onMonthChange: (month: number) => void;
	onYearChange: (year: number) => void;
}

const MonthYearSelect = ({
	month,
	onMonthChange,
	onYearChange,
	year,
}: MonthYearSelectProps) => {
	const monthNames: readonly string[] = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];

	return (
		<div className="flex items-center justify-between bg-900 rounded-lg p-3 border border-gray-700">
			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors"
				aria-label="Mês Anterior"
			>
				<ChevronLeft />
			</button>

			<div>
				<label htmlFor="month-select" className="sr-only">
					Selecionar Mês
				</label>
				<select
					id="month-select"
					className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus: outline-none focus:ring-1 focus: ring-primary-500"
				>
					{monthNames.map((name, index) => (
						<option key={name} value={index + 1}>
							{name}
						</option>
					))}
				</select>

				<label htmlFor="year-select" className="sr-only">
					Selecionar Ano
				</label>
				<select
					id="year-select"
					className="bg-gray-800 border border-gray-700 rounded-md py-1 px-3 text-sm font-medium text-gray-100 focus: outline-none focus:ring-1 focus: ring-primary-500"
				>
					{monthNames.map((name, index) => (
						<option key={name} value={index + 1}>
							{name}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default MonthYearSelect;
