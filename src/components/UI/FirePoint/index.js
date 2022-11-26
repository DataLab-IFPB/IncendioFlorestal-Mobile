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
					onPress={() => setLoad(true)}
				>
					{load && <ActivityIndicator size="small" color="#F00000" />}
					{!load && (
						<IconSimple
							name='fire'
							size={30}
							color={theme.colors.icon["accent-color-v2"]}
						/>
					)}
				</TouchableOpacity>
			) : (
				<TouchableOpacity
					onPress={() => setLoad(true)}
				>
					{load && <ActivityIndicator size="small" color="#F00000" />}
					{!load && (
						<IconSimple
							name='fire'
							size={30}
							color={register.brightness >= 500 ?
								theme.colors.icon["accent-color-v1"] :
								theme.colors.icon["accent-color-v3"]
							}
						/>
					)}
				</TouchableOpacity>
			)}
		</MapboxGL.MarkerView>
	);
};

export { FirePoint };
