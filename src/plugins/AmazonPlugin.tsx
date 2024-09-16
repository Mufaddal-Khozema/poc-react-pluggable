import React from "react";
import { IPlugin, PluginStore, Event } from "react-pluggable";
import amazon from "../assets/amazon.png";

class AmazonPlugin implements IPlugin {
	namespace = "Amazon";
	pluginStore: PluginStore;
	detail = {
		name: "Amazon",
		src: amazon
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

export default AmazonPlugin;
