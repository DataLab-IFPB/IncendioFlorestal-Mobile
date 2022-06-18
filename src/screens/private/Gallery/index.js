/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import firebase from "../../../shared/services/firebase";
import fs from "react-native-fs";
import { FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { ButtonAction } from "../../../components/UI";
import { loadingActions, firesIndicesActions } from "../../../store/actions";
import { useNetInfo } from "@react-native-community/netinfo";
import { ModalConfirmation } from "../../../components/Layout";
import { formatDateString } from "../../../shared/utils/formatDate";
import { watermelonDB } from "../../../shared/services/watermelonDB";
import {
	ContainerIconPlayer,
	ContainerMedia,
	Header,
	Image,
	ImageSlider,
	ItemSlider,
	Label,
	Title,
	RootContainer,
	Slider,
	Video,
	TitleLabel
} from "./styles";

const Gallery = ({ navigation, route }) => {

	const netInfo = useNetInfo();
	const dispatch = useDispatch();

	const { fireIndice } = route.params;
	const { updateFireIndice } = firesIndicesActions;
	const { enableLoading, disableLoading } = loadingActions;
	const { getEvidences, getMedia, removeEvidence } = firebase();
	const { fetchEvidencesOffline, removeEvidenceOffline } = watermelonDB();

	const [medias, setMedias] = useState([]);
	const [configModal, setConfigModal] = useState({ show: false });
	const [selectedMedia, setSelectedMidia] = useState({ id: null, media: "", path: "", info: "" });

	// Load Data
	useEffect(() => {
		const load = async () => {
			if( !netInfo.isConnected ) {
				await loadEvidencesOffline();
			} else {
				await loadEvidencesOnline();
			}
		};

		if( netInfo.isConnected !== null ) {
			load();
		}
	}, [netInfo]);

	async function loadEvidencesOnline() {
		dispatch(enableLoading("Carregando evidências..."));

		const data = await getEvidences(fireIndice.uid);
		if( data ) {
			Object.keys(data).forEach(async (key, index) => {

				const path = await getMedia(data[key].file);
				medias.push({ path, uid: key, ...data[key] });

				if( index === 0) {
					setSelectedMidia({
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
		dispatch(enableLoading("Carregando evidências..."));
		const data = await fetchEvidencesOffline(fireIndice.id);

		if( data[0] ) {
			setMedias(data);
			setSelectedMidia({
				id: data[0].id,
				media: data[0].fileType,
				path: data[0].path,
				info: data[0].createdAt
			});
		}

		dispatch(disableLoading());
	}

	function changeMidiaHandler(item) {
		setSelectedMidia({
			id: item.id,
			path: item.path,
			media: item.fileType,
			info: item.createdAt
		});
	}

	async function onConfirmDelete() {
		clear();
		dispatch(enableLoading("Apagando evidência..."));

		if( !netInfo.isConnected ) {
			try {
				await fs.unlink(selectedMedia.path.split("///").pop());
				await removeEvidenceOffline(selectedMedia.id);
				loadEvidencesOffline();
				dispatch(disableLoading());
			} catch {
				dispatch(disableLoading());
			}
		} else {
			await removeEvidence(selectedMedia.id);
			await loadEvidencesOnline();
			dispatch(disableLoading());
		}

		onCancelDelete();
	}

	function clear() {
		setMedias([]);
		setSelectedMidia({
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
		navigation.navigate("Map", { fireIndice });
	}

	return(
		<RootContainer>
			<ModalConfirmation
				isVisible={configModal.show}
				message="Deseja excluir esta evidência?"
				onConfirm={onConfirmDelete}
				onCancel={onCancelDelete}
			/>

			<Header isEmptyMedias={!!medias.length}>
				<ButtonAction icon='close' onPress={onClose}/>

				<Title isEmptyMedias={!!medias.length}>
					GALERIA
				</Title>

				{ !!medias.length && <ButtonAction icon='trash' onPress={openModal}/> }
			</Header>

			<ContainerMedia>
				{ !medias.length && <Label>Nenhuma evidência registrada</Label> }

				{ !!medias.length && <Label>
					<TitleLabel>Registrado em:</TitleLabel>
					{`\n${formatDateString(selectedMedia.info)}`}
				</Label>}

				{/* IMAGE */}
				{ !!medias.length && selectedMedia.media === "image" && (
					<Image source={{ uri: selectedMedia.path }}/>
				)}

				{/* VIDEO */}
				{ medias.length > 0 && selectedMedia.media === "video" && (
					<Video
						controls
						repeat
						resizeMode="stretch"
						source={{ uri: selectedMedia.path }}
					/>
				)}
			</ContainerMedia>

			<Slider>
				<FlatList
					horizontal
					data={medias}
					keyExtractor={(item) => item.path}
					renderItem={({item}) => (
						<ItemSlider
							onPress={changeMidiaHandler.bind(null, item)}
							isSelected={item.path === selectedMedia.path}
						>
							{item.media === "video" && (
								<ContainerIconPlayer>
									<FontAwesome name="play-circle" color="#FFF" size={30}/>
								</ContainerIconPlayer>
							)}
							<ImageSlider source={{ uri: item.path }}/>
						</ItemSlider>
					)}
				/>
			</Slider>
		</RootContainer>
	);
};

export default Gallery;
