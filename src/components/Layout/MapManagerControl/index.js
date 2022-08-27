/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "../../UI";
import { Container } from "./styles";

const MapManagerControl = ({ onDownload, onClear, onCancel }) => {
	const navigation = useNavigation();
	
	return (
		<Container>
			<IconButton
				message="Baixar"
				iconName="download-outline"
				handle={onDownload}
			/>
			<IconButton
				message="Limpar"
				iconName="trash-outline"
				handle={onClear}
			/>
			<IconButton
				message="Áreas Salvas"
				iconName="list-outline"
				handle={() => navigation.navigate('DownloadedPacks')}
			/>
			<IconButton
				message="Cancelar"
				iconName="close"
				handle={onCancel}
			/>
		</Container>
	);
};

export { MapManagerControl };
