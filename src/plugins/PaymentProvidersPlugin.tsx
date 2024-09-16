import React from "react";
import { IPlugin, PluginStore } from "react-pluggable";
import PaymentProviderList from "../components/PaymentProviderList.tsx";
import CashPlugin from "./CashPlugin.tsx";
import PaypalPlugin from "./PaypalPlugin.tsx";
import StripePlugin from "./StripePlugin.tsx";
import AmazonPlugin from "./AmazonPlugin.tsx";

class PaymentProvidersPlugin implements IPlugin {
	namespace = "PaymentProviders";

	pluginStore: PluginStore;
	providers = [];
	availablePlugins = ["Cash", "Paypal", "Stripe", "Amazon"];
	classMap = {
	"Cash": CashPlugin,
	"Paypal": PaypalPlugin,
	"Stripe": StripePlugin,
	"Amazon": AmazonPlugin
	}

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

	registerPaymentProviders(enabledProviders) {
		for(let paymentProvider of this.availablePlugins) {
			if (!enabledProviders.includes(paymentProvider) 
			&& this.pluginStore.getInstalledPluginNameWithVersion(paymentProvider) !== null) {
				this.pluginStore.uninstall(paymentProvider);
			}
			if (enabledProviders.includes(paymentProvider) 
			&& this.pluginStore.getInstalledPluginNameWithVersion(paymentProvider) === null) {
				console.log(`./${paymentProvider}Plugin.tsx`);
				const PluginClass = this.classMap[paymentProvider];
				this.pluginStore.install(new PluginClass());
			}
		}
	}

	async getEnabledProvider() {
		const res = await fetch("http://localhost:3000/");
		const data = await res.json();
		this.registerPaymentProviders(data);
		return data;
	}

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
		this.pluginStore.addFunction(`${this.namespace}.refetch`, this.getEnabledProvider.bind(this));
		this.pluginStore.addFunction(`${this.namespace}.getProviders`, () => this.providers);
	}

	deactivate() {
		//this.pluginStore.executeFunction("Renderer.remove", `${this.namespace}.providers`, this.Providers)
		this.pluginStore.removeFunction(`${this.namespace}.getProviders`);
	}

	
}

export default PaymentProvidersPlugin;
