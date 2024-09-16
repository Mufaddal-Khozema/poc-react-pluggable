import React, {useState, useEffect} from "react"; 
import { PluginProvider, RendererPlugin, createPluginStore, usePluginStore } from "react-pluggable";
import Root from "./components/Root.tsx";
import CashPlugin from "./plugins/CashPlugin.tsx";
import PaymentProvidersPlugin from "./plugins/PaymentProvidersPlugin.tsx";

const pluginStore = createPluginStore();
pluginStore.install(new RendererPlugin());
pluginStore.install(new PaymentProvidersPlugin());
pluginStore.install(new CashPlugin());

const App = () => {
	const [enabledProviders, setEnabledProviders] = useState(["Cash"]);
	const [providersData, setProvidersData] = useState([]);
  useEffect(() => {
		(async () =>  {
			await pluginStore.executeFunction("PaymentProviders.refetch")
			setProvidersData(pluginStore.executeFunction("PaymentProviders.getProviders"));
		})()
  }, [enabledProviders]);

	return (
		<PluginProvider pluginStore={pluginStore}>
		 <Root providers={providersData} enabledProviders={enabledProviders} setEnabledProviders={setEnabledProviders}/>
		</PluginProvider>
	);
}

export default App;
