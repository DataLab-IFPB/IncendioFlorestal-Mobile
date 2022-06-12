import React from "react";
import { Label, Touchable } from "./styles";

const ButtonModal = ({ message, onPress, highlighted = false }) => {
	return(
		<Touchable onPress={onPress} isHighlighted={highlighted}>
			<Label>{message}</Label>
		</Touchable>
	);
};
export default ButtonModal;
