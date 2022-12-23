import React from "react";

import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import { ModalButton } from "../../UI";
import { useTheme } from "styled-components";
import { Modal } from "react-native";
import {
	RootContainer,
	ContainerOptions
} from "../Filter/styles";
import {
	Container,
	LegendContainer,
	Legend,
	Label
} from "./styles";

const ModalFireLegend = ({
	isVisible,
	onClose
}) => {
	const theme = useTheme();

	return (
		<Modal
			visible={isVisible}
			transparent={true}
			animationType="fade"
			onRequestClose={onClose}
		>
			<RootContainer>
				<Container>

					<LegendContainer>
						<Legend>
							<IconSimple
								name='fire'
								size={30}
								color={theme.colors.icon["accent-color-v1"]}
							/>
							<Label>{"Registro automático (FIRMS)"}</Label>

						</Legend>

						<Legend>
							<IconSimple
								name='fire'
								size={30}
								color={theme.colors.icon["accent-color-v2"]}
							/>
							<Label>{"Registro manual"}</Label>
						</Legend>

						<Legend>
							<IconSimple
								name='fire'
								size={30}
								color={theme.colors.icon["accent-color-v4"]}
							/>
							<Label>{"Em andamento"}</Label>
						</Legend>

						<Legend>
							<IconSimple
								name='fire'
								size={30}
								color={theme.colors.icon["accent-color-v5"]}
							/>
							<Label>{"Finalizado"}</Label>
						</Legend>
					</LegendContainer>

					<ContainerOptions>
						<ModalButton highlighted message="OK" onPress={onClose} />
					</ContainerOptions>
				</Container>
			</RootContainer>
		</Modal>
	);
};

export { ModalFireLegend };
