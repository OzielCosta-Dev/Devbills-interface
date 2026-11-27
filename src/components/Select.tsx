import { type ReactNode, type SelectHTMLAttributes, useId } from "react";

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	icon?: ReactNode;
	fullWidth?: boolean;
	options: SelectOption[];
}

const Select = ({
	label,
	options,
	icon,
	error,
	fullWidth = true,
	className = "",
	id,
	...rest
}: SelectProps) => {
	const generatedId = useId();
	const selectId = id || generatedId;

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4`}>
			{label && (
				<label
					htmlFor={selectId}
					className="block text-sm font-medium text-gray-50 mb-2"
				>
					{label}
				</label>
			)}

			<div className="relative">
				{icon && (
					<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
						{icon}
					</div>
				)}

				<select
					id={selectId}
					aria-invalid={Boolean(error)}
					className={`block w-full appearance-none rounded-xl border bg-gray-800 px-4 py-3 pr-10 text-sm text-gray-50
						cursor-pointer transition-all focus:outline-none focus:ring-2
						${error ? "border-red-500 focus:ring-red-500/30" : "border-gray-700 focus:border-primary-500 focus:ring-primary-500/30"}
						${icon ? "pl-10" : ""}
						${className}`}
					{...rest}
				>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>

				<div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
					<svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
						<title>Abrir</title>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>

			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export default Select;
