// eslint-disable-next-line no-unused-vars
import React from "react";
import { Button } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";

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
