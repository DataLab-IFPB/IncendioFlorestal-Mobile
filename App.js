import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import { Provider } from "react-redux";

import store from "./src/store";
import Theme from "./src/theme";
import Routes from "./src/routes/routes";
import { Loader } from "./src/components/Layout";

export default function App() {

	useEffect(() => {
		SplashScreen.hide();
	});

	return (
		<Provider store={store}>
			<Theme>
				<Loader />
				<Routes />
			</Theme>
		</Provider>
	);
}
