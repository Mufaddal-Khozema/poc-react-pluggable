import React, {useState, useEffect} from "react"; 
import { PluginProvider, RendererPlugin, createPluginStore, usePluginStore } from "react-pluggable";
import Root from "./components/Root.tsx";
import CashPlugin from "./plugins/CashPlugin.tsx";
import StripePlugin from "./plugins/StripePlugin.tsx";
import AmazonPlugin from "./plugins/AmazonPlugin.tsx";
import PaypalPlugin from "./plugins/PaypalPlugin.tsx";
import PaymentProvidersPlugin from "./plugins/PaymentProvidersPlugin.tsx";

const pluginStore = createPluginStore();
pluginStore.install(new RendererPlugin());
pluginStore.install(new PaymentProvidersPlugin());
pluginStore.install(new CashPlugin());

export const registerPaymentProviders = (enabledProviders) => {
	if (!enabledProviders.includes('stripe') 
	&& pluginStore.getInstalledPluginNameWithVersion("Stripe") !== null) {
		pluginStore.uninstall("Stripe");
	}
	if (!enabledProviders.includes('amazon')
	&& pluginStore.getInstalledPluginNameWithVersion("Amazon") !== null) {
		pluginStore.uninstall("Amazon");
	}
	if (!enabledProviders.includes('paypal')
	&& pluginStore.getInstalledPluginNameWithVersion("Paypal") !== null) {
		pluginStore.uninstall("Paypal");
	}
	if (enabledProviders.includes('stripe') 
	&& pluginStore.getInstalledPluginNameWithVersion("Stripe") === null) {
		pluginStore.install(new StripePlugin());
	}
	if (enabledProviders.includes('amazon')
	&& pluginStore.getInstalledPluginNameWithVersion("Amazon") === null) {
		pluginStore.install(new AmazonPlugin());
	}
	if (enabledProviders.includes('paypal')
	&& pluginStore.getInstalledPluginNameWithVersion("Paypal") === null) {
		pluginStore.install(new PaypalPlugin());
	}
}


const App = () => {
	const [enabledProviders, setEnabledProviders] = useState(["cash"]);
	const [providersData, setProvidersData] = useState([]);
  useEffect(() => {
    registerPaymentProviders(enabledProviders);
		setProvidersData(pluginStore.executeFunction("PaymentProviders.getProviders"));
  }, [enabledProviders]);

	return (
		<PluginProvider pluginStore={pluginStore}>
		 <Root providers={providersData} enabledProviders={enabledProviders} setEnabledProviders={setEnabledProviders}/>
		</PluginProvider>
	);
}

export default App;
