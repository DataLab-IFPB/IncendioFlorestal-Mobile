import React from "react";
import MapboxGL from "@rnmapbox/maps";

import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import { useTheme } from "styled-components";
import { TouchableOpacity } from "react-native";

const FirePoint = ({ register, setFireDetails }) => {

	const theme = useTheme();

	function showFireDetails() {
		const copy = JSON.parse(JSON.stringify(register));
		if (typeof copy.status === "string") {
			copy.status = JSON.parse(copy.status);
		}
		setFireDetails(() => copy);
	}

	return (
		<MapboxGL.MarkerView
			id={register.id}
			coordinate={[
				register.latitude,
				register.longitude
			]}
		>
			{register.userCreated ? (
				<TouchableOpacity
					onPress={() => showFireDetails()}
				>
					<IconSimple
						name='fire'
						size={30}
						color={theme.colors.icon["accent-color-v2"]}
					/>
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					onPress={() => showFireDetails()}
				>
					<IconSimple
						name='fire'
						size={30}
						color={register.brightness >= 500 ?
							theme.colors.icon["accent-color-v1"] :
							theme.colors.icon["accent-color-v3"]
						}
					/>
				</TouchableOpacity>
			)}
		</MapboxGL.MarkerView>
	);
};

export { FirePoint };
