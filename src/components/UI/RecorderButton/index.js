import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNetInfo } from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { START_COORDINATES } from "../../../constants";
import firebase from "../../../shared/services/firebase";
import { loaderActions } from "../../../store/actions";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {
	Container,
	Label,
	TouchableCancel,
	TouchableEnd,
	TouchableStart
} from "./styles";
import { saveTrailOffline } from "../../../shared/services/realm";

const RecorderButton = ({
	currentCoordinates,
	userRegistration,
	fireId,
	onCancel
}) => {
	const dispatch = useDispatch();
	const netInfo = useNetInfo();

	const { registerNewTrail } = firebase();
	const { enableLoading, disableLoading } = loaderActions;
	const [configDisplay, setConfigDisplay] = useState({ start: true, end: false });

	function handleStartRecorderTrail() {
		AsyncStorage.setItem(
			START_COORDINATES,
			JSON.stringify(currentCoordinates)
		);
		setConfigDisplay({ start: false, end: true });
	}

	async function handleEndRecorderTrail() {
		dispatch(enableLoading("Salvando trilha..."));
		setConfigDisplay({ start: false, end: false });

		const data = {
			start_coordinates: JSON.parse(
				await AsyncStorage.getItem(START_COORDINATES)
			),
			end_coordinates: currentCoordinates
		};

		if (netInfo.isConnected) {
			await registerNewTrail(fireId, userRegistration, data);
		} else {
			saveTrailOffline({
				fireId,
				...data
			});
		}

		handleCancel();
		dispatch(disableLoading());
	}

	function handleCancel() {
		AsyncStorage.removeItem(START_COORDINATES);
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
					<TouchableCancel onPress={handleCancel}>
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

export { RecorderButton };
