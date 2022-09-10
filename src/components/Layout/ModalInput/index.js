import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { areaNameFormSchema } from "../../../shared/schemas/validation";
import { Logo, ModalButton, Input } from "../../UI";
import { Modal, Keyboard } from "react-native";
import { Container, RootContainer, ContainerOptions, Label } from "../Filter/styles";

const ModalInput = ({ isVisible, message, label, onCancel, onConfirm}) => {

	const { control, handleSubmit } = useForm({
		resolver: yupResolver(areaNameFormSchema)
	});

	function onSubmit(data) {
		Keyboard.dismiss();
		const { areaName } = data;
		onConfirm(areaName);
	}

	return (
		<Modal visible={isVisible} transparent={true} animationType='fade'>
			<RootContainer>
				<Container>
					<Logo/>

					<Label>{message}</Label>

					<Input
						label={label}
						controller={{ name: "areaName", control }}
						config={{
							keyboardType: "default"
						}}
					/>

					<ContainerOptions>
						<ModalButton highlighted message="confirmar" onPress={handleSubmit(onSubmit)} />
						<ModalButton message="cancelar" onPress={onCancel} />
					</ContainerOptions>
				</Container>
			</RootContainer>
		</Modal>
	);
};

export { ModalInput };
