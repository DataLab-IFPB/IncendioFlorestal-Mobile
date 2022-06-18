import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "styled-components";
import { Button } from "../../UI";
import {
	ContainerRoot,
	Container,
	ContainerIcon,
	Modal,
	Title,
	ContainerContent,
	TextInfo
} from "./styles";

const ModalWarning = ({message, isVisible, onConfirm}) => {

	const theme = useTheme();

	return(
		<Modal animationType='fade' transparent={true} visible={isVisible}>
			<ContainerRoot>
				<Container>
					<ContainerIcon>
						<Icon name='alert-circle' size={100} color={theme.colors.main.primary}/>
					</ContainerIcon>
					<ContainerContent>
						<Title>Ooops!!</Title>
						<TextInfo>{message}</TextInfo>
						<Button onPress={onConfirm}>Confirmar</Button>
					</ContainerContent>
				</Container>
			</ContainerRoot>
		</Modal>
	);
};

export default ModalWarning;
