import React from "react";
import { Touchable } from "./styles";

const MenuButton = ({ children, onPress }) => {
	return(
		<Touchable onPress={onPress}>
			{children}
		</Touchable>
	);
};

export { MenuButton };
