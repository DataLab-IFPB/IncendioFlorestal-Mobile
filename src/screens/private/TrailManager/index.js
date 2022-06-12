import React, { useEffect, useState } from "react";
import trail from "../../../shared/services/trail";
import firebase from "../../../shared/services/firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loadingActions } from "../../../store/actions";
import { Button, ButtonAction } from "../../../components/UI";
import { ModalConfirmation, ModalWarning } from "../../../components/Layout";
import { ContainerInfo } from "../../../components/Layout/Forecast/styles";
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

const TrailManager = ({ navigation, route }) => {

	const dispatch = useDispatch();

	const { fireIndice } = route.params;
	const { getTrails, removeTrail } = firebase();
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
		const loadTrails = async () => {
			dispatch(enableLoading("Carregando dados..."));
			const data = await getTrails(fireIndice.uid);

			if( data ) {
				Object.keys(data).forEach((key) => {
					setTrails((currentState) => [...currentState, {...data[key], uid: key}]);
				});
			}
			dispatch(disableLoading());
		};

		if( trails.length === 0 ) {
			loadTrails();
		}
	}, []);

	function closeHandler() {
		navigation.navigate("Map");
	}

	function closeModalHandler() {
		setConfigModal({
			show: false,
			message: "",
			data: null
		});
	}

	function addNewTrailHandler() {
		navigation.navigate("Map", { recoderTrailIsActive: true, fireIndice });
	}

	function showTrail(selectedTrail) {
		fetchDirections(selectedTrail.initial_coordinates, selectedTrail.end_coordinates)
			.then((result) => {
				const { coordinates } = result.data.routes[0].geometry;
				navigation.navigate("Map", { coordinates });
			});
	}

	async function removeTrailHandler() {
		dispatch(enableLoading("Removendo trilha..."));

		await removeTrail(configModal.data);
		setTrails((currentState) => currentState.filter((item) => item.uid !== configModal.data));

		closeModalHandler();
		dispatch(disableLoading());
	}

	function onDelete(uid) {
		const trail = trails.find((item) => item.uid === uid);

		if( trail.user === user.registration ) {
			setConfigModal({
				show: true,
				message: "Deseja realmente remover está trilha?",
				data: uid
			});
		} else {
			setError("Você não possui permissão para deletar essa trilha!");
		}
	}

	return(
		<RootContainer>

			<Header>
				<ButtonAction icon="close" onPress={closeHandler}/>
				<Title>
					TRILHAS
				</Title>
			</Header>

			<ModalConfirmation
				isVisible={configModal.show}
				message={configModal.message}
				onConfirm={removeTrailHandler}
				onCancel={closeModalHandler}
			/>

			<ModalWarning
				isVisible={!!error}
				message={error}
				onConfirm={() => setError("")}
			/>

			<ContainerTrails>
				{ trails.length === 0 && (
					<ContainerWarning>
						<Label>Nenhuma trilha encontrada!</Label>
					</ContainerWarning>
				)}
				{ trails.length > 0 && (
					<FlatList
						data={trails}
						keyExtractor={() => Date.now().toString()}
						renderItem={({item, index}) => (
							<Card key={index}>
								<Touchable onPress={onDelete.bind(null, item.uid)}>
									<FontAwesome name="trash" size={15} style={{ margin: 10}}/>
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
				<Button onPress={addNewTrailHandler}>
					ADICIONAR NOVA TRILHA
				</Button>
			</ContainerOptions>
		</RootContainer>
	);
};

export default TrailManager;
