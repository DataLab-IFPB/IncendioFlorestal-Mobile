/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import fs from "react-native-fs";
import { useDispatch } from "react-redux";
import { useNetInfo } from "@react-native-community/netinfo";

import firebase from "../../../shared/services/firebase";
import { formatDateString, formatDatetime } from "../../../shared/utils/formatDate";
import { loaderActions } from "../../../store/actions";

import { FlatList, BackHandler } from "react-native";
import { ActionButton } from "../../../components/UI";
import { ModalConfirmation } from "../../../components/Layout";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import {
	Container,
	IconPlayer,
	Slider,
	ImageSlider,
	ItemSlider,
	Header,
	Media,
	Image,
	Video,
	Label,
	Title,
	TitleLabel
} from "./styles";
import { deleteEvidenceByIdOffline, getAllEvidenceByFireOffline } from "../../../shared/services/realm";

const Gallery = ({ navigation, route }) => {

	const netInfo = useNetInfo();
	const dispatch = useDispatch();

	const { fire } = route.params;
	const { enableLoading, disableLoading } = loaderActions;
	const { getEvidences, getMedia, removeEvidence } = firebase();

	const [medias, setMedias] = useState([]);
	const [configModal, setConfigModal] = useState({ show: false });
	const [selectedMedia, setSelectedMedia] = useState({ id: null, media: "", path: "", info: "" });

	// Load Data
	useEffect(() => {
		const load = async () => {
			if (netInfo.isConnected)
				await loadEvidencesOnline();
			else
				await loadEvidencesOffline();
		};

		if (netInfo.isConnected !== null)
			load();
	}, [netInfo]);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			navigation.navigate("Map");
		});

		return () => backHandler.remove();
	}, []);

	async function loadEvidencesOnline() {
		dispatch(enableLoading("Carregando evidências"));
		setMedias([]);

		const data = await getEvidences(fire.id);
		if (data) {
			Object.keys(data).forEach(async (key, index) => {

				const path = await getMedia(data[key].file);
				setMedias((state) => [...state, { path, id: key, ...data[key] }]);

				if (index === 0) {
					setSelectedMedia({
						path,
						media: data[key].fileType,
						info: data[key].createdAt,
						id: key
					});
				}
			});
		}

		dispatch(disableLoading());
	}

	async function loadEvidencesOffline() {
		dispatch(enableLoading("Carregando evidências"));
		const data = await getAllEvidenceByFireOffline(fire.id);
		if (data[0]) {
			setMedias(data);
			setSelectedMedia({
				id: data[0].id,
				media: data[0].fileType,
				path: data[0].path,
				info: formatDatetime(data[0].createdAt)
			});
		}
		dispatch(disableLoading());
	}

	function changeMediaHandler(item) {
		setSelectedMedia({
			id: item.id,
			path: item.path,
			media: item.fileType,
			info: item.createdAt
		});
	}

	async function onConfirmDelete() {
		clear();
		dispatch(enableLoading("Apagando evidência"));

		if (netInfo.isConnected) {
			await removeEvidence(selectedMedia.id);
			await loadEvidencesOnline();
		} else {
			try {
				await fs.unlink(selectedMedia.path.split("///").pop());
				deleteEvidenceByIdOffline(selectedMedia.id);
				loadEvidencesOffline();
				dispatch(disableLoading());
			} catch {
				dispatch(disableLoading());
			}
		}
		onCancelDelete();
	}

	function clear() {
		setMedias([]);
		setSelectedMedia({
			id: null, media: "", path: "", info: ""
		});
	}

	function onCancelDelete() {
		setConfigModal({ show: false });
	}

	function openModal() {
		setConfigModal({ show: true });
	}

	function onClose() {
		navigation.navigate("Map", { fire });
	}

	return (
		<Container>
			<ModalConfirmation
				isVisible={configModal.show}
				message="Deseja excluir esta evidência?"
				onConfirm={onConfirmDelete}
				onCancel={onCancelDelete}
			/>

			<Header isEmptyMedias={!!medias.length}>
				<ActionButton icon='close' onPress={onClose} />

				<Title isEmptyMedias={!!medias.length}>
					GALERIA
				</Title>

				{!!medias.length && <ActionButton icon='trash' onPress={openModal} />}
			</Header>

			<Media>
				{!medias.length && <Label>Nenhuma evidência registrada</Label>}

				{!!medias.length && <Label>
					<TitleLabel>Registrado em:</TitleLabel>
					{`\n${formatDateString(selectedMedia.info)}`}
				</Label>}

				{/* IMAGE */}
				{!!medias.length && selectedMedia.media === "image" && (
					<Image source={{ uri: selectedMedia.path }} />
				)}

				{/* VIDEO */}
				{medias.length > 0 && selectedMedia.media === "video" && (
					<Video
						controls
						repeat
						resizeMode="stretch"
						source={{ uri: selectedMedia.path }}
					/>
				)}
			</Media>

			<Slider>
				<FlatList
					horizontal
					data={medias}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<ItemSlider
							onPress={changeMediaHandler.bind(null, item)}
							isSelected={item.path === selectedMedia.path}
						>
							{item.media === "video" && (
								<IconPlayer>
									<FontAwesome name="play-circle" color="#FFF" size={30} />
								</IconPlayer>
							)}
							<ImageSlider source={{ uri: item.path }} />
						</ItemSlider>
					)}
				/>
			</Slider>
		</Container>
	);
};

export default Gallery;
