import React from "react";
import { IPlugin, PluginStore, Event } from "react-pluggable";
import stripe from "../assets/stripe.png";

class StripePlugin implements IPlugin {
	namespace = "Stripe";
	pluginStore: PluginStore;
	detail = {
		name: "Stripe",
		src: stripe
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

export default StripePlugin;
