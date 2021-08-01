import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import LoadingPrevisao from './LoadingPrevisao';
import styles from './styles';
const Previsao = ({ userCoordinates }) => {
  const dispatch = useDispatch();
  const previsao = useSelector((state) => state.previsao.data);
  const loading = useSelector((state) => state.previsao.loading);

  useEffect(() => {
    dispatch(
      fetchPrevisao({
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
      }),
    );
  }, []);

  function _renderInfo(info) {
    return info === null ? ' - ' : info;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerDetails}>
        <IconAwesome name='wind' style={styles.iconSize} color='#010101' />

        {loading ? (
          <LoadingPrevisao />
        ) : (
          <Text style={styles.labelInfo}>
            {_renderInfo(previsao && previsao?.current.wind_kph)}
          </Text>
        )}
      </View>
      <View style={styles.containerDetails}>
        <IOIcon name='water-outline' style={styles.iconSize} color='blue' />
        {loading ? (
          <LoadingPrevisao />
        ) : (
          <Text style={styles.labelInfo}>
            {_renderInfo(previsao && previsao?.current.humidity)}
          </Text>
        )}
      </View>
      <View style={styles.containerDetails}>
        <IOIcon
          name='thermometer-outline'
          style={styles.iconSize}
          color='red'
        />
        {loading ? (
          <LoadingPrevisao />
        ) : (
          <Text style={styles.labelInfo}>
            {_renderInfo(previsao && previsao?.current.temp_c)}
          </Text>
        )}
      </View>

      <View
        style={[styles.containerDetails, styles.marginTopContanerTipoTempo]}>
        {loading ? (
          <LoadingPrevisao />
        ) : (
          <>
            <Text style={styles.containerDetails}>{'% de chuva'}</Text>
            <View style={styles.containerPrecipitacao}>
              <Text style={styles.labelPrecipitacao}>
                {previsao && previsao?.current.precip_mm
                  ? previsao?.current.precip_mm + '%'
                  : ''}
              </Text>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

export default Previsao;
