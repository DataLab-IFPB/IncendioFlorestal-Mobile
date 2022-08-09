/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { IconButton } from "../../UI";
import { Container } from "./styles";

const MapManagerControl = ({ handleCancel }) => {
	return(
		<Container>
			<IconButton
				message="Baixar"
				iconName="download-outline"
				handle={() => {}}
			/>
			<IconButton
				message="Limpar"
				iconName="trash-outline"
				handle={() => {}}
			/>
			<IconButton
				message="Cancelar"
				iconName="close"
				handle={handleCancel}
			/>
		</Container>
	);
};

export { MapManagerControl };
