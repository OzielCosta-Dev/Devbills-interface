import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./utils/index.css";

// biome-ignore lint/style/noNonNullAssertion: o elemento #root sempre existe no index.html
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
