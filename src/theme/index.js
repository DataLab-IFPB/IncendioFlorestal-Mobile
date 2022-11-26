import React from "react";
import { ThemeProvider } from "styled-components";

const configTheme = {
	font: {
		size: {
			title: 15,
			normal: 12,
			large: 14,
		}
	},

	colors: {
		icon: {
			"accent-color-v1": "#F00000",
			"accent-color-v2": "#FFF000",
			"accent-color-v3": "#FF4500"
		},

		text: {
			"primary-v1": "#67686A",
			"primary-v2": "#FFF"
		},

		main: {
			"primary-v1":   "#C00000",
			"primary-v2": "#EAEAEA",
			"primary-v3": "#000000"
		},

		level: {
			"error-v1": "#C00000",
			"warning-v1": "#007E33",
			"success-v1": "#FF8800"
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
