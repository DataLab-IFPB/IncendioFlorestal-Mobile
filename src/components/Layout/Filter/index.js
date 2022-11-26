import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Slider from "react-native-slider";

import { firesActions } from "../../../store/actions";

import { Modal } from "react-native";
import { Logo, ModalButton } from "../../UI";
import {
	RootContainer,
	Container,
	ContainerSlider,
	ContainerOptions,
	Label,
	LabelSlider
} from "./styles";

const Filter = ({
	closeModal,
	filterDays,
	onUpdateDaysSlider
}) => {

	const dispatch = useDispatch();

	const { fireFilter } = firesActions;

	const [days, setDays] = useState(filterDays);
	const [load, setLoad] = useState(false);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		if (load) {
			onUpdateDaysSlider(days);
			dispatch(fireFilter({ days }));
			closeModal();
			setLoad(false);
		}
	}, [load]);

	function handleUpdateDays(days) {
		if (initialized) {
			setDays(days);
		}
		setInitialized(true);
	}

	return (
		<Modal
			transparent={true}
			visible
			animationType="fade"
			onRequestClose={closeModal}
		>
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
							thumbTintColor="#454545"
							minimumTrackTintColor='#454545'
							maximumTrackTintColor='#454545'
							value={filterDays}
							onValueChange={handleUpdateDays}
						/>
					</ContainerSlider>

					<ContainerOptions>
						<ModalButton
							highlighted
							message="filtrar"
							load={load}
							onPress={() => setLoad(true)}
						/>
						<ModalButton message="cancelar" onPress={closeModal}/>
					</ContainerOptions>

				</Container>
			</RootContainer>
		</Modal>
	);
};

export { Filter };
