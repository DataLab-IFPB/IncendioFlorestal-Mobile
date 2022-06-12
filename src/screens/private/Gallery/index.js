/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { ButtonAction } from "../../../components/UI";
import { useNetInfo } from "@react-native-community/netinfo";
import { watermelonDB } from "../../../shared/services/watermelonDB";
import { FlatList } from "react-native";
import firebase from "../../../shared/services/firebase";
import {
	ContainerIconPlayer,
	ContainerMedia,
	Header,
	Image,
	ImageSlider,
	ItemSlider,
	Label,
	RootContainer,
	Slider,
	Video
} from "./styles";

const Gallery = ({ navigation, route }) => {

	const netInfo = useNetInfo();

	const { fireIndice } = route.params;
	const { fetchEvidencesOffline } = watermelonDB();
	const { getEvidences } = firebase();

	const [medias, setMedias] = useState([]);
	const [selectedMedia, setSelectedMidia] = useState({
		media: "",
		path: ""
	});

	/** Load Data */
	useEffect(() => {
		const loadEvidencesOffline = async () => {
			const data = await fetchEvidencesOffline(fireIndice.id);

			if( data ) {
				setMedias(data);
				setSelectedMidia(data[0]);
			}
		};

		const loadEvidencesOnline = async () => {
			const data = await getEvidences(fireIndice.uid);
		};


		if( !netInfo.isConnected ) {
			loadEvidencesOffline();
		} else {
			loadEvidencesOnline();
		}
	}, [fireIndice]);

	function changeMidiaHandler(item) {
		setSelectedMidia(item);
	}

	function deleteHandler() {

	}

	function closeHandler() {
		navigation.navigate("Map", { fireIndice });
	}

	return(
		<RootContainer>
			<Header>
				<ButtonAction icon='close' onPress={closeHandler}/>
				{medias.length > 0 && <ButtonAction icon='trash'/>}
			</Header>

			<ContainerMedia>
				{ medias.length === 0 && <Label>Nenhum evidência registrada</Label> }
				{ selectedMedia && selectedMedia.media === "image" && (
					<Image source={{ uri: selectedMedia.path }}/>
				)}
				{ selectedMedia && selectedMedia.media === "video" && (
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
