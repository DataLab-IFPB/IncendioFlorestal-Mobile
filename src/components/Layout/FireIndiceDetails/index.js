import React, { useEffect, useState } from "react";
import { Modal } from "react-native";
import AddEvidence from "../AddEvidence";
import ModalConfirmation from "../ModalConfirmation";
import Feather from "react-native-vector-icons/Feather";
import StepIndicator from "react-native-step-indicator";
import firebase from "../../../shared/services/firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { ActionButton } from "../../UI";
import { useDispatch } from "react-redux";
import { ContainerInfo } from "../Forecast/styles";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { weather } from "../../../shared/services/weather";
import { useNetInfo } from "@react-native-community/netinfo";
import { formatDatetime, formatUTC } from "../../../shared/utils/formatDate";
import { firesIndicesActions, loadingActions } from "../../../store/actions";
import { watermelonDB } from "../../../shared/services/watermelonDB";
import {
	RootContainer,
	Container,
	ContainerIcon,
	ContainerWeather,
	ContainerDataWeather,
	Label,
	Space,
	ContainerOptions,
	Button,
	LabelButton,
	ContainerStepIndicador,
	statusIndicador,
} from "./styles";

const FirefireIndiceDetails = ({ fireIndice, isVisible, onClose }) => {
	const theme = useTheme();
	const netInfo = useNetInfo();
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const ICON_SIZE = 20;
	const LABELS_STATUS = ["Registrado", "Em Atendimento", "Finalizado"];

	const { getForecast } = weather();
	const { updateStatusOffline } = watermelonDB().fireIndiceManagerDB();
	const { updateStatusFireIndice, getFiresIndices } = firebase();
	const { loadFireIndices, updateFireIndice } = firesIndicesActions;
	const { enableLoading, disableLoading } = loadingActions;

	const [currentWeather, setCurrentWeather] = useState();
	const [currentStatus, setCurrentStatus] = useState(0);
	const [configModal, setConfigModal] = useState({ show: false, message: "", data: null });

	// Obter dados climáticos
	useEffect(() => {
		const loadForecast = async () => {
			if (fireIndice)
				setCurrentWeather(await getForecast(fireIndice.latitude, fireIndice.longitude));
		};

		if (netInfo.isConnected)
			loadForecast();
	}, [netInfo.isConnected, fireIndice]);

	// Obter status atual
	useEffect(() => {
		Object.values(fireIndice.status).forEach((status, index) => {
			if (status)
				setCurrentStatus(index);
		});
	}, []);

	function openGallery() {
		onClose();
		navigation.navigate("Gallery", { fireIndice });
	}

	function openTrailManager() {
		onClose();
		navigation.navigate("TrailManager", { fireIndice });
	}

	function updateStatusHandler(position) {
		const status = { ...fireIndice.status };

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

		const status = { ...fireIndice.status };

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
			await updateStatusFireIndice(fireIndice.uid, status);
			const firesIndicesUpdated = await getFiresIndices();
			dispatch(loadFireIndices(firesIndicesUpdated));
		} else {
			await updateStatusOffline(fireIndice.id, JSON.stringify(status));
			dispatch(updateFireIndice({ ...fireIndice, status }));
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

	return (
		<Modal transparent animationType="slide" visible={isVisible}>
			<RootContainer>

				<ModalConfirmation
					isVisible={configModal.show}
					message={configModal.message}
					onConfirm={onConfirmUpdateStatus.bind(null, configModal.data)}
					onCancel={onCancelUpdateStatus}
				/>

				<Container>
					<ActionButton icon='close' onPress={onClose}/>

					<ContainerIcon>
						<SimpleLineIcons
							name='fire'
							size={50}
							color={fireIndice.userCreated ? theme.colors.icon.secondary : theme.colors.icon.primary}
						/>
					</ContainerIcon>

					<Label>Registrado em:</Label>
					<Label isBold>{formatUTC(fireIndice.status.registered_at.split(" ")[0])}</Label>

					<Space size={10}/>

					<Label>Ocorreu de:</Label>
					<Label isBold>
						{
							fireIndice.daynight === "D" ? (
								<Fontisto name='day-sunny' size={40}/>
							) : (
								<Feather name='moon' size={40}/>
							)
						}
					</Label>

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
							<ContainerInfo>
								<FontAwesome name='wind' color='#010101' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.wind_kph + " KM/H" : "-"}</Label>
							</ContainerInfo>

							<ContainerInfo>
								<Ionicons name='thermometer-outline' color='red' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.temp_c + "°C" : "-"}</Label>
							</ContainerInfo>

							<ContainerInfo>
								<Ionicons name='water-outline' color='blue' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.humidity + "%" : "-"}</Label>
							</ContainerInfo>

							<ContainerInfo>
								<Ionicons name='thunderstorm-outline' color='skyblue' size={ICON_SIZE}/>
								<Label>{currentWeather ? currentWeather.precip_in + "%" : "-"}</Label>
							</ContainerInfo>
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
					<AddEvidence fireIndice={fireIndice}/>

				</Container>
			</RootContainer>
		</Modal>
	);
};

export { FirefireIndiceDetails };
