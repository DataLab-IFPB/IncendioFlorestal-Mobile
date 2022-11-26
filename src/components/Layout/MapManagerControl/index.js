import React from "react";
import { useNavigation } from "@react-navigation/native";

import { IconButton } from "../../UI";
import { Container } from "./styles";

const MapManagerControl = ({ onDownload, onCancel }) => {
	const navigation = useNavigation();

	return (
		<Container>
			<IconButton
				message="Baixar"
				iconName="download-outline"
				handle={onDownload}
			/>
			<IconButton
				message="Áreas Salvas"
				iconName="list-outline"
				handle={() => navigation.navigate("DownloadedPacks")}
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
