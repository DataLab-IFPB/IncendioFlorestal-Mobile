import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import LoadingPrevisao from './LoadingPrevisao';
import { CONDICOES_, PREVISAO } from '../../utils/condicoes-clima';
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

  function _renderTipoTempo() {
    let tipoTempo = '';
    CONDICOES_.filter((value) => {
      if (value.titulo === previsao?.results.condition_slug) {
        tipoTempo = value.descricao;
      }
    });
    return tipoTempo.trim();
  }

  function _renderIcon() {
    const tipoTempo = _renderTipoTempo();
    let iconName = 'day';
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
  return (
    <View style={styles.container}>
      <View style={styles.containerDetails}>
        <IconAwesome name='wind' style={styles.iconSize} color='#010101' />

        {loading ? (
          <LoadingPrevisao />
        ) : (
          <Text style={styles.labelInfo}>{previsao?.results.wind_speedy}</Text>
        )}
      </View>
      <View style={styles.containerDetails}>
        <IOIcon name='water-outline' style={styles.iconSize} color='blue' />
        {loading ? (
          <LoadingPrevisao />
        ) : (
          <Text style={styles.labelInfo}>{previsao?.results.humidity}%</Text>
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
          <Text style={styles.labelInfo}>{previsao?.results.temp}º</Text>
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
              {_renderTipoTempo().trim()}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default Previsao;
