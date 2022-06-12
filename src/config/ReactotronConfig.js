import { NativeModules } from "react-native";
import { reactotronRedux } from "reactotron-redux";
import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { scriptURL } = NativeModules.SourceCode;
const hostName = scriptURL.split("://")[1].split(":")[0];

const reactoTronConfig = Reactotron.setAsyncStorageHandler(AsyncStorage)
	.configure({ host: hostName }) // android
	.useReactNative()
	.use(reactotronRedux())
	.connect();

reactoTronConfig.clear();

console.tron = reactoTronConfig;

export default reactoTronConfig;
