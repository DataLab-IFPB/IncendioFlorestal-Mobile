import React, { useState } from "react";
import { Controller } from "react-hook-form";

import { useTheme } from "styled-components";
import Icon from "react-native-vector-icons/Feather";
import {
	Field,
	Label,
	Container,
	ContainerInput,
	ContainerIcon,
	ButtonShowPassword
} from "./styles";

const Input = ({
	icon,
	label,
	hasErrors,
	config,
	controller,
	attributes
}) => {

	const theme = useTheme();
	const [showPassword, setShowPassword] = useState(false);
	const [iconViewPasswordText, setIconViewPasswordText] = useState("eye");

	const changeTextDisplayHandler = () => {
		setShowPassword((currentState) => !currentState);
		setIconViewPasswordText((currentIcon) => currentIcon === "eye" ? "eye-off" : "eye");
	};

	return(
		<Container>
			<Label>{label ? label + ":" : ""}</Label>
			<ContainerInput isValid={!!hasErrors}>
				<ContainerIcon>
					<Icon name={icon} size={25} color={theme.colors.text["primary-v1"]}/>
				</ContainerIcon>
				<Controller
					name={controller.name}
					control={controller.control}
					render={({ field: { onChange, value } }) => (
						<Field
							{...config}
							{...(showPassword ? {secureTextEntry: false} : {secureTextEntry: true})}
							{...(config.secureTextEntry === undefined && {secureTextEntry: false})}
							{...attributes}
							autoComplete={false}
							autoCorrect={false}
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>

				{config.secureTextEntry && (
					<ButtonShowPassword onPress={changeTextDisplayHandler}>
						<Icon
							name={iconViewPasswordText}
							size={20}
							color={theme.colors.text["primary-v1"]}
						/>
					</ButtonShowPassword>
				)}
			</ContainerInput>
		</Container>
	);
};

export { Input };
