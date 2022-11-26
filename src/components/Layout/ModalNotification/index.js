import React, { useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

import { Modal } from "react-native";
import {
	Container,
	RootContainer,
	Label,
	Touchable,
	LabelButton
} from "./styles";

const ModalNotification = () => {

	const netInfo = useNetInfo();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		if (netInfo.isConnected !== null && !netInfo.isConnected) {
			setVisible(true);
		}
	}, [netInfo]);

	return(
		<Modal
			visible={visible}
			transparent={true}
			animationType="fade"
		>
			<RootContainer>
				<Container>
					<Label>{
						`Sem Conexão!
						\nTodos os registros cadastrados manualmente serão enviado para a base de dados ao se conectar novamente.`
					}</Label>
					<Touchable onPress={() => setVisible(false)}>
						<LabelButton>Ok</LabelButton>
					</Touchable>
				</Container>
			</RootContainer>

		</Modal>
	);
};

export { ModalNotification };
