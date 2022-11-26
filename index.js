/* eslint-disable no-undef */
/**
 * @format
 */

import App from "./App";
import { name as appName } from "./app.json";
import { AppRegistry, LogBox } from "react-native";
import "react-native-get-random-values";

if (__DEV__) {
	import("./src/config/ReactotronConfig");
}

LogBox.ignoreLogs(["Setting a timer"]);
AppRegistry.registerComponent(appName, () => App);
