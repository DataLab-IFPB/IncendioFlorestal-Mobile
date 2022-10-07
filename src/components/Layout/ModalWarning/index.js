import React from "react";

import { useTheme } from "styled-components";
import { PrimaryButton } from "../../UI";
import Icon from "react-native-vector-icons/Feather";
import {
	ContainerRoot,
	Container,
	ContainerIcon,
	Modal,
	Title,
	ContainerContent,
	TextInfo
} from "./styles";

const ModalWarning = ({ message, isVisible, onConfirm }) => {

	const theme = useTheme();

	return (
		<Modal animationType='fade' transparent={true} visible={isVisible}>
			<ContainerRoot>
				<Container>
					<ContainerIcon>
						<Icon name='alert-circle' size={100} color={theme.colors.main["primary-v1"]}/>
					</ContainerIcon>
					<ContainerContent>
						<Title>Ooops!!</Title>
						<TextInfo>{message}</TextInfo>
						<PrimaryButton message="Confirmar" onPress={onConfirm}/>
					</ContainerContent>
				</Container>
			</ContainerRoot>
		</Modal>
	);
};

export { ModalWarning };
