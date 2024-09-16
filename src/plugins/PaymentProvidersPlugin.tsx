import React from "react";
import { IPlugin, PluginStore } from "react-pluggable";
import PaymentProviderList from "../components/PaymentProviderList.tsx";

class PaymentProvidersPlugin implements IPlugin {
	namespace = "PaymentProviders";

	pluginStore: PluginStore;
	providers = [];
	availablePlugins = ["Cash", "Paypal", "Stripe", "Amazon"];

	getPluginName(): string {
		return `${this.namespace}@1.0.0`;
	}

	getDependencies(): string[] {
		return [];
	}

	init(pluginStore: PluginStore) {
		this.pluginStore = pluginStore;
	} 

	//Providers = () => {
	//	return <PaymentProviderList providers={this.providers} />
	//}

	activate() { 
		for(let paymentProvider of this.availablePlugins) {
			this.pluginStore.addEventListener(`${paymentProvider}.activate`, () => {
				const provider = this.pluginStore.executeFunction(`${paymentProvider}.getProvider`);
				this.providers.push(provider);
			});
			this.pluginStore.addEventListener(`${paymentProvider}.deactivate`, () => {
				const index = this.providers.findIndex((p) => p.name === paymentProvider);
				if (index !== -1) {
					this.providers.splice(index, 1);
				}
			});
		}
		//this.pluginStore.executeFunction("Renderer.add", `${this.namespace}.providers`, this.Providers)
		this.pluginStore.addFunction(`${this.namespace}.getProviders`, () => this.providers);
	}

	deactivate() {
		//this.pluginStore.executeFunction("Renderer.remove", `${this.namespace}.providers`, this.Providers)
		this.pluginStore.removeFunction(`${this.namespace}.getProviders`);
	}

	
}

export default PaymentProvidersPlugin;
