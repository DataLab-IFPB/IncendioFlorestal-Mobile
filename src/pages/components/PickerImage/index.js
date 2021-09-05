import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CAM_CONFIG, CAM_CONFIG_RECORD } from '../../../constants/keys';
import styles from './styles';

const PickerImage = ({ indice }) => {
  const [file, setFile] = useState(null);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  function openPickerCam() {
    launchCamera(CAM_CONFIG, (value) => setFile(value));
  }

  function openPickerCamRecord() {
    launchCamera(CAM_CONFIG_RECORD, (value) => {
      setFile(value);
    });
  }

  function invalidateFile() {
    setFile(null);
  }

  function uploadFile() {
    setConfirmUpload(false);
    setLoadingUpload(true);
    console.log(indice);
    // firebase
    //   .database()
    //   .ref('dados-firms/' + indiceId)
    //   .update({
    //     evidences: {
    //       evidence,
    //     },
    //   });
  }
  useEffect(() => {
    if (file && !file.didCancel) {
      setConfirmUpload(true);
    }
    console.log('file ', file);
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

        <Text style={styles.label}>Adicionar image/vídeo</Text>

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
        </View>
      </View>
    </>
  );
};

export default PickerImage;
