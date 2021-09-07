import storage from '@react-native-firebase/storage';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { UPLOAD_TYPES } from '../../../constants/keys';
import styles from './styles';

const PickerImage = ({ indice }) => {
  const [file, setFile] = useState(null);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  function openPickerCam() {
    setUploadType(UPLOAD_TYPES.CAM);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: 'photo',
    }).then((image) => setFile(image));
  }

  function openPickerCamRecord() {
    setUploadType(UPLOAD_TYPES.RECORD);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'video',
    }).then((image) => setFile(image));
  }

  function openGallery() {
    setUploadType(UPLOAD_TYPES.GALLERY);
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
      mediaType: 'any',
      compressImageQuality: 1,
    }).then((image) => setFile(image));
  }

  function invalidateFile() {
    setFile(null);
  }
  async function uploadFile() {
    setConfirmUpload(false);

    const fileToUpload = mountData();
    const evidenceName = `evidences/${fileToUpload.fileName}`;
    await storage()
      .ref(evidenceName)
      .putString(file.data, 'base64')
      .then((value) => console.log('arquivo enviado'))
      .catch((err) => console.log('err ', err));

    const evidenceUrl = await storage().ref(evidenceName).getDownloadURL();

    firebase
      .database()
      .ref('dados-firms/' + indice.uid)
      .update({
        evidences: evidenceUrl,
      })
      .then((value) => console.log('evidencia atualizada ', value))
      .catch((err) => console.log('err ', err));
  }

  function mountData() {
    let data = null;
    if (uploadType === UPLOAD_TYPES.CAM) {
      data = {
        path: file.data,
        type: file.mime,
      };
    } else if (uploadType === UPLOAD_TYPES.RECORD) {
      data = {
        path: file.data,
        type: file.mime,
      };
    } else if (uploadType === UPLOAD_TYPES.GALLERY) {
      data = {
        path: file.data,
        type: file.mime,
      };
    }
    data = {
      ...data,
      fileName: file.path.substring(file.path.lastIndexOf('/') + 1),
    };
    return data;
  }

  useEffect(() => {
    if (file) {
      setConfirmUpload(true);
    }
  }, [file]);
  return (
    <>
      <View style={styles.container}>
        <Modal transparent={true} visible={confirmUpload}>
          <View style={styles.containerUpload}>
            <Text style={styles.labelQuestionUpload}>
              Deseja anexar a mídia a essa ocorrência ?
            </Text>

            <View style={styles.containerButtonsUpload}>
              <TouchableOpacity
                style={styles.buttonUpload}
                onPress={uploadFile}>
                <Text style={styles.labelButtonUpload}>Sim</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  invalidateFile();
                  setConfirmUpload(false);
                }}
                style={[styles.buttonUpload, styles.buttonCancelUpload]}>
                <Text style={styles.labelButtonUpload}>Não</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Adicionar evidência</Text>

        <View style={styles.containerIcons}>
          <FontAwesome
            onPress={openPickerCam}
            name='camera'
            style={styles.icon}
          />

          <FontAwesome
            onPress={openPickerCamRecord}
            name='video-camera'
            style={styles.icon}
          />

          <FontAwesome onPress={openGallery} name='image' style={styles.icon} />
        </View>
      </View>
    </>
  );
};

export default PickerImage;
