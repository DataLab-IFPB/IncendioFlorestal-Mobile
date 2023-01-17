import React, { useState, useEffect } from "react";
import MapboxGL from "@rnmapbox/maps";

import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import { useTheme } from "styled-components";
import { TouchableOpacity, ActivityIndicator } from "react-native";

const FirePoint = ({ register, setFireDetails }) => {

	const theme = useTheme();
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (load) {
			const copy = JSON.parse(JSON.stringify(register));
			if (typeof copy.status === "string") {
				copy.status = JSON.parse(copy.status);
			}
			setFireDetails(() => copy);
			setLoad(false);
		}
	}, [load]);

	const pickColor = () => {
		if (register.status.finished_at) {
			return theme.colors.icon["accent-color-v5"];
		} else if (register.status.in_attendance_at) {
			return theme.colors.icon["accent-color-v4"];
		} else if (register.userCreated) {
			return theme.colors.icon["accent-color-v2"];
		} else if (register.brightness >= 500) {
			return theme.colors.icon["accent-color-v1"];
		} else {
			return theme.colors.icon["accent-color-v3"];
		}
	}

	return (
		<MapboxGL.MarkerView
			id={register.id}
			coordinate={[
				register.latitude,
				register.longitude
			]}
		>
			<TouchableOpacity onPress={() => setLoad(true)}>
				{load && <ActivityIndicator size="small" color={pickColor()} />}
				{!load && (
					<IconSimple
						name='fire'
						size={30}
						color={pickColor()}
					/>
				)}
			</TouchableOpacity>
		</MapboxGL.MarkerView>
	);
};

export { FirePoint };
