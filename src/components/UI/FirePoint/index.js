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
			const copy = JSON.parse(JSON.stringify(register[0]));
			const cluster = JSON.parse(JSON.stringify(register));
			
			if (typeof copy.status === "string") {
				copy.status = JSON.parse(copy.status);
			}
			setFireDetails(() => cluster);
			setLoad(false);
		}
	}, [load]);

	const pickColor = () => {
		if (register[0].status.finished_at) {
			return theme.colors.icon["accent-color-v5"];
		} else if (register[0].status.in_attendance_at) {
			return theme.colors.icon["accent-color-v4"];
		} else if (register[0].userCreated) {
			return theme.colors.icon["accent-color-v2"];
		} else if (register[0].brightness >= 500) {
			return theme.colors.icon["accent-color-v1"];
		} else {
			return theme.colors.icon["accent-color-v3"];
		}
	}

	return (
		<MapboxGL.MarkerView
			id={register[0].id}
			coordinate={[
				register[0].latitude,
				register[0].longitude
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
