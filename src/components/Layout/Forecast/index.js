import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoadingForecast from './LoadingForecast';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Container, ContainerInfo, Label } from './styles';
import { fetchPrevisaoUsuarioLogado } from '../../../redux/previsao/previsao-action';

const Forecast = ({ userCoordinates }) => {

  const dispatch = useDispatch();
  const theme = useTheme();

  const previsao = useSelector((state) => state.previsao.previsaoUsuario);
  const loading = useSelector((state) => state.previsao.loadingPrevisaoUsuario);

  useEffect(() => {
    if( userCoordinates.latitude && userCoordinates.longitude ) {
      dispatch(
        fetchPrevisaoUsuarioLogado({
          latitude: userCoordinates.latitude,
          longitude: userCoordinates.longitude,
        }),
      );
    }
  }, [userCoordinates]);

  function renderInfo(info) {
    return info === null ? ' - ' : info;
  }

  function iconFontAwesome(name, color) {
    return <Ionicons name={name} size={15} color={color}/>;
  }

  return (
    <Container>
      {/* Velocidade do vento */}
      { loading && (<LoadingForecast/>) }
      { !loading && (
        <ContainerInfo>
          <FontAwesome name='wind' color={theme.text.primary} size={15}/>
          <Label>{renderInfo(previsao && previsao.current.wind_kph +  ' KM/H')}</Label>
        </ContainerInfo>
      )}

      {/* Temperatura */}
      { loading && (<LoadingForecast/>) }
      { !loading && (
        <ContainerInfo>
          {iconFontAwesome('thermometer-outline', 'red')}
          <Label>
            {renderInfo(previsao && previsao?.current.temp_c + 'º')}
          </Label>
        </ContainerInfo>
      )}
       
      {/* Humidade */}
      { loading && (<LoadingForecast/>) }
      { !loading && (
        <ContainerInfo>
          {iconFontAwesome('water', 'skyblue')}
          <Label>
              {renderInfo(previsao && Math.floor(previsao?.current.humidity) + '%')}
          </Label>
        </ContainerInfo>
      )}
     
      {/* Precipitacao */}
      { loading && (<LoadingForecast/>) }
      { !loading && (
        <ContainerInfo>
          {iconFontAwesome('thunderstorm-outline', 'skyblue')}
          <Label>
            {renderInfo(previsao && previsao?.current.precip_in + '%')}
          </Label>
        </ContainerInfo>
      )}
    </Container>
  );
};

export default Forecast;
