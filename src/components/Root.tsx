import React, {useState} from "react";
import PaymentProviderList from "./PaymentProviderList.tsx";

const Root = ({providers, enabledProviders, setEnabledProviders}) => {
	const [page, setPage] = useState("checkout");

	const [checkedItems, setCheckedItems] = useState([]);
	const checkboxes = [ 'Cash', 'Amazon', 'Stripe', 'Paypal' ];

<<<<<<< HEAD
	const handleProviderChange = async (event) => {
		const { value, checked } = event.target;
		let providers;

		if (checked) {
			providers = [...enabledProviders, value];
		} else {
			providers = enabledProviders.filter((item) => item !== value);
		}
		const res = await fetch("http://localhost:3000/", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({data: providers.join(",")})
		})
		setEnabledProviders(providers);
=======
			if (checked) {
				setEnabledProviders([...enabledProviders, value]);
			} else {
				setEnabledProviders(enabledProviders.filter((item) => item !== value));
			}
>>>>>>> e15d7820b244b38e2b2128d6746c044ddecae779
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
<<<<<<< HEAD
		<>
		<h1 style={{marginBottom: "5rem"}}>Settings</h1>
		<div style={{width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem"}}>
			{checkboxes.map((item, i) => (
				<div key={i}>
					<label>
						<input
							type="checkbox"
							value={item}
							checked={enabledProviders.includes(item)}
							onChange={handleProviderChange}
						/>
						{item}
					</label>
				</div>
			))}
		</div>
		</>
=======
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
>>>>>>> e15d7820b244b38e2b2128d6746c044ddecae779
	);

	return (
		<div 
			style={{
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
			<div 
				style={{
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
