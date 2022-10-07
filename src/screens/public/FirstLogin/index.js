import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRoute, useNavigation } from "@react-navigation/native";

import firebase from "../../../shared/services/firebase";
import { loadingActions } from "../../../store/actions";
import { changePasswordFormSchema } from "../../../shared/schemas/validation";

import { Container, Info, Title } from "./styles";
import { ModalWarning } from "../../../components/Layout";
import { PrimaryButton, Input, Logo } from "../../../components/UI";
import { BackHandler, Keyboard, TouchableWithoutFeedback } from "react-native";

const FirstLogin = () => {

	const dispatch = useDispatch();
	const route = useRoute();
	const navigation = useNavigation();

	const { enableLoading, disableLoading } = loadingActions;

	const { registerNewUser } = firebase();
	const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
		resolver: yupResolver(changePasswordFormSchema)
	});

	const [showModalWarning, setShowModalWarning] = useState(
		{ isVisible: false, message: "" }
	);

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			return true;
		});
	}, []);

	//  Configurar exibição do modal de aviso para erros nos inputs
	useEffect(() => {
		if (Object.keys(errors).length !== 0) {
			if (errors.password)
				setShowModalWarning({ message: errors.password.message, isVisible: true });
			else if (errors.passwordConfirm)
				setShowModalWarning({ message: errors.passwordConfirm.message, isVisible: true });
		}
	}, [errors]);

	function onConfirmModalHandler() {
		setShowModalWarning({ message: "", isVisible: false });
	}

	function onInputFocus(name) {
		if (errors[name])
			clearErrors(name);
	}

	async function onSubmit(data) {

		dispatch(enableLoading("Atualizando cadastro..."));

		const { password } = data;
		const { user } = route.params;

		try {
			await registerNewUser(password, user);
			dispatch(disableLoading());
			navigation.navigate("SignIn");
		} catch (error) {
			setShowModalWarning({ message: error.message, isVisible: true });
		}

		dispatch(disableLoading());
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<ModalWarning
					message={showModalWarning.message}
					isVisible={showModalWarning.isVisible}
					onConfirm={onConfirmModalHandler}
				/>

				<Logo/>

				<Title>
					{"Este é o seu primeiro login \nPor favor, altere sua senha para prosseguir"}
				</Title>

				<Info>
					{"A nova senha deve conter \nno mínimo 6 e no máximo 16 caracteres"}
				</Info>

				<Input
					icon='lock'
					label='Senha'
					controller={{ name: "password", control }}
					hasErrors={errors.password}
					config={{
						keyboardType: "default",
						secureTextEntry: true,
						onFocus: onInputFocus.bind(null, "password")
					}}
				/>

				<Input
					icon='lock'
					label='Confirmar senha'
					controller={{ name: "passwordConfirm", control }}
					hasErrors={errors.passwordConfirm}
					config={{
						keyboardType: "default",
						secureTextEntry: true,
						onFocus: onInputFocus.bind(null, "passwordConfirm")
					}}
				/>

				<PrimaryButton message="Alterar" onPress={handleSubmit(onSubmit)}/>
			</Container>
		</TouchableWithoutFeedback>
	);
};

export default FirstLogin;
