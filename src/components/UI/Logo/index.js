/* eslint-disable no-undef */
import React from "react";
import { Container, ImageLogo } from "./styles";

const Logo = () =>  {
	return(
		<Container>
			<ImageLogo
				source={require("../../../assets/logo.png")}
			/>
		</Container>
	);
};

export default Logo;
