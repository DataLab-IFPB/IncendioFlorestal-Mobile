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
		<Modal
			statusBarTranslucent
			animationType="fade"
			visible={status.isActive}
		>
			<Container>
				<Logo/>

				<ContainerIndicator>
					<ActivityIndicator size="small" color={theme.colors.main["primary-v1"]} />
				</ContainerIndicator>

				<Label>{status.message}</Label>
			</Container>
		</Modal>
	);
};

export { Loading };
