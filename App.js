import React, { useEffect } from "react";
import store from "./src/store";
import Theme from "./src/theme";
import Routes from "./src/routes/routes";
import SplashScreen from "react-native-splash-screen";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { Loading } from "./src/components/Layout";

export default function App() {

	useEffect(() => {
		SplashScreen.hide();
	});

	return (
		<Provider store={store}>
			<Theme>
				<Loading/>
				<Routes/>
				<Toast/>
			</Theme>
		</Provider>
	);
}
