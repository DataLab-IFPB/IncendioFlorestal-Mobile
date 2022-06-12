import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { Logo, ButtonModal } from "../../UI";
import { Modal, useWindowDimensions } from "react-native";
import {
	RootContainer,
	Container,
	ContainerOptions,
	ContainerSlider,
	Label,
	LabelSlider
} from "./styles";

const Filter = ({ visible, closeModal, filterDays, onUpdateDaysSlider }) => {

	const { width } = useWindowDimensions();
	const [days, setDays] = useState(filterDays);
	const [initialized, setInitialized] = useState(false);

	function filterIndices() {
		onUpdateDaysSlider(days);
		closeModal();
	}

	function updateDaysHandler(days) {

		if( initialized ) {
			setDays(days);
		}

		setInitialized(true);
	}

	return (
		<Modal transparent={true} visible={visible} animationType={"fade"}>
			<RootContainer>
				<Container>

					<Logo dimension={(width * 0.2)}/>

					<Label>{"Filtrar Registros\nde incêndios"}</Label>

					<ContainerSlider>
						<LabelSlider>
							{`${days} ${days === 1 ? "dia:" : "dias:"}`}
						</LabelSlider>
						<Slider
							step={1}
							minimumValue={1}
							maximumValue={2}
							style={{width: "100%"}}
							thumbTintColor={"#000"}
							minimumTrackTintColor='#000'
							maximumTrackTintColor='#000'
							value={filterDays}
							onValueChange={updateDaysHandler}
						/>
					</ContainerSlider>

					<ContainerOptions>
						<ButtonModal highlighted message="filtrar" onPress={filterIndices}/>
						<ButtonModal message="cancelar" onPress={closeModal}/>
					</ContainerOptions>

				</Container>
			</RootContainer>
		</Modal>
	);
};

export default Filter;
