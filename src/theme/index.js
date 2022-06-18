import React from "react";
import { ThemeProvider } from "styled-components";

const configTheme = {
	colors: {
		icon: {
			primary: "#F00000",
			secondary: "#FFF000",
			tertiary: "#FF4500"
		},

		text: {
			primary: "#67686A"
		},

		main: {
			primary:   "#C00000",
			secondary: "#EAEAEA",
			tertiary: "#000000"
		},

		error: {
			primary: "#C00000"
		},
	}
};

const Theme = ({ children }) => {
	return(
		<ThemeProvider theme={configTheme}>
			{children}
		</ThemeProvider>
	);
};

export default Theme;
