import React from "react";
import { Logo, ModalButton } from "../../UI";
import { Modal } from "react-native";
import { Container, RootContainer, ContainerOptions, Label } from "../Filter/styles";

const ModalConfirmation = ({ isVisible, message, onCancel, onConfirm }) => {
	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="fade"
		>
			<RootContainer>
				<Container>
					<Logo/>
					<Label>{message}</Label>

					<ContainerOptions>
						<ModalButton highlighted message="confirmar" onPress={onConfirm} />
						<ModalButton message="cancelar" onPress={onCancel} />
					</ContainerOptions>
				</Container>
			</RootContainer>
		</Modal>
	);
};

export { ModalConfirmation };
