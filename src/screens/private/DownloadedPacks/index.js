import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useDispatch } from "react-redux";
import { loadingActions } from "../../../store/actions";
import { ActionButton } from "../../../components/UI";
import { ContainerInfo } from "../../../components/Layout/Forecast/styles";
import { ModalConfirmation, ModalWarning } from "../../../components/Layout";
import { List } from "./styles";
import {
	RootContainer,
	ContainerTrails,
	Label,
	Card,
	Touchable,
	Content,
	LineVertical,
	ContainerWarning,
	Header,
	Title
} from "../TrailManager/styles";

const DownloadedPacks = () => {

	const dispatch = useDispatch();
	const navigation = useNavigation();
	const offlineManager = MapboxGL.offlineManager;

	const { enableLoading, disableLoading } = loadingActions;

	const [packs, setPacks] = useState([]);
	const [error, setError] = useState("");
	const [removePackModal, setRemovePackModal] = useState({
		show: false,
		message: "",
		data: null
	});
	const [removeAllModal, setRemoveAllModal] = useState({
		show: false,
		message: "",
	});

	useEffect(() => {
		loadPacks();
	}, []);

	async function loadPacks() {
		dispatch(enableLoading("Carregando dados..."));
		const data = await offlineManager.getPacks();

		if (data) {
			setPacks(() => data.map((pack) => ({
				name: pack.name,
				neLng: pack.bounds[0][0].toFixed(5),
				neLat: pack.bounds[0][1].toFixed(5),
				swLng: pack.bounds[1][0].toFixed(5),
				swLat: pack.bounds[1][1].toFixed(5)
			})));
		}
		dispatch(disableLoading());
	}

	function handleCloseScreen() {
		navigation.navigate("Map");
	}

	function handleCloseRemoveModal() {
		setRemovePackModal({
			show: false,
			message: "",
			data: null
		});
	}

	function handleCloseRemoveAllModal() {
		setRemoveAllModal({
			show: false,
			message: "",
		});
	}

	async function handleRemovePack() {
		dispatch(enableLoading("Removendo área..."));

		await offlineManager.deletePack(removePackModal.data);

		loadPacks();
		handleCloseRemoveModal();
		dispatch(disableLoading());
	}

	async function handleRemoveAll() {
		dispatch(enableLoading("Removendo áreas..."));

		for (const pack of packs) {
			offlineManager.deletePack(pack.name);
		}

		setPacks([]);
		handleCloseRemoveAllModal();
		dispatch(disableLoading());
	}

	function onDelete(packName) {
		setRemovePackModal({
			show: true,
			message: `Deseja realmente remover a área ${packName}?`,
			data: packName
		});
	}

	function onDeleteAll() {
		if (packs.length === 0) {
			setError("Não existe nenhuma área para remover!");
		} else {
			setRemoveAllModal({
				show: true,
				message: "Deseja realmente apagar todas as áreas salvas?",
			});
		}
	}

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			handleCloseScreen();
		});
		return () => backHandler.remove();
	}, []);

	return (
		<RootContainer>
			<Header>
				<ActionButton icon="close" onPress={handleCloseScreen} />
				<Title>ÁREAS SALVAS</Title>
				<ActionButton icon="trash" onPress={onDeleteAll} />
			</Header>

			<ModalConfirmation
				isVisible={removePackModal.show}
				message={removePackModal.message}
				onConfirm={handleRemovePack}
				onCancel={handleCloseRemoveModal}
			/>

			<ModalConfirmation
				isVisible={removeAllModal.show}
				message={removeAllModal.message}
				onConfirm={handleRemoveAll}
				onCancel={handleCloseRemoveAllModal}
			/>

			<ModalWarning
				isVisible={!!error}
				message={error}
				onConfirm={() => setError("")}
			/>

			<ContainerTrails>
				{packs.length === 0 && (
					<ContainerWarning>
						<Label>Nenhuma área salva!</Label>
					</ContainerWarning>
				)}
				{packs.length > 0 && (
					<List
						data={packs}
						keyExtractor={(item) => item.name}
						renderItem={({ item, index }) => (
							<Card key={index}>
								<Touchable onPress={onDelete.bind(null, item.name)}>
									<FontAwesome name="trash" size={15} style={{ margin: 10 }} />
								</Touchable>

								<LineVertical />

								<Content>
									<MaterialIcons name="map" size={30} style={{ marginRight: 5 }} />
									<ContainerInfo>
										<Label>
											{`Nome: ${item.name}`}
										</Label>
									</ContainerInfo>
								</Content>
							</Card>
						)}
					/>
				)}
			</ContainerTrails>
		</RootContainer>
	);
};

export default DownloadedPacks;
