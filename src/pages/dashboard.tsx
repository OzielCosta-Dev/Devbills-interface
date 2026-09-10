import { useEffect } from "react";
import MonthYearSelect from "../components/MonthYearSelect";
import { api } from "../services/api";

const Dashboard = () => {
	useEffect(() => {
		async function getTransactions() {
			const response = await api.get("/transactions");

			console.log(response);
		}

		getTransactions();
	}, []);

	return (
		<div className="container-app py-6">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
				<h1 className="text-2xl font-bold mb-4 md:mb-0">Dashboard</h1>
				<MonthYearSelect />
			</div>
		</div>
	);
};

export default Dashboard;
