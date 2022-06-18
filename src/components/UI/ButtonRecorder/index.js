import React, { Fragment, useState } from "react";
import firebase from "../../../shared/services/firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../../store/actions";
import { RECORDER_ROUTER_INITIAL_COORDINATES } from "../../../constants";
import { Container, Label, TouchableCancel, TouchableEnd, TouchableStart } from "./styles";

const ButtonRecorder = ({ currentCoordinates, userRegistration, uidFireIndice, onCancel }) => {

	const dispatch = useDispatch();

	const { registerNewTrail } = firebase();
	const { enableLoading, disableLoading } = loadingActions;
	const [configDisplay, setConfigDisplay] = useState({ start: true, end: false });

	function startRecorderTrailHandler() {
		AsyncStorage.setItem(
			RECORDER_ROUTER_INITIAL_COORDINATES,
			JSON.stringify(currentCoordinates)
		);
		setConfigDisplay({ start: false, end: true });
	}

	async function endRecorderTrailHandler() {
		dispatch(enableLoading("Salvando trilha..."));
		setConfigDisplay({ start: false, end: false });

		const data = {
			initial_coordinates: JSON.parse(await AsyncStorage.getItem(RECORDER_ROUTER_INITIAL_COORDINATES)),
			end_coordinates: currentCoordinates
		};

		await registerNewTrail(uidFireIndice, userRegistration, data);
		cancelHandler();
		dispatch(disableLoading());
	}

	function cancelHandler() {
		AsyncStorage.removeItem(RECORDER_ROUTER_INITIAL_COORDINATES);
		onCancel();
	}

	return (
		<Container>
			{configDisplay.start && (
				<Fragment>
					<TouchableStart onPress={startRecorderTrailHandler}>
						<Label>
							{/* eslint-disable-next-line quotes */}
							<FontAwesome name="play"/>{`  `}
							INICIAR TRILHA
						</Label>
					</TouchableStart>
					<TouchableCancel onPress={cancelHandler}>
						<Label>
							<AntDesign name="close" size={20}/>
						</Label>
					</TouchableCancel>
				</Fragment>
			)}

			{configDisplay.end && (
				<Fragment>
					<TouchableEnd onPress={endRecorderTrailHandler}>
						<Label>
							{/* eslint-disable-next-line quotes */}
							<FontAwesome name="stop"/>{`   `}
							FINALIZAR TRILHA
						</Label>
					</TouchableEnd>
				</Fragment>
			)}
		</Container>
	);
};

export default ButtonRecorder;
