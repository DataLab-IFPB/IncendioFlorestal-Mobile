import React, { Fragment, useState } from "react";
import firebase from "../../../shared/services/firebase";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../../store/actions";
import { useNetInfo } from "@react-native-community/netinfo";
import { watermelonDB } from "../../../shared/services/watermelonDB";
import { RECORDER_ROUTER_INITIAL_COORDINATES } from "../../../constants";
import { Container, Label, TouchableCancel, TouchableEnd, TouchableStart } from "./styles";

const RecorderButton = ({ currentCoordinates, userRegistration, uidFireIndice, onCancel }) => {
	const dispatch = useDispatch();
	const netInfo = useNetInfo();

	const { registerNewTrail } = firebase();
	const { saveTrailOffline } = watermelonDB().trailManagerDB();
	const { enableLoading, disableLoading } = loadingActions;
	const [configDisplay, setConfigDisplay] = useState({ start: true, end: false });

	function handleStartRecorderTrail() {
		AsyncStorage.setItem(
			RECORDER_ROUTER_INITIAL_COORDINATES,
			JSON.stringify(currentCoordinates)
		);
		setConfigDisplay({ start: false, end: true });
	}

	async function handleEndRecorderTrail() {
		dispatch(enableLoading("Salvando trilha..."));
		setConfigDisplay({ start: false, end: false });

		const data = {
			initial_coordinates: JSON.parse(
				await AsyncStorage.getItem(RECORDER_ROUTER_INITIAL_COORDINATES)
			),
			end_coordinates: currentCoordinates
		};

		if (netInfo.isConnected) {
			await registerNewTrail(uidFireIndice, userRegistration, data);
		} else {
			await saveTrailOffline(data, uidFireIndice);
		}

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
					<TouchableStart onPress={handleStartRecorderTrail}>
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
					<TouchableEnd onPress={handleEndRecorderTrail}>
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

export default RecorderButton;
