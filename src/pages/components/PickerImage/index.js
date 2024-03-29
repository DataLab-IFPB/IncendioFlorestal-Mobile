import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  QUALITY_IMAGE_AND_VIDEO,
  UPLOAD_TYPE,
  UPLOAD_TYPES,
  USER_REGISTRATION,
} from '../../../constants/keys';
import { fetchAddEvidence } from '../../../redux/indices-incendios/indices-incendios-action';
import CustomModal from '../CustomModal';
import styles from './styles';

const PickerImage = ({ indice }) => {
  const [file, setFile] = useState(null);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [mediaTypeSend, setMediaTypeSend] = useState(null);

  const dispatch = useDispatch();
  const [registrationUser, setRegistrationUser] = useState('');
  const loadingAddEvidence = useSelector(
    (state) => state.indicesIncendios.loadingAddEvidence,
  );

  useEffect(() => {
    async function restoreUserRegistration() {
      const registration = await AsyncStorage.getItem(USER_REGISTRATION);
      if (registration) {
        setRegistrationUser(registration);
      }
    }

    restoreUserRegistration();
  }, []);

  useEffect(() => {
    if (file) {
      setConfirmUpload(true);
    }
  }, [file]);

  function openPickerCam() {
    setUploadType(UPLOAD_TYPES.CAM);
    setMediaTypeSend(UPLOAD_TYPE.IMAGE);
    ImagePicker.openCamera({
      forceJpg: true,
      width: QUALITY_IMAGE_AND_VIDEO.width,
      height: QUALITY_IMAGE_AND_VIDEO.height,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
      compressImageQuality: 1,
    })
      .then((image) => setFile(image))
      .catch((err) => console.warn(err));
  }

  function openPickerCamRecord() {
    setUploadType(UPLOAD_TYPES.RECORD);
    setMediaTypeSend(UPLOAD_TYPE.VIDEO);

    ImagePicker.openCamera({
      width: QUALITY_IMAGE_AND_VIDEO.width,
      height: QUALITY_IMAGE_AND_VIDEO.height,
      mediaType: 'video',
    })
      .then((image) => {
        const validateLenghtRecord = validateLenghtFile(image.duration);
        if (validateLenghtRecord) {
          setFile(image);
        }
      })
      .catch((err) => console.warn(err));
  }

  function validateLenghtFile(duration) {
    return Math.round(duration / 1000) <= 300;
  }

  function openGallery() {
    setUploadType(UPLOAD_TYPES.GALLERY);
    setMediaTypeSend(UPLOAD_TYPE.IMAGE);
    ImagePicker.openPicker({
      width: QUALITY_IMAGE_AND_VIDEO.width,
      height: QUALITY_IMAGE_AND_VIDEO.height,
      cropping: false,
      includeBase64: true,
      mediaType: 'any',
      compressImageQuality: 1,
    })
      .then((image) => setFile(image))
      .catch((err) => console.warn(err));
  }

  function invalidateFile() {
    setFile(null);
  }

  async function uploadFile() {
    const MEDIA_TYPE = uploadType;
    setConfirmUpload(false);
    console.log(indice.uid);

    if (file !== null) {
      dispatch(
        fetchAddEvidence({
          evidence: mediaTypeSend === UPLOAD_TYPE.VIDEO ? file.path : file.data,
          evidenceFileName: file.path,
          mediaType: MEDIA_TYPE,
          indiceId: indice.uid,
          uploadType: mediaTypeSend,
          registrationUser,
        }),
      );
    }
  }

  function cancelButton() {
    invalidateFile();
    setConfirmUpload(false);
  }

  function confirmButton() {
    uploadFile();
  }
  return (
    <>
      <View style={styles.container}>
        <CustomModal
          message={' Deseja anexar a mídia a essa ocorrência ?'}
          onClose={cancelButton}
          visible={confirmUpload}
          onConfirm={confirmButton}
          loading={loadingAddEvidence}
        />

        <Text style={styles.label}>Adicionar evidência</Text>

        <View style={styles.containerIcons}>
          <TouchableOpacity onPress={openPickerCam} style={styles.btn}>
            <FontAwesome name='camera' style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={openPickerCamRecord} style={styles.btn}>
            <FontAwesome name='video-camera' style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={openGallery} style={styles.btn}>
            <FontAwesome name='image' style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default PickerImage;
