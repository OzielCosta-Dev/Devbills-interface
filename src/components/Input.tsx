import { type InputHTMLAttributes, type ReactNode, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	fullWidth?: boolean;
	icon?: ReactNode;
	label?: string;
	error?: string;
}

const Input = ({
	icon,
	fullWidth = true,
	label,
	error,
	id,
	className = "",
	...rest
}: InputProps) => {
	const generatedId = useId();
	const inputId = id || generatedId;

	return (
		<div className={`${fullWidth ? "w-full" : ""} mb-4`}>
			{label && (
				<label
					htmlFor={inputId}
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

				<input
					id={inputId}
					aria-invalid={Boolean(error)}
					className={`block w-full rounded-xl border bg-gray-800 px-4 py-3 text-sm text-gray-50
						placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 [color-scheme:dark]
						${error ? "border-red-500 focus:ring-red-500/30" : "border-gray-700 focus:border-primary-500 focus:ring-primary-500/30"}
						${icon ? "pl-10" : ""}
						${className}`}
					{...rest}
				/>
			</div>

			{error && <p className="mt-1 text-sm text-red-500">{error}</p>}
		</div>
	);
};

export default Input;
