import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { UPLOAD_TYPE, UPLOAD_TYPES } from '../../../constants/keys';
import { fetchAddEvidence } from '../../../redux/indices-incendios/indices-incendios-action';
import styles from './styles';

const PickerImage = ({ indice }) => {
  const [file, setFile] = useState(null);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [mediaTypeSend, setMediaTypeSend] = useState(null);
  const dispatch = useDispatch();
  function openPickerCam() {
    setUploadType(UPLOAD_TYPES.CAM);
    setMediaTypeSend(UPLOAD_TYPE.IMAGE);
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
    setMediaTypeSend(UPLOAD_TYPE.VIDEO);
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'video',
    }).then((image) => setFile(image));
  }

  function openGallery() {
    setUploadType(UPLOAD_TYPES.GALLERY);
    setMediaTypeSend(UPLOAD_TYPE.IMAGE);
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
    const MEDIA_TYPE = uploadType;
    setConfirmUpload(false);

    dispatch(
      fetchAddEvidence({
        evidence: mediaTypeSend === UPLOAD_TYPE.VIDEO ? file.path : file.data,
        evidenceFileName: file.path,
        mediaType: MEDIA_TYPE,
        indiceId: indice.uid,
        uploadType: mediaTypeSend,
      }),
    );
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
