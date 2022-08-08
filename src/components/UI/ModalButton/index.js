import React from "react";
import { Label, Touchable } from "./styles";

const ModalButton = ({ message, onPress, highlighted = false }) => {
	return(
		<Touchable onPress={onPress} isHighlighted={highlighted}>
			<Label>{message}</Label>
		</Touchable>
	);
};
export default ModalButton;
