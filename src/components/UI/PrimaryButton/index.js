import React from "react";
import { Touchable, Label } from "./styles";

const PrimaryButton = ({ message, onPress }) => {
	return(
		<Touchable onPress={onPress}>
			<Label>{message}</Label>
		</Touchable>
	);
};

export { PrimaryButton };
