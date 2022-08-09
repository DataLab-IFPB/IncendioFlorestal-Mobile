import React from "react";
import { Logo } from "../../UI";
import { useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { Modal, ActivityIndicator } from "react-native";
import { Label, Container, ContainerIndicator } from "./styles";

const Loading = () => {

	const theme = useTheme();
	const status = useSelector((state) => state.loading);

	return(
		<Modal animationType='fade' visible={status.isActive} statusBarTranslucent>
			<Container>
				<Logo/>

				<ContainerIndicator>
					<ActivityIndicator size='small' color={theme.colors.main.primary}/>
				</ContainerIndicator>

				<Label>{status.message}</Label>
			</Container>
		</Modal>
	);
};

export { Loading };
