import React, { useEffect, useState } from 'react';
import database from '@react-native-firebase/database';
import { ActivityIndicator, Text, View } from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import IOIcon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisao } from '../../../redux/previsao/previsao-action';
import Galery from '../Galery'
import PickerImage from '../PickerImage';
import styles from './styles';
import { formatUTC } from '../../../shared/utils/formatDate';
import { useNetInfo } from '@react-native-community/netinfo';

const FireIndiceDetails = ({
  indiceCoords,
  closeIndiceDetail,
  indiceFromMap,
  resetIndiceToShow,
}) => {

  const dispatch = useDispatch();
  const netInfo = useNetInfo();

  const indices = useSelector((state) => state.indicesIncendios.data);
  const previsao = useSelector((state) => state.previsao.data);
  const loading = useSelector((state) => state.previsao.loading);
  const [loadingLocal, setLoadingLocal] = useState(false);
  const [containsEvidences, setContainsEvidenceces] = useState({
    contain: false,
    evidences: null,
  });

  const [indice, setIndice] = useState();
  const evidenceSaved = useSelector(
    (state) => state.indicesIncendios.evidenceSaved,
  );

  const evidenceRemoved = useSelector(
    (state) => state.indicesIncendios.evidenceRemoved,
  );

  useEffect(() => {
    // setLoadingLocal(true);
    
    // try {
    //   database()
    //   .ref(`fires/${indiceFromMap.uid}`)
    //   .on('value', (value) => {
    //     const indiceData = value.val();
    //     setIndice({ uid: indiceFromMap.uid, ...indiceData });
    //   });
    // } finally {
    //   setLoadingLocal(false);
    // }

    setIndice(() => {
      return indices.filter((register) =>{
        if( register.latitude === indiceCoords.latitude && register.longitude === indiceCoords.longitude ) {
          return register;
        }
      })[0];
    });
   

    
  }, [indiceFromMap, evidenceSaved, evidenceRemoved]);

  useEffect(() => {
    dispatch(fetchPrevisao(indiceCoords));
  }, [dispatch, indiceCoords]);

  useEffect(() => {
    function mountEvidencecData() {
      const keys = Object.keys(indice.evidences);

      const evidencesData = Object.values(indice.evidences);

      return evidencesData.map((evidence, index) => {
        return {
          uid: keys[index],
          ...evidence,
        };
      });
    }

    if (indice && indice.hasOwnProperty('evidences')) {
      const evidencesData = mountEvidencecData();
      setContainsEvidenceces({
        contain: true,
        evidences: evidencesData,
      });
    } else if (indice && !indice.hasOwnProperty('evidences')) {
      setContainsEvidenceces({
        contain: false,
        evidences: null,
      });
    }
  }, [indice, evidenceRemoved, indiceFromMap]);

  function _renderInfo(info) {
    return info === null ? ' - ' : info;
  }

  function _renderComponent(icon, data) {
    return (
      <View style={styles.containerRenderComponents}>
        {icon}
        {data}
      </View>
    );
  }

  function renderCard() {
    return (
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <IconAntDesign
            onPress={() => {
              closeIndiceDetail(false);
              resetIndiceToShow(null);
            }}
            name='closecircle'
            color={'#F00'}
            size={styles.iconCloseSize}
          />
        </View>

        {loading || loadingLocal ? (
          <View>
            <ActivityIndicator size='large' color='#F00' />
          </View>
        ) : (
          <>
            <View style={styles.containerDetail}>
              <SimpleLineIcons
                name='fire'
                size={styles.iconIndiceSize}
                color={indice && indice.userCreated ? '#FFF000' : '#F00'}
              />

              <Text style={styles.labelNoBold}>Registrado em:</Text>
              <Text style={styles.label}>
                {indice && formatUTC(indice.acq_date)}
              </Text>
              <Text />
            </View>
            <Text style={styles.labelNoBold}>Ocorreu de:</Text>
            {indice && indice.daynight === 'D' ? (
              <Fontisto name='day-sunny' style={styles.iconColorBlack} />
            ) : (
              <Feather name='moon' style={styles.iconColorBlack} />
            )}

            <View style={styles.containerPrevisao}>
              <Text style={styles.labelNoBold}>
                {`Local: ${
                  previsao ? _renderInfo(previsao.location.name) : 'Não identificado'
                }`}
              </Text>
              <View style={styles.containerOrientation}>
                {_renderComponent(
                  <IconAwesome name='wind' color='#010101' size={25} />,
                  <Text style={styles.labelNoBold}>
                    {`${
                      previsao ? _renderInfo(Math.floor(previsao.current.wind_kph)) + 'KM/H' : '-'
                    }`}
                  </Text>,
                )}

                {_renderComponent(
                  <IOIcon
                    name='water-outline'
                    size={styles.iconCloseSize}
                    color='blue'
                  />,
                  <Text style={styles.labelNoBold}>{`${
                    previsao ? _renderInfo(previsao.current.humidity) + '%' : '-'
                  }`}</Text>,
                )}

                {_renderComponent(
                  <IOIcon
                    name='thermometer-outline'
                    size={styles.iconCloseSize}
                    color='red'
                  />,
                  <Text style={styles.labelNoBold}>
                    {previsao ? _renderInfo(previsao.current.temp_c) : '-'}
                  </Text>,
                )}

                {_renderComponent(
                  <IOIcon
                    name='thunderstorm-outline'
                    size={styles.iconCloseSize}
                  />,
                  <Text style={styles.labelNoBold}>{`${
                    previsao ? previsao.current.precip_in + '%' : '-'
                  }`}</Text>,
                )}
              </View>
            </View>

            {indice && <PickerImage indice={indice} />}

            {containsEvidences.contain &&
              containsEvidences.evidences.length > 0 && (
                <Galery
                  evidences={containsEvidences.evidences}
                  indiceUid={indice.uid}
                />
              )}
          </>
        )}
      </View>
    );
  }

  return renderCard();
};

export default FireIndiceDetails;
