import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthYearSelectProps {
	month: number;
	year: number;
	onMonthChange: (month: number) => void;
	onYearChange: (year: number) => void;
}

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

const selectClasses =
	"bg-gray-800 border border-gray-700 rounded-md py-1.5 px-3 text-sm font-medium text-gray-50 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-500";

const MonthYearSelect = ({
	month,
	onMonthChange,
	onYearChange,
	year,
}: MonthYearSelectProps) => {
	const currentYear = new Date().getFullYear();
	const years: number[] = Array.from(
		{ length: 11 },
		(_, i) => currentYear - 5 + i,
	);
	// Garante que o ano selecionado sempre exista na lista (ao navegar pelas setas)
	if (!years.includes(year)) {
		years.push(year);
		years.sort((a, b) => a - b);
	}

	const handleNextMonth = (): void => {
		if (month === 12) {
			onMonthChange(1);
			onYearChange(year + 1);
		} else {
			onMonthChange(month + 1);
		}
	};

	const handlePrevMonth = (): void => {
		if (month === 1) {
			onMonthChange(12);
			onYearChange(year - 1);
		} else {
			onMonthChange(month - 1);
		}
	};

	return (
		<div className="flex items-center justify-between gap-2 bg-gray-900 rounded-lg p-2 border border-gray-700">
			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
				aria-label="Mês anterior"
				onClick={handlePrevMonth}
			>
				<ChevronLeft className="w-5 h-5" />
			</button>

			<div className="flex items-center gap-2">
				<label htmlFor="month-select" className="sr-only">
					Selecionar mês
				</label>
				<select
					id="month-select"
					value={month}
					onChange={(event) => onMonthChange(Number(event.target.value))}
					className={selectClasses}
				>
					{monthNames.map((name, index) => (
						<option key={name} value={index + 1}>
							{name}
						</option>
					))}
				</select>

				<label htmlFor="year-select" className="sr-only">
					Selecionar ano
				</label>
				<select
					id="year-select"
					value={year}
					onChange={(event) => onYearChange(Number(event.target.value))}
					className={selectClasses}
				>
					{years.map((y) => (
						<option key={y} value={y}>
							{y}
						</option>
					))}
				</select>
			</div>

			<button
				type="button"
				className="p-2 rounded-full hover:bg-gray-800 hover:text-primary-500 transition-colors cursor-pointer"
				aria-label="Próximo mês"
				onClick={handleNextMonth}
			>
				<ChevronRight className="w-5 h-5" />
			</button>
		</div>
	);
};

export default MonthYearSelect;
