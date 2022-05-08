import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoveEvidence } from '../../../redux/fire-indices/fire-indices-action';
import CustomModal from '../CustomModal';
import VisualizationEvidence from '../VisualizationEvidence';
import styles from './styles';
const Galery = ({ evidences, indiceUid }) => {
  const [visibleGalery, setVisibleGalery] = useState(false);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [evidenceToRemove, setEvidenceToRemove] = useState(null);
  const loadingRemoveEvidence = useSelector(
    (state) => state.indicesIncendios.loadingRemoveEvidence,
  );

  const evidenceRemoved = useSelector(
    (state) => state.indicesIncendios.evidenceRemoved,
  );

  const errorOnRemoveEvidence = useSelector(
    (state) => state.indicesIncendios.errorRemoveEvidence,
  );
  const isFocused = useIsFocused();
  const [showMessageError, setShowMessageError] = useState(false);

  const ERROR_ON_DELETE_EVIDENCE = 'Erro ao remover evidência.';

  useEffect(() => {
    if (evidenceRemoved) {
      setVisibleGalery(false);
      setShowModal(false);
    }
  }, [dispatch, evidenceRemoved]);

  useEffect(() => {
    if (errorOnRemoveEvidence !== null) {
      setShowModal(false);
    }
  }, [errorOnRemoveEvidence]);

  useEffect(() => {
    if (
      errorOnRemoveEvidence &&
      !loadingRemoveEvidence &&
      !showModal &&
      isFocused &&
      errorOnRemoveEvidence.message === ERROR_ON_DELETE_EVIDENCE
    ) {
      setShowMessageError(true);
    }
    return () => {};
  }, [errorOnRemoveEvidence, isFocused, loadingRemoveEvidence, showModal]);

  function renderCreatedAt(date) {
    return date !== '' ? `Registrado em: ${date}` : '';
  }

  function renderRegisterBy(registration) {
    return registration !== '' ? `Por: ${registration}` : '';
  }

  function closeVisualizationDetail() {
    setShowEvidenceDetail(false);
  }

  function enableVisualizationDetail() {
    setShowEvidenceDetail(true);
  }
  function renderVisualizationImageEvidence(evidence) {
    return (
      <TouchableOpacity
        style={styles.containerEvidenceVideo}
        onPress={enableVisualizationDetail}>
        <Image
          source={{ uri: evidence.item.uri }}
          style={styles.imagePreview}
        />
        <VisualizationEvidence
          content={
            <Image
              source={{ uri: evidence.item.uri }}
              style={styles.imageEvidence}
            />
          }
          visible={showEvidenceDetail}
          close={closeVisualizationDetail}
        />
      </TouchableOpacity>
    );
  }
  function renderVisualizationVideoEvidence(evidence) {
    return (
      <>
        <TouchableOpacity
          style={styles.containerEvidenceVideo}
          onPress={enableVisualizationDetail}
          activeOpacity={1}>
          <FontAwesome name='video-camera' style={styles.icon} />
          <Text style={styles.labelVideoEvidence}>
            {'Toque para\nvisualizar\no vídeo'}
          </Text>
        </TouchableOpacity>

        <VisualizationEvidence
          visible={showEvidenceDetail}
          close={closeVisualizationDetail}
          content={
            <Video
              source={{ uri: evidence.item.uri }}
              paused={true}
              controls={true}
              style={styles.videoEvidence}
            />
          }
        />
      </>
    );
  }

  function renderEvidenceData(evidence) {
    const MEDIA_TYPE_PHOTO = 'base64';

    return evidence.item.media_type === MEDIA_TYPE_PHOTO
      ? renderVisualizationImageEvidence(evidence)
      : renderVisualizationVideoEvidence(evidence);
  }
  const [showEvidenceDetail, setShowEvidenceDetail] = useState(false);

  function deleteEvidence(evidence) {
    if (evidenceToRemove !== null) {
      dispatch(
        fetchRemoveEvidence({
          allEvidences: evidences,
          evidence: evidence.item,
          indiceUid,
        }),
      );
    }
  }

  function showModalRemoveEvidence(evidence) {
    setShowModal(true);
    setEvidenceToRemove(evidence);
  }
  function cancelButton() {
    setShowModal(false);
  }

  function renderEvidence(evidence) {
    return evidence.item.media_type ? (
      <View style={styles.containerEvidence}>
        <IconFeather
          onPress={() => showModalRemoveEvidence(evidence)}
          name={'trash'}
          style={styles.iconTrash}
        />
        <View style={styles.containerCreatedAt}>
          <Text style={styles.labelCreatedAt}>
            {renderCreatedAt(evidence.item.created_at)}
          </Text>
          <Text style={styles.labelCreatedAt}>
            {renderRegisterBy(evidence.item.registration_for)}
          </Text>
        </View>
        {renderEvidenceData(evidence)}
      </View>
    ) : null;
  }
  function renderHeaderGalery() {
    return (
      <View style={styles.header}>
        <TouchableOpacity>
          <IconAntDesign
            onPress={() => setVisibleGalery(false)}
            name='closecircle'
            color={'#F00'}
            size={styles.iconClose}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <>
      <CustomModal
        message={'Deseja excluir essa evidência?'}
        loading={loadingRemoveEvidence}
        onClose={cancelButton}
        onConfirm={() => deleteEvidence(evidenceToRemove)}
        visible={showModal}
      />

      <CustomModal
        message={errorOnRemoveEvidence && errorOnRemoveEvidence.message}
        loading={loadingRemoveEvidence}
        onClose={cancelButton}
        onConfirm={() => setShowMessageError(false)}
        visible={showMessageError}
        enableButtonCancel={false}
        labelButtonConfirm={'Ok'}
      />

      <View>
        <TouchableOpacity onPress={() => setVisibleGalery(true)}>
          <View style={styles.labelVisualizationGallery}>
            <Text style={styles.labelGalery}>{'Visualizar galeria'}</Text>

            <FontAwesome name='image' style={styles.icon} />
          </View>
          <Modal
            transparent={true}
            visible={visibleGalery}
            animationType='slide'>
            {renderHeaderGalery()}
            <View style={styles.containerGalery}>
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
                horizontal={false}
                renderItem={renderEvidence}
                keyExtractor={(_, index) => String(index)}
                data={evidences}
              />
            </View>
          </Modal>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Galery;
