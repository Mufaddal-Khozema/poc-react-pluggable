import React from "react";
import { IPlugin, PluginStore, Event } from "react-pluggable";
import paypal from "../assets/paypal.png";

class PaypalPlugin implements IPlugin {
	namespace = "Paypal";
	pluginStore: PluginStore;
	detail = {
		name: "Paypal",
		src: paypal
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

	activate(): void {
		this.pluginStore.addFunction(`${this.namespace}.getProvider`, () => this.detail);
		this.pluginStore.dispatchEvent(new Event(`${this.namespace}.activate`));
	}

	deactivate(): void {
		this.pluginStore.dispatchEvent(new Event(`${this.namespace}.deactivate`));
	}
}

export default PaypalPlugin;
