import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Loading from '../../components/Loading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';
import styles from './styles';
import {
  fetchRemoveEvidence,
  fetchIndicesIncendios,
} from '../../../redux/indices-incendios/indices-incendios-action';
const Galery = ({ evidences, indiceUid }) => {
  const [visibleGalery, setVisibleGalery] = useState(false);
  const dispatch = useDispatch();
  const loadingRemoveIndice = useSelector(
    (state) => state.indicesIncendios.loadingRemoveEvidence,
  );

  const evidenceRemoved = useSelector(
    (state) => state.indicesIncendios.evidenceRemoved,
  );

  useEffect(() => {
    if (evidenceRemoved) {
      setVisibleGalery(false);
      dispatch(fetchIndicesIncendios());
    }
  }, [dispatch, evidenceRemoved]);
  function renderCreatedAt(date) {
    return date !== '' ? `Registrado em: ${date}` : '';
  }

  function renderRegisterBy(registration) {
    return registration !== '' ? `Por: ${registration}` : '';
  }

  function renderVisualizationVideoEvidence(evidence) {
    return (
      <>
        <View style={styles.containerEvidenceVideo}>
          <TouchableOpacity
            onPress={() => setShowVideoEvidence(true)}
            activeOpacity={1}>
            <FontAwesome name='video-camera' style={styles.icon} />
          </TouchableOpacity>
          <Text>{'Toque para visualizar o vídeo'}</Text>
        </View>

        <Modal
          visible={showVideoEvidence}
          transparent={true}
          animationType={'slide'}>
          <View style={styles.containerVisualizationEvidenceVideo}>
            <View style={styles.headerCOntainerVIsualizationEvidenceVideo}>
              <TouchableOpacity>
                <IconAntDesign
                  onPress={() => setShowVideoEvidence(false)}
                  name='closecircle'
                  color={'#F00'}
                  size={styles.iconClose}
                />
              </TouchableOpacity>
            </View>
            <Video
              source={{ uri: evidence.item.uri }}
              paused={true}
              controls={true}
              style={styles.videoEvidence}
            />
          </View>
        </Modal>
      </>
    );
  }

  function renderEvidenceData(evidence) {
    const MEDIA_TYPE_PHOTO = 'base64';

    return evidence.item.media_type === MEDIA_TYPE_PHOTO ? (
      <Image source={{ uri: evidence.item.uri }} style={styles.imageEvidence} />
    ) : (
      renderVisualizationVideoEvidence(evidence)
    );
  }
  const [showVideoEvidence, setShowVideoEvidence] = useState(false);

  function deleteEvidence(evidence) {
    console.log(indiceUid);
    dispatch(
      fetchRemoveEvidence({
        allEvidences: evidences,
        evidence,
        indiceUid,
      }),
    );
  }
  function renderEvidence(evidence) {
    return evidence.item.media_type ? (
      <View style={styles.containerEvidence}>
        <View style={styles.containerCreatedAt}>
          <Text style={styles.labelCreatedAt}>
            {renderCreatedAt(evidence.item.created_at)}
          </Text>
          <Text style={styles.labelCreatedAt}>
            {renderRegisterBy(evidence.item.registration_for)}
          </Text>
        </View>

        <View style={styles.containerIconTrash}>
          <FontAwesome
            name={'trash-o'}
            size={30}
            color={'#000'}
            onPress={() => deleteEvidence(evidence)}
          />
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
    <View>
      <TouchableOpacity onPress={() => setVisibleGalery(true)}>
        <View style={styles.labelVisualizationGallery}>
          <Text style={styles.labelGalery}>{'Visualizar galeria'}</Text>

          <FontAwesome name='image' style={styles.icon} />
        </View>
        <Modal transparent={true} visible={visibleGalery} animationType='slide'>
          {renderHeaderGalery()}
          <View style={styles.containerGalery}>
            <Loading loading={loadingRemoveIndice} />
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
  );
};

export default Galery;
