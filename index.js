/* eslint-disable no-undef */
/**
 * @format
 */

import App from "./App";
import { name as appName } from "./app.json";
import { AppRegistry, LogBox } from "react-native";
import { getRealm } from "./src/shared/services/realm/connection";
import "react-native-get-random-values";

if (__DEV__) {
	import("./src/config/ReactotronConfig");

	const configRealmWithFlipper = async () => {
		const realm = await getRealm();
		const { connectDatabases, RealmDB } = require("react-native-flipper-databases");

		connectDatabases([
			new RealmDB("Realm", realm),
		]);

		realm.close();
	};

	configRealmWithFlipper();
}

LogBox.ignoreLogs(["Setting a timer"]);
AppRegistry.registerComponent(appName, () => App);
