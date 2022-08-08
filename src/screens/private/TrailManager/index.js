import React, { useEffect, useState } from "react";
import trail from "../../../shared/services/trail";
import firebase from "../../../shared/services/firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/actions";
import { useNetInfo } from "@react-native-community/netinfo";
import { PrimaryButton, ActionButton } from "../../../components/UI";
import { ContainerInfo } from "../../../components/Layout/Forecast/styles";
import { ModalConfirmation, ModalWarning } from "../../../components/Layout";
import {
	RootContainer,
	ContainerOptions,
	ContainerTrails,
	Label,
	Card,
	Touchable,
	Content,
	LineVertical,
	LineHorizontal,
	ContainerWarning,
	Header,
	Title
} from "./styles";
import { watermelonDB } from "../../../shared/services/watermelonDB";

const TrailManager = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const netInfo = useNetInfo();

	const { fireIndice } = route.params;
	const { getTrails, removeTrail } = firebase();
	const { fetchTrailsOffline, deleteTrailOffline } = watermelonDB().trailManagerDB();
	const { fetchDirections } = trail();
	const { enableLoading, disableLoading } = loadingActions;

	const [trails, setTrails] = useState([]);
	const [error, setError] = useState("");
	const [configModal, setConfigModal] = useState({
		show: false,
		message: "",
		data: null
	});

	const user = useSelector((state) => state.auth);

	useEffect(() => {
		if ( netInfo.isConnected !== null) {
			if (trails.length === 0 && netInfo.isConnected) {
				loadTrails();
			} else {
				loadTrailsOffline();
			}
		}
	}, [netInfo.isConnected]);

	async function loadTrails() {
		dispatch(enableLoading("Carregando dados..."));
		const data = await getTrails(fireIndice.uid);

		if (data) {
			Object.keys(data).forEach((key) => {
				setTrails((currentState) => [...currentState, { ...data[key], uid: key }]);
			});
		}
		dispatch(disableLoading());
	}

	async function loadTrailsOffline() {
		dispatch(enableLoading("Carregando dados..."));
		const data = await fetchTrailsOffline(fireIndice._raw.id);

		if (data) {
			setTrails(() => data.map((item) => ({
				uid: item.id,
				initial_coordinates: {
					latitude: item.initial_latitude,
					longitude: item.initial_longitude
				},
				end_coordinates: {
					latitude: item.end_latitude,
					longitude: item.end_longitude
				}
			})));
		}

		dispatch(disableLoading());
	}

	function handleCloseScreen() {
		navigation.navigate("Map");
	}

	function handleCloseModal() {
		setConfigModal({
			show: false,
			message: "",
			data: null
		});
	}

	function handleAddNewTrail() {
		navigation.navigate("Map", { recoderTrailIsActive: true, fireIndice });
	}

	function showTrail(selectedTrail) {
		if (netInfo.isConnected) {
			fetchDirections(selectedTrail.initial_coordinates, selectedTrail.end_coordinates)
				.then((result) => {
					const { coordinates } = result.data.routes[0].geometry;
					navigation.navigate("Map", { coordinates });
				});
		} else {
			setError("Não é possível exibir a trilha sem conexão!");
		}
	}

	async function handleRemoveTrail() {
		dispatch(enableLoading("Removendo trilha..."));

		if (netInfo.isConnected) {
			await removeTrail(configModal.data);
		} else {
			await deleteTrailOffline(configModal.data);
		}

		setTrails((currentState) => currentState.filter((item) => {
			return item.uid !== configModal.data;
		}));

		handleCloseModal();
		dispatch(disableLoading());
	}

	function onDelete(uid) {
		const trail = trails.find((item) => item.uid === uid);

		if (trail.user === user.registration || !netInfo.isConnected) {
			setConfigModal({
				show: true,
				message: "Deseja realmente remover está trilha?",
				data: uid
			});
		} else {
			setError("Você não tem permissão para excluir essa trilha");
		}
	}

	return (
		<RootContainer>
			<Header>
				<ActionButton icon="close" onPress={handleCloseScreen}/>
				<Title>TRILHAS</Title>
			</Header>

			<ModalConfirmation
				isVisible={configModal.show}
				message={configModal.message}
				onConfirm={handleRemoveTrail}
				onCancel={handleCloseModal}
			/>

			<ModalWarning
				isVisible={!!error}
				message={error}
				onConfirm={() => setError("")}
			/>

			<ContainerTrails>
				{trails.length === 0 && (
					<ContainerWarning>
						<Label>Nenhuma trilha encontrada!</Label>
					</ContainerWarning>
				)}
				{trails.length > 0 && (
					<FlatList
						data={trails}
						keyExtractor={(item) => item.uid}
						renderItem={({ item, index }) => (
							<Card key={index}>
								<Touchable onPress={onDelete.bind(null, item.uid)}>
									<FontAwesome name="trash" size={15} style={{ margin: 10 }}/>
								</Touchable>

								<LineVertical/>

								<Touchable onPress={showTrail.bind(null, item)}>
									<Content>
										<MaterialIcons name="map-marker-plus" size={30}/>
										<ContainerInfo>
											<Label>
												{`Latitude: ${item.initial_coordinates.latitude}`}
											</Label>

											<Label>
												{`Longitude: ${item.initial_coordinates.longitude}`}
											</Label>
										</ContainerInfo>
									</Content>

									<LineHorizontal/>

									<Content>
										<MaterialIcons name="map-marker-remove" size={30}/>
										<ContainerInfo>
											<Label>
												{`Latitude: ${item.end_coordinates.latitude}`}
											</Label>

											<Label>
												{`Longitude: ${item.end_coordinates.longitude}`}
											</Label>
										</ContainerInfo>
									</Content>
								</Touchable>
							</Card>
						)}
					/>
				)}
			</ContainerTrails>

			<ContainerOptions>
				<PrimaryButton
					message="ADICIONAR NOVA TRILHA"
					onPress={handleAddNewTrail}
				/>
			</ContainerOptions>
		</RootContainer>
	);
};

export default TrailManager;
