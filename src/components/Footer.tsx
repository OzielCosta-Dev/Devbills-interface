const Footer = () => {
	return (
		<footer className="border-t border-gray-700 bg-gray-900">
			<div className="container-app py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-400">
				<p>
					<span className="text-primary-500 font-semibold">DevBills</span> —
					controle financeiro pessoal
				</p>
				<p>
					© {new Date().getFullYear()} DevBills. Todos os direitos reservados.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
