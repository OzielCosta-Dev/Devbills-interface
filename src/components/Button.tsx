import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariants = "primary" | "outline" | "secondary" | "success" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariants;
	fullWidth?: boolean;
	isLoading?: boolean;
}

const variantClasses: Record<ButtonVariants, string> = {
	primary: "bg-primary-500 text-[#051626] font-semibold hover:bg-primary-600",
	outline: "border border-primary-500 text-primary-500 hover:bg-primary-500/10",
	secondary: "bg-gray-800 text-white hover:bg-gray-700",
	success: "bg-green-500 text-[#051626] hover:brightness-90",
	danger: "bg-red-500 text-white hover:brightness-90",
};

const Button = ({
	children,
	variant = "primary",
	fullWidth = false,
	isLoading = false,
	className = "",
	disabled,
	type = "button",
	...rest
}: ButtonProps) => {
	const isDisabled = isLoading || disabled;

	return (
		<button
			type={type}
			className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-medium transition-all
				${variantClasses[variant]}
				${isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
				${fullWidth ? "w-full" : ""}
				${className}`}
			disabled={isDisabled}
			{...rest}
		>
			{isLoading && (
				<svg
					className="animate-spin h-4 w-4 text-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<title>Carregando</title>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					/>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
			)}
			{children}
		</button>
	);
};

export default Button;
