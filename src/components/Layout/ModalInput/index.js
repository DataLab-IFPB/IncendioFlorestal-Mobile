import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { areaNameFormSchema } from "../../../shared/schemas/validation";
import { Logo, ModalButton, Input } from "../../UI";
import { Modal, Keyboard } from "react-native";
import {
	Container,
	RootContainer,
	ContainerInput,
	ContainerOptions,
	Label,
	Error,
} from "./styles";

const ModalInput = ({ message, label, onCancel, onConfirm }) => {

	const { control, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(areaNameFormSchema)
	});

	useEffect(() => {
	}, []);

	function onSubmit(data) {
		Keyboard.dismiss();
		const { areaName } = data;
		onConfirm(areaName);
	}

	return (
		<Modal transparent={true} animationType='fade'>
			<RootContainer>
				<Container>
					<Logo/>

					<Label>{message}</Label>

					<ContainerInput>
						<Input
							label={label}
							controller={{ name: "areaName", control }}
							attributes={{ autoFocus: true }}
							config={{
								keyboardType: "default"
							}}
						/>
						{errors.areaName && <Error>{errors.areaName.message}</Error>}
					</ContainerInput>

					<ContainerOptions>
						<ModalButton
							highlighted
							message="confirmar"
							onPress={handleSubmit(onSubmit)}
						/>
						<ModalButton message="cancelar" onPress={onCancel} />
					</ContainerOptions>
				</Container>
			</RootContainer>
		</Modal>
	);
};

export { ModalInput };
