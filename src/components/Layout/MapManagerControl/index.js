/* eslint-disable react/react-in-jsx-scope */
import { IconButton } from "../../UI";
import { Container } from "./styles";

const MapManagerControl = () => {
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
		</Container>
	);
};

export { MapManagerControl };
