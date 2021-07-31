import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import { CONDICOES_ } from '../../utils/condicoes-clima';
import LoadingPrevisao from './LoadingPrevisao';
import styles from './styles';
const Previsao = ({ userCoordinates }) => {
  const dispatch = useDispatch();
  const previsao = useSelector((state) => state.previsao.data);
  const loading = useSelector((state) => state.previsao.loading);

  console.log(previsao);
  useEffect(() => {
    dispatch(
      fetchPrevisao({
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
      }),
    );
  }, []);

  function _renderTipoTempo() {
    let tipoTempo = '';
    if (previsao === null) {
      return tipoTempo;
    }
    CONDICOES_.filter((value) => {
      if (value.titulo === previsao?.results.condition_slug) {
        tipoTempo = value.descricao;
      }
    });
    return tipoTempo.trim();
  }

  function _renderIcon() {
    const tipoTempo = _renderTipoTempo();

    let iconName = tipoTempo === '' ? 'alert-outline' : _renderTipoTempo();
    if (tipoTempo && tipoTempo.includes('dia')) {
      iconName = 'sunny-outline';
    }
    if (
      tipoTempo &&
      tipoTempo.includes('dia') &&
      tipoTempo.includes('nublado')
    ) {
      iconName = 'partly-sunny-outline';
    }
    if (tipoTempo && tipoTempo.includes('noite')) {
      iconName = 'cloudy-night';
    }
    if (
      tipoTempo &&
      tipoTempo.includes('noite') &&
      tipoTempo.includes('nublado')
    ) {
      iconName = 'moon-outline';
    }
    if (tipoTempo.includes('nublado')) {
      iconName = 'partly-sunny-outline';
    }

    return <IOIcon name={iconName} style={styles.iconSize} color='#000' />;
  }

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
            {_renderInfo(previsao && previsao?.results.wind_speedy)}
          </Text>
        )}
      </View>
      <View style={styles.containerDetails}>
        <IOIcon name='water-outline' style={styles.iconSize} color='blue' />
        {loading ? (
          <LoadingPrevisao />
        ) : (
          <Text style={styles.labelInfo}>
            {_renderInfo(previsao && previsao?.results.humidity)}
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
            {_renderInfo(previsao && previsao.results.temp)}
          </Text>
        )}
      </View>

      <View
        style={[styles.containerDetails, styles.marginTopContanerTipoTempo]}>
        {loading ? (
          <LoadingPrevisao />
        ) : (
          <>
            {_renderIcon()}
            <Text style={styles.labelTipoTempo}>
              {_renderTipoTempo() || ' - '}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Previsao;
