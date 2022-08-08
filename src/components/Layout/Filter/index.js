import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { Modal } from "react-native";
import { useDispatch } from "react-redux";
import { Logo, ModalButton } from "../../UI";
import { firesIndicesActions } from "../../../store/actions";
import {
	RootContainer,
	Container,
	ContainerSlider,
	ContainerOptions,
	Label,
	LabelSlider
} from "./styles";

const Filter = ({ visible, closeModal, filterDays, onUpdateDaysSlider }) => {

	const dispatch = useDispatch();

	const { filterFireIndices } = firesIndicesActions;

	const [days, setDays] = useState(filterDays);
	const [initialized, setInitialized] = useState(false);

	function filterIndices() {
		onUpdateDaysSlider(days);
		dispatch(filterFireIndices({ days }));
		closeModal();
	}

	function updateDaysHandler(days) {
		if (initialized)
			setDays(days);

		setInitialized(true);
	}

	return (
		<Modal transparent={true} visible={visible} animationType={"fade"}>
			<RootContainer>
				<Container>

					<Logo/>

					<Label>{"Filtrar Registros\nde incêndios"}</Label>

					<ContainerSlider>
						<LabelSlider>
							{`${days} ${days === 1 ? "dia" : "dias"}`}
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
						<ModalButton highlighted message="filtrar" onPress={filterIndices}/>
						<ModalButton message="cancelar" onPress={closeModal}/>
					</ContainerOptions>

				</Container>
			</RootContainer>
		</Modal>
	);
};

export default Filter;
