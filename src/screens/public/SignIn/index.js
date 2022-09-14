import React, { useEffect, useState } from "react";
import packageJson from "../../../../package.json";
import MapboxGL from "@react-native-mapbox-gl/maps";
import firebase from "../../../shared/services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { ModalWarning } from "../../../components/Layout";
import { PrimaryButton, Logo, Input } from "../../../components/UI";
import { PERMISSION_LOCATION_USE } from "../../../constants";
import { authFormSchema } from "../../../shared/schemas/validation";
import { authActions, loadingActions } from "../../../store/actions";
import { Keyboard, StatusBar, TouchableWithoutFeedback } from "react-native";
import { ContainerForm, ContainerRoot, ContainerVersion, Form, LabelVersion } from "./styles";

const SignIn = () => {

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const { authenticateUser } = firebase();
	const { authentication } = authActions;
	const { enableLoading, disableLoading } = loadingActions;

	const isLoading = useSelector((state) => state.loading.isActive);

	const { control, clearErrors, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(authFormSchema)
	});

	const [showVersionLabel, setShowVersionLabel] = useState(true);
	const [showModalWarning, setShowModalWarning] = useState({ isVisible: false, message: "" });

	// Verificar permissões
	useEffect(() => {
		async function verifyPermission() {
			const permission = await requestPermission();

			if (permission) {
				await AsyncStorage.setItem(
					PERMISSION_LOCATION_USE,
					JSON.stringify(permission),
				);
			}
		}
		verifyPermission();
	}, []);

	//  Configurar exibição do modal de aviso
	useEffect(() => {
		if (Object.keys(errors).length !== 0) {
			if (errors.registration && errors.password) {
				setShowModalWarning({
					message: "Informe suas credenciais",
					isVisible: true
				});
			} else {
				const input = Object.keys(errors)[0];
				const message = errors[input] && errors[input].message;
				setShowModalWarning({ message, isVisible: true });
			}
		}
	}, [errors]);

	async function requestPermission() {
		return await MapboxGL.requestAndroidLocationPermissions();
	}

	async function onSubmit(data) {
		Keyboard.dismiss();
		setShowVersionLabel(true);
		dispatch(enableLoading("Verificando dados..."));

		const { registration, password } = data;

		try {
			const response = await authenticateUser(registration, password);

			dispatch(disableLoading());

			if (response.message)     // Error
				setShowModalWarning({ message: response.message, isVisible: true });
			else if (response.newUser)
				navigation.navigate("FirstLogin", { user: response.user });
			else if (response.user)
				dispatch(authentication(response.user));

		} catch (error) {
			dispatch(disableLoading());
			setShowModalWarning({ message: error.message, isVisible: true });
		}
	}

	function onKeyboardHide() {
		setShowVersionLabel(true);
		Keyboard.dismiss();
	}

	function onInputFocus(name) {
		setShowVersionLabel(false);

		if (errors[name])
			clearErrors(name);
	}

	function onConfirmModalHandler() {
		setShowModalWarning({ isVisible: false, message: "" });
	}

	/**
   * Evitar carregar a tela enquanto a verificação
   * do token do usuário está em andamento
   */
	if (isLoading) {
		return <></>;
	}

	return (
		<TouchableWithoutFeedback onPress={onKeyboardHide}>
			<ContainerRoot>
				<StatusBar barStyle='dark-content' backgroundColor='#FFF'/>
				<ModalWarning
					message={showModalWarning.message}
					isVisible={showModalWarning.isVisible}
					onConfirm={onConfirmModalHandler}
				/>

				<ContainerForm>
					<Logo/>

					<Form>
						<Input
							icon='user'
							label='matrícula'
							hasErrors={errors.registration}
							controller={{ name: "registration", control }}
							config={{
								keyboardType: "number-pad",
								onFocus: onInputFocus.bind(null, "registration")
							}}
						/>

						<Input
							icon='lock'
							label='Senha'
							hasErrors={errors.password}
							controller={{ name: "password", control }}
							config={{
								keyboardType: "default",
								secureTextEntry: true,
								onFocus: onInputFocus.bind(null, "password")
							}}
						/>
					</Form>

					<PrimaryButton message="Entrar" onPress={handleSubmit(onSubmit)}/>
				</ContainerForm>

				{showVersionLabel && (
					<ContainerVersion>
						<LabelVersion>{`Version ${packageJson.version}`}</LabelVersion>
					</ContainerVersion>
				)}
			</ContainerRoot>
		</TouchableWithoutFeedback>
	);
};

export default SignIn;
