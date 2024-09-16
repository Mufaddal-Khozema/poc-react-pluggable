import React from "react";

const PaymentProviderList = ({providers}) => {
	return providers?.map(e => {
		return (
			<button style={{
				border: "1px #846A6A solid",
				borderRadius: "1.25rem",
				textAlign: "start",
				display: "flex",
				WebkitJustifyContent: "center",
				alignItems: "center",
				width: "75%",
				cursor: "pointer",
			}}
			>
				<img src={e.src} style={{width: "100px", maxHeight:"50px",  marginRight: "2rem"}}/>
				<h2 style={{
					fontWeight: "bold",
					fontSize: "1.4rem",
				}}>{e.name}</h2>
			</button>
		);
	})
}

export default PaymentProviderList;
