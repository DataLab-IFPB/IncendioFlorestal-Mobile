import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, Label } from "./styles";

const IconButton = ({ message, iconName, handle}) => {
	return(
		<Button onPress={handle}>
			<Ionicons name={iconName} color="#fff" size={15} />
			<Label>
				{message}
			</Label>
		</Button>
	);
};

export { IconButton };
