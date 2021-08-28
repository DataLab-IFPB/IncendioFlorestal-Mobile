import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisaoUsuarioLogado } from '../../redux/previsao/previsao-action';
import LoadingPrevisao from './LoadingPrevisao';
import styles from './styles';
const Previsao = ({ userCoordinates }) => {
  const dispatch = useDispatch();
  const previsao = useSelector((state) => state.previsao.previsaoUsuario);
  const loading = useSelector((state) => state.previsao.loadingPrevisaoUsuario);

  useEffect(() => {
    dispatch(
      fetchPrevisaoUsuarioLogado({
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
      }),
    );
  }, []);

  function _renderInfo(info) {
    return info === null ? ' - ' : info;
  }

  function _renderComponent(icon, data) {
    return (
      <View style={styles.containerDetalhesPrevisao}>
        {icon}
        {data}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Velocidade do vento */}
      {loading ? (
        <LoadingPrevisao />
      ) : (
        _renderComponent(
          <IconAwesome name='wind' style={styles.iconSize} color='#010101' />,
          <Text style={styles.labelInfo}>
            {_renderInfo(previsao && previsao.current.wind_kph) + 'KM/H'}
          </Text>,
        )
      )}
      {/* Humidade */}
      {loading ? (
        <LoadingPrevisao />
      ) : (
        _renderComponent(
          <IOIcon name='water-outline' style={styles.iconSize} color='blue' />,
          <Text style={styles.labelInfo}>
            {_renderInfo(
              previsao && Math.floor(previsao?.current.humidity) + '%',
            )}
          </Text>,
        )
      )}
      {/* Temperatura */}
      {loading ? (
        <LoadingPrevisao />
      ) : (
        _renderComponent(
          <IOIcon
            name='thermometer-outline'
            style={styles.iconSize}
            color='red'
          />,
          <Text style={styles.labelInfo}>
            {_renderInfo(previsao && previsao?.current.temp_c) + 'º'}
          </Text>,
        )
      )}
      {/* Precipitacao */}
      {loading ? (
        <LoadingPrevisao />
      ) : (
        _renderComponent(
          <IOIcon name='thunderstorm-outline' size={styles.iconCloseSize} />,
          <Text style={styles.labelInfo}>{`${_renderInfo(
            previsao && previsao?.current.precip_in,
          )}%`}</Text>,
        )
      )}
    </View>
  );
};

export default Previsao;
