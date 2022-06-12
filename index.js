/* eslint-disable no-undef */
/**
 * @format
 */

import App from "./App";
import { name as appName } from "./app.json";
import { AppRegistry } from "react-native";
import { LogBox } from "react-native";
import { database } from "./src/shared/services/watermelonDB/connection";

if (__DEV__) {
	import("./src/config/ReactotronConfig");

	const {
		connectDatabases,
		WatermelonDB,
	} = require("react-native-flipper-databases");

	connectDatabases([
		new WatermelonDB(database)
	]);

}

LogBox.ignoreLogs(["Setting a timer"]);
AppRegistry.registerComponent(appName, () => App);
