import React, { useEffect, useState } from "react";
import StepIndicator from "react-native-step-indicator";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useNetInfo } from "@react-native-community/netinfo";

import firebase from "../../../shared/services/firebase";
import weather from "../../../shared/services/weather";
import { formatDatetime, formatUTC } from "../../../shared/utils/formatDate";
import { updateFireStatusOfflice } from "../../../shared/services/realm";
import { firesActions, loaderActions } from "../../../store/actions";

import { AddEvidence } from "../AddEvidence";
import { ModalConfirmation } from "../ModalConfirmation";
import { useTheme } from "styled-components/native";
import { ActionButton } from "../../UI";
import { Modal } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
	RootContainer,
	Container,
	ContainerIcon,
	ContainerWeather,
	ContainerDataWeather,
	Label,
	Info,
	Space,
	ContainerOptions,
	Button,
	LabelButton,
	ContainerStepIndicador,
	statusIndicador,
} from "./styles";

const FireDetails = ({ fire, onClose }) => {
	const theme = useTheme();
	const netInfo = useNetInfo();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const ICON_SIZE = 20;
	const LABELS_STATUS = ["Registrado", "Em Atendimento", "Finalizado"];

	const { getForecast } = weather();
	const { updateStatusFireIndice, getFiresIndices } = firebase();
	const { loadFires, updateFire } = firesActions;
	const { enableLoading, disableLoading } = loaderActions;

	const [currentWeather, setCurrentWeather] = useState();
	const [currentStatus, setCurrentStatus] = useState(0);
	const [configModal, setConfigModal] = useState({ show: false, message: "", data: null });

	// Obter dados climáticos
	useEffect(() => {
		const loadForecast = async () => {
			if (fire)
				setCurrentWeather(await getForecast(fire.latitude, fire.longitude));
		};

		if (netInfo.isConnected)
			loadForecast();
	}, [netInfo.isConnected, fire]);

	// Obter status atual
	useEffect(() => {
		Object.values(fire.status).forEach((status, index) => {
			if (status)
				setCurrentStatus(index);
		});
	}, []);

	function openGallery() {
		onClose();
		navigation.navigate("Gallery", { fire });
	}

	function openTrailManager() {
		onClose();
		navigation.navigate("TrailManager", { fire });
	}

	function updateStatusHandler(position) {
		const status = { ...fire.status };

		Object.keys(status).forEach((key, index) => {
			if (index === position && position > currentStatus) {
				if (!status[key]) {
					setConfigModal({
						show: true,
						message: `Deseja atualizar o status para "${LABELS_STATUS[position]}?"`,
						data: position
					});
				}
			}
		});
	}

	/**
	 * @param  position : [0] -> registrado, [1] -> em atendimento e [2] -> finalizado
	 */
	async function onConfirmUpdateStatus(position) {
		dispatch(enableLoading("Atualizando status..."));

		const status = { ...fire.status };

		const update = (key, index) => {
			status[key] = formatDatetime(new Date());
			setCurrentStatus(index);
		};

		Object.keys(status).forEach((key, index) => {
			if (index === position) {
				update(key, index);
			} else if( index === (position - 1) && !status[key] ) {
				update(key, index);
			}
		});

		if (netInfo.isConnected) {
			await updateStatusFireIndice(fire.id, status);
			const firesIndicesUpdated = await getFiresIndices();
			dispatch(loadFires(firesIndicesUpdated));
		} else {
			updateFireStatusOfflice(fire.id, JSON.stringify(status));
			dispatch(updateFire({ ...fire, status }));
		}

		onCancelUpdateStatus();
		dispatch(disableLoading());
	}

	function onCancelUpdateStatus() {
		setConfigModal({
			show: false,
			message: "",
			data: null
		});
	}

	const pickColor = () => {
		if (fire.status.finished_at) {
			return theme.colors.icon["accent-color-v5"];
		} else if (fire.status.in_attendance_at) {
			return theme.colors.icon["accent-color-v4"];
		} else if (fire.userCreated) {
			return theme.colors.icon["accent-color-v2"];
		} else if (fire.brightness >= 500) {
			return theme.colors.icon["accent-color-v1"];
		} else {
			return theme.colors.icon["accent-color-v3"];
		}
	}

	return (
		<Modal transparent animationType="slide" visible onRequestClose={onClose}>
			<RootContainer>
				{configModal.show && (
					<ModalConfirmation
						isVisible={configModal.show}
						message={configModal.message}
						onConfirm={onConfirmUpdateStatus.bind(null, configModal.data)}
						onCancel={onCancelUpdateStatus}
					/>
				)}

				<Container>
					<ActionButton icon='close' onPress={onClose}/>

					<ContainerIcon>
						<SimpleLineIcons
							name='fire'
							size={50}
							color={pickColor()}
						/>
					</ContainerIcon>

					<Label>Registrado em:</Label>
					<Label isBold>{formatUTC(fire.status.registered_at.split(" ")[0])}</Label>

					<Space size={10}/>

					<Label>Ocorreu às: {fire.status.registered_at.split(" ")[1]}</Label>

					<ContainerStepIndicador>
						<StepIndicator
							customStyles={statusIndicador}
							stepCount={3}
							currentPosition={currentStatus}
							labels={LABELS_STATUS}
							onPress={updateStatusHandler}
						/>
					</ContainerStepIndicador>

					<ContainerWeather>
						<Space size={10}/>
						<Label>Local: {currentWeather ? currentWeather.locale : "Não identificado"}</Label>

						<ContainerDataWeather>
							<Info>
								<FontAwesome name='wind' color='#010101' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.wind_kph + " KM/H" : "-"}</Label>
							</Info>

							<Info>
								<Ionicons name='thermometer-outline' color='red' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.temp_c + "°C" : "-"}</Label>
							</Info>

							<Info>
								<Ionicons name='water-outline' color='blue' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.humidity + "%" : "-"}</Label>
							</Info>

							<Info>
								<Ionicons name='thunderstorm-outline' color='skyblue' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.precip_in + "%" : "-"}</Label>
							</Info>
						</ContainerDataWeather>
					</ContainerWeather>

					<ContainerOptions>
						<Button onPress={openGallery}>
							<LabelButton>Galeria</LabelButton>
						</Button>

						<Button onPress={openTrailManager}>
							<LabelButton>Trilhas</LabelButton>
						</Button>
					</ContainerOptions>

					<Space size={8}/>

					<Label isBold>Adicionar Evidências</Label>
					<AddEvidence fire={fire}/>

				</Container>
			</RootContainer>
		</Modal>
	);
};

export { FireDetails };
