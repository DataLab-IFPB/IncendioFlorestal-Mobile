import MapboxGL from "@rnmapbox/maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PERMISSION_LOCATION_USE } from "../constants";

const usePermission = () => {
	async function verifyPermission() {
		const permission = await AsyncStorage.getItem(PERMISSION_LOCATION_USE);
		if (!permission) {
			const request = await MapboxGL.requestAndroidLocationPermissions();
			await AsyncStorage.setItem(
				PERMISSION_LOCATION_USE,
				JSON.stringify(request),
			);
		}
	}

	return {
		verifyPermission
	};
};

export { usePermission };
