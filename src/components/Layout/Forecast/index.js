import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import { weather } from '../../../shared/services/weather';
import { Container, ContainerInfo, Label, WindIcon } from './styles';

const Forecast = ({ userCoordinates }) => {

  const theme = useTheme();

  const { getForecast } = weather();
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {

    if(userCoordinates.latitude && userCoordinates.longitude) {
      refreshWeather();
    }
  }, [userCoordinates]);

  async function refreshWeather() {
    setCurrentWeather(await getForecast(userCoordinates.longitude, userCoordinates.latitude));
  }

  function renderInfo(info) {
    return info === null ? ' - ' : info;
  }

  function windArrowIcon() {
    return currentWeather === null ? null :
      <FontAwesome
        name='arrow-up'
        color='#FFF'
        size={15}
        style={{transform: [{rotate: currentWeather.wind_degree + 'deg'}], marginLeft: 10}}
      />;
  }

  function iconFontAwesome(name, color) {
    return <Ionicons name={name} size={15} color={color}/>;
  }

    return (
      <Container>
        {/* Velocidade do vento */}
          <ContainerInfo>
            <WindIcon>
              <FontAwesome name='wind' color={theme.text.primary} size={15}/>
              {windArrowIcon()}
            </WindIcon>
            <Label>{renderInfo(currentWeather && currentWeather.wind_kph +  ' KM/H')}</Label>
          </ContainerInfo>

        {/* Temperatura */}
          <ContainerInfo>
            {iconFontAwesome('thermometer-outline', 'red')}
            <Label>
              {renderInfo(currentWeather && currentWeather.temp_c + 'º')}
            </Label>
          </ContainerInfo>

        {/* Humidade */}
          <ContainerInfo>
            {iconFontAwesome('water', 'skyblue')}
            <Label>
                {renderInfo(currentWeather && Math.floor(currentWeather.humidity) + '%')}
            </Label>
          </ContainerInfo>

        {/* Precipitacao */}
          <ContainerInfo>
            {iconFontAwesome('thunderstorm-outline', 'skyblue')}
            <Label>
              {renderInfo(currentWeather && currentWeather.precip_in + '%')}
            </Label>
          </ContainerInfo>
      </Container>
    );
};

export default Forecast;
