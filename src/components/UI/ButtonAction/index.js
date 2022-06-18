// eslint-disable-next-line no-unused-vars
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "./styles";

const ButtonAction = ({ icon, onPress }) => {
	return(
		<Button onPress={onPress}>
			<Ionicons
				name={icon}
				size={15}
				color={"#FFF"}
			/>
		</Button>
	);
};

export default ButtonAction;
