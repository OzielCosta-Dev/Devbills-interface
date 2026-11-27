interface SpinnerProps {
	label?: string;
	fullScreen?: boolean;
}

const Spinner = ({ label, fullScreen = false }: SpinnerProps) => (
	<div
		className={`flex flex-col items-center justify-center gap-3 ${fullScreen ? "min-h-screen" : "py-12"}`}
		role="status"
	>
		<div className="w-10 h-10 border-4 border-gray-700 border-t-primary-500 rounded-full animate-spin" />
		{label && <p className="text-sm text-gray-400">{label}</p>}
	</div>
);

export default Spinner;
