import React from "react";
import { IPlugin, PluginStore, Event } from "react-pluggable";
import cash from "../assets/cash.png";

class CashPlugin implements IPlugin {
	namespace = "Cash";
	pluginStore: PluginStore;
	detail = {
		name: "Cash",
		src: cash
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

export default CashPlugin;
