import React from "react";
import { Logo, ButtonModal } from "../../UI";
import { Modal } from "react-native";
import { Container, RootContainer, ContainerOptions, Label } from "../Filter/styles";

const ModalNewFireIndice = ({ isVisible, message, onCancel, onConfirm }) => {
	return (
		<Modal visible={isVisible} transparent={true} animationType='fade'>
			<RootContainer>
				<Container>
					<Logo/>

					<Label>{message}</Label>

					<ContainerOptions>
						<ButtonModal highlighted message="confirmar" onPress={onConfirm}/>
						<ButtonModal message="cancelar" onPress={onCancel}/>
					</ContainerOptions>
				</Container>
			</RootContainer>
		</Modal>
	);
};

export default ModalNewFireIndice;
