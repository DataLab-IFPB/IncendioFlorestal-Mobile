import React from "react";
import { Logo, ModalButton } from "../../UI";
import { Modal, TextInput } from "react-native";
import { Container, RootContainer, ContainerOptions, Label } from "../Filter/styles";

const ModalInput = ({ isVisible, label, message, onCancel, onConfirm, onChangeText, keyboardType }) => {
	return (
		<Modal visible={isVisible} transparent={true} animationType='fade'>
			<RootContainer>
				<Container>
					<Logo/>

					<Label>{message}</Label>

					<TextInput 
						style={{ color: 'black', fontSize: 18, borderColor: 'black', borderWidth: 1, borderEndWidth: 10 }}
						autoFocus={true}
						textAlign='center'
						placeholder={label}
						keyboardType={keyboardType}
						onChangeText={onChangeText}
						onSubmitEditing={onConfirm}
					/>

					<ContainerOptions>
						<ModalButton highlighted message="confirmar" onPress={onConfirm} />
						<ModalButton message="cancelar" onPress={onCancel} />
					</ContainerOptions>
				</Container>
			</RootContainer>
		</Modal>
	);
};

export { ModalInput };
