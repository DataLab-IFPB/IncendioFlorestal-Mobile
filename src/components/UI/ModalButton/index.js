import React from "react";
import { Label, Touchable } from "./styles";
import { ActivityIndicator } from "react-native";

const ModalButton = ({ message, onPress, highlighted = false, load = false }) => {
	return(
		<Touchable onPress={onPress} isHighlighted={highlighted}>
			{!load && <Label>{message}</Label>}
			{!!load && <ActivityIndicator size="small" color="#FFF" />}
		</Touchable>
	);
};
export { ModalButton };
