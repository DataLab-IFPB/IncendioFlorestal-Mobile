import React, { useEffect, useState } from "react";
import ImagePicker from "react-native-image-crop-picker";
import { useNetInfo } from "@react-native-community/netinfo";
import { useSelector } from "react-redux";

import { RESOLUTION_IMAGE_AND_VIDEO } from "../../../constants";
import firebase from "../../../shared/services/firebase";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Button, Container } from "./styles";
import { saveEvidenceOffline } from "../../../shared/services/realm";

const AddEvidence = ({ fire }) => {

	const ICON_SIZE = 15;

	const netInfo = useNetInfo();
	const { registerNewEvidence } = firebase();

	const [file, setFile] = useState(null);
	const userRegistration = useSelector((state) => state.auth.registration);

	useEffect(() => {
		if (file) {
			if (netInfo.isConnected) {
				uploadFile();
			} else {
				const data = {
					fireId: fire.id,
					path: file.path,
					fileType: file.mime.split("/")[0]
				};
				saveEvidenceOffline(data);
			}

			setFile(null);
		}
	}, [file]);

	function openPickerCam() {
		ImagePicker.openCamera({
			forceJpg: true,
			height: RESOLUTION_IMAGE_AND_VIDEO.height,
			compressImageMaxWidth: RESOLUTION_IMAGE_AND_VIDEO.width,
			compressImageMaxHeight: RESOLUTION_IMAGE_AND_VIDEO.height,
			cropping: true,
			includeBase64: true,
			mediaType: "photo",
			compressImageQuality: 1,
		}).then((image) => setFile(image));
	}

	function openPickerCamRecord() {
		ImagePicker.openCamera({
			width: RESOLUTION_IMAGE_AND_VIDEO.width,
			height: RESOLUTION_IMAGE_AND_VIDEO.height,
			mediaType: "video",
		}).then((image) => {
			if (validateFileLenght(image.duration)) {
				setFile(image);
			}
		});
	}

	function openGallery() {
		ImagePicker.openPicker({
			width: RESOLUTION_IMAGE_AND_VIDEO.width,
			height: RESOLUTION_IMAGE_AND_VIDEO.height,
			cropping: false,
			includeBase64: true,
			mediaType: "any",
			compressImageQuality: 1,
		}).then((image) => setFile(image));
	}

	function validateFileLenght(duration) {
		return Math.round(duration / 1000) <= 300;
	}

	async function uploadFile() {
		if (file) {
			await registerNewEvidence(file.path, file.mime.split("/")[0], userRegistration, fire.id);
		}
	}

	return (
		<>
			<Container>
				<Button onPress={openPickerCam}>
					<FontAwesome name="camera" size={ICON_SIZE} />
				</Button>

				<Button onPress={openPickerCamRecord} >
					<FontAwesome name="video-camera" size={ICON_SIZE} />
				</Button>

				<Button onPress={openGallery}>
					<FontAwesome name="image" size={ICON_SIZE} />
				</Button>
			</Container>
		</>
	);
};

export { AddEvidence };
