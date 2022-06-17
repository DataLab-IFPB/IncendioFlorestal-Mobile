/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import firebase from "../../../shared/services/firebase";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { Button, Container } from "./styles";
import { useNetInfo } from "@react-native-community/netinfo";
import { QUALITY_IMAGE_AND_VIDEO } from "../../../constants";
import { watermelonDB } from "../../../shared/services/watermelonDB";

const PickerImage = ({ fireIndice }) => {

	const netInfo = useNetInfo();

	const ICON_SIZE = 15;

	const { registerNewEvidence } = firebase();
	const { saveEvicendeOffline } = watermelonDB();

	const userRegistration = useSelector((state) => state.auth.registration);

	const [file, setFile] = useState(null);

	useEffect(() => {
		if(file) {
			if( netInfo.isConnected ) {
				uploadFile();
			} else {
				const data = {
					fireIndice_id: fireIndice.id,
					path: file.path,
					media: file.mime.split("/")[0]
				};
				saveEvicendeOffline(data);
			}

			setFile(null);
		}
	}, [file]);

	function openPickerCam() {
		ImagePicker.openCamera({
			forceJpg: true,
			height: QUALITY_IMAGE_AND_VIDEO.height,
			compressImageMaxWidth: QUALITY_IMAGE_AND_VIDEO.width,
			compressImageMaxHeight: QUALITY_IMAGE_AND_VIDEO.height,
			cropping: true,
			includeBase64: true,
			mediaType: "photo",
			compressImageQuality: 1,
		})
			.then((image) => setFile(image));
	}

	function openPickerCamRecord() {
		ImagePicker.openCamera({
			width: QUALITY_IMAGE_AND_VIDEO.width,
			height: QUALITY_IMAGE_AND_VIDEO.height,
			mediaType: "video",
		})
			.then((image) => {
				const validateLenghtRecord = validateLenghtFile(image.duration);
				if (validateLenghtRecord) {
					setFile(image);
				}
			});
	}

	function validateLenghtFile(duration) {
		return Math.round(duration / 1000) <= 300;
	}

	function openGallery() {
		ImagePicker.openPicker({
			width: QUALITY_IMAGE_AND_VIDEO.width,
			height: QUALITY_IMAGE_AND_VIDEO.height,
			cropping: false,
			includeBase64: true,
			mediaType: "any",
			compressImageQuality: 1,
		})
			.then((image) => setFile(image));
	}

	async function uploadFile() {
		if ( file ) {
			await registerNewEvidence(file.path, file.mime.split("/")[0], userRegistration, fireIndice.uid);
		}
	}

	return (
		<React.Fragment>
			<Container>
				<Button onPress={openPickerCam}>
					<FontAwesome name="camera" size={ICON_SIZE}/>
				</Button>

				<Button onPress={openPickerCamRecord} >
					<FontAwesome name="video-camera" size={ICON_SIZE}/>
				</Button>

				<Button onPress={openGallery}>
					<FontAwesome name="image" size={ICON_SIZE}/>
				</Button>
			</Container>
		</React.Fragment>
	);
};

export default PickerImage;
