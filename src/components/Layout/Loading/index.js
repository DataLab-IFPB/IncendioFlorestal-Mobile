import React from "react";
import { useSelector } from "react-redux";
import { Logo } from "../../UI";
import { Label, Container, ContainerIndicator } from "./styles";
import { Modal, ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

const Loading = () => {

	const theme = useTheme();
	const status = useSelector((state) => state.loading);

	return(
		<Modal animationType='fade' visible={status.isActive} statusBarTranslucent>
			<Container>
				<Logo/>

				<ContainerIndicator>
					<ActivityIndicator size='small' color={theme.colors.primary}/>
				</ContainerIndicator>

				<Label>{status.message}</Label>
			</Container>
		</Modal>
	);
};

export default Loading;
