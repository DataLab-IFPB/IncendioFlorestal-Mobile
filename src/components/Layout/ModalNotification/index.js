import React from "react";
import { Modal } from "react-native";
import { Container, RootContainer, Label, Touchable, LabelButton } from "./styles";

const ModalNotification = ({ isVisible, message, onConfirm }) => {
	return(
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="fade"
		>
			<RootContainer>
				<Container>
					<Label>{message}</Label>
					<Touchable onPress={onConfirm}>
						<LabelButton>Ok</LabelButton>
					</Touchable>
				</Container>
			</RootContainer>

		</Modal>
	);
};

export { ModalNotification };
