import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

const LoadingForecast = () => {

  const theme = useTheme();

  return(
    <ActivityIndicator size='small' animating={true} color={theme.main.red} />
  );
};

export default LoadingForecast;
