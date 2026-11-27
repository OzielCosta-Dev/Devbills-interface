import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectorProps {
	value: TransactionType;
	id?: string;
	onChange: (type: TransactionType) => void;
}

const transactionTypeButtons = [
	{
		type: TransactionType.EXPENSE,
		label: "Despesa",
		activeClasses: "bg-red-500/15 border-red-500 text-red-500 font-semibold",
		inactiveClasses:
			"bg-transparent border-gray-700 text-gray-400 hover:border-red-500/60 hover:text-red-500",
	},
	{
		type: TransactionType.INCOME,
		label: "Receita",
		activeClasses:
			"bg-primary-500/15 border-primary-500 text-primary-500 font-semibold",
		inactiveClasses:
			"bg-transparent border-gray-700 text-gray-400 hover:border-primary-500/60 hover:text-primary-500",
	},
];

const TransactionTypeSelector = ({
	value,
	onChange,
	id,
}: TransactionTypeSelectorProps) => {
	return (
		<fieldset className="grid grid-cols-2 gap-2" id={id}>
			<legend className="sr-only">Tipo de transação</legend>
			{transactionTypeButtons.map((item) => (
				<button
					key={item.type}
					type="button"
					aria-pressed={value === item.type}
					className={`cursor-pointer flex items-center justify-center border rounded-xl py-3 px-4 transition-all ${
						value === item.type ? item.activeClasses : item.inactiveClasses
					}`}
					onClick={() => onChange(item.type)}
				>
					{item.label}
				</button>
			))}
		</fieldset>
	);
};

export default TransactionTypeSelector;
