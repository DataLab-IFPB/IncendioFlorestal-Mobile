import React, { useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";

import trail from "../../../shared/services/trail";
import firebase from "../../../shared/services/firebase";
import { loaderActions } from "../../../store/actions";

import { FlatList, BackHandler } from "react-native";
import { PrimaryButton, ActionButton } from "../../../components/UI";
import { ModalConfirmation, ModalWarning } from "../../../components/Layout";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
	Container,
	Content,
	Options,
	Header,
	List,
	Card,
	Title,
	Label,
	Info,
	Warning,
	Touchable,
	LineVertical,
	LineHorizontal,
} from "./styles";
import { deleteTrailByIdOffline, getAllTrailsByFireOffline } from "../../../shared/services/realm";

const TrailManager = ({ navigation, route }) => {
	const dispatch = useDispatch();
	const netInfo = useNetInfo();

	const { fire } = route.params;
	const { getTrails, removeTrail } = firebase();
	const { fetchDirections } = trail();
	const { enableLoading, disableLoading } = loaderActions;

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
		dispatch(enableLoading("Carregando dados"));
		const data = await getTrails(fire.id);

		if (data) {
			Object.keys(data).forEach((key) => {
				setTrails((currentState) => [...currentState, { ...data[key], uid: key }]);
			});
		}
		dispatch(disableLoading());
	}

	async function loadTrailsOffline() {
		dispatch(enableLoading("Carregando dados"));
		const data = await getAllTrailsByFireOffline(fire.id);
		if (data) {
			setTrails(() => data.map((item) => ({
				id: item.id,
				start_coordinates: {
					latitude: item.start_latitude,
					longitude: item.start_longitude
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
		navigation.navigate("Map", { recoderTrailIsActive: true, fire });
	}

	function showTrail(selectedTrail) {
		if (netInfo.isConnected) {
			fetchDirections(selectedTrail.start_coordinates, selectedTrail.end_coordinates)
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
			deleteTrailByIdOffline(configModal.data);
		}

		setTrails((currentState) => currentState.filter((item) => {
			return item.id !== configModal.data;
		}));

		handleCloseModal();
		dispatch(disableLoading());
	}

	function onDelete(id) {
		const trail = trails.find((item) => item.id === id);

		if (trail.user === user.registration || !netInfo.isConnected) {
			setConfigModal({
				show: true,
				message: "Deseja realmente remover está trilha?",
				data: id
			});
		} else {
			setError("Você não tem permissão para excluir essa trilha");
		}
	}

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			navigation.navigate("Map");
			return true;
		});

		return () => backHandler.remove();
	}, []);

	return (
		<Container>
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

			<List>
				{trails.length === 0 && (
					<Warning>
						<Label>Nenhuma trilha encontrada!</Label>
					</Warning>
				)}
				{trails.length > 0 && (
					<FlatList
						data={trails}
						keyExtractor={(item) => item.id}
						renderItem={({ item, index }) => (
							<Card key={index}>
								<Touchable onPress={onDelete.bind(null, item.id)}>
									<FontAwesome name="trash" size={15} style={{ margin: 10 }} />
								</Touchable>

								<LineVertical />

								<Touchable onPress={showTrail.bind(null, item)}>
									<Content>
										<MaterialIcons name="map-marker-plus" size={30} />
										<Info>
											<Label>
												{`Latitude: ${item.start_coordinates.latitude.toFixed(7)}`}
											</Label>

											<Label>
												{`Longitude: ${item.start_coordinates.longitude.toFixed(7)}`}
											</Label>
										</Info>
									</Content>

									<LineHorizontal />

									<Content>
										<MaterialIcons name="map-marker-remove" size={30} />
										<Info>
											<Label>
												{`Latitude: ${item.end_coordinates.latitude.toFixed(7)}`}
											</Label>

											<Label>
												{`Longitude: ${item.end_coordinates.longitude.toFixed(7)}`}
											</Label>
										</Info>
									</Content>
								</Touchable>
							</Card>
						)}/>
				)}
			</List>

			<Options>
				<PrimaryButton
					message="ADICIONAR NOVA TRILHA"
					onPress={handleAddNewTrail}
				/>
			</Options>
		</Container>
	);
};

export default TrailManager;
