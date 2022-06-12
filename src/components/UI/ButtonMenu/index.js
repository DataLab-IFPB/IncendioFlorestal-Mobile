import React from "react";
import { Touchable } from "./styles";

const ButtonMenu = ({ children, onPress }) => {
	return(
		<Touchable onPress={onPress}>
			{children}
		</Touchable>
	);
};

export default ButtonMenu;
