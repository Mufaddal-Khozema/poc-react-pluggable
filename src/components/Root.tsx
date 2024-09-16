import React, {useState} from "react";
import { usePluginStore } from "react-pluggable";
import PaymentProviderList from "./PaymentProviderList.tsx";

const Root = ({providers, enabledProviders, setEnabledProviders}) => {
	const pluginStore = usePluginStore();
	const [page, setPage] = useState("checkout");
	let Renderer = pluginStore.executeFunction("Renderer.getRendererComponent");

	const [checkedItems, setCheckedItems] = useState([]);
	const checkboxes = [
		{label: 'Cash', value: 'cash'},
		{label: 'Amazon', value: 'amazon'},
		{label: 'Stripe', value: 'stripe'},
		{label: 'Paypal', value: 'paypal'}
	];
	
	const handleProviderChange = (event) => {
			const { value, checked } = event.target;

			if (checked) {
					setEnabledProviders([...enabledProviders, value]);
			} else {
					setEnabledProviders(enabledProviders.filter((item) => item !== value));
			}
	};
	
	const checkoutPage = (providers) => (
			<>
			<h1 style={{marginBottom: "5rem"}}>Checkout</h1>
			<div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
				<PaymentProviderList providers={providers} />
			</div>
			</>
	);
	const settingPage = () => (
			<>
			<h1 style={{marginBottom: "5rem"}}>Settings</h1>
			<div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
            {checkboxes.map((item, index) => (
                <div key={index}>
                    <label>
                        <input
                            type="checkbox"
                            value={item.value}
                            checked={enabledProviders.includes(item.value)}
                            onChange={handleProviderChange}
                        />
                        {item.label}
                    </label>
                </div>
            ))}
			</div>
			</>
	);

	return (
		<div style={{
			backgroundColor: "white",
			height: "100%",
			width: "100%",
			display: "grid",
			gridTemplateColumns: "20% 80%"
		}}>
			<div style={{backgroundColor: "#353B3C"}}>
				<button 
					type="button" style={{
						width: "100%",
						height: "4rem",
						background: "none",
						color: "white",
						borderColor: "white",
						cursor: "pointer"
					}}
					onClick={() => setPage("checkout")}
				>
				Checkout</button>
				<button 
					type="button" style={{
						width: "100%",
						height: "4rem",
						background: "none",
						color: "white",
						borderColor: "white",
						cursor: "pointer"
					}}
					onClick={() => setPage("setting")}
				>
				Setting</button>
			</div>
			<div style={{
				height: "100%",
				backgroundColor: "#EEF0F2",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				padding: "0 15rem"
			}}>
				{ page === "checkout" ? checkoutPage(providers) : settingPage()}
			</div>
		</div>
	);
}

						//<Renderer placement={"PaymentProviders.providers"} />
export default Root;
