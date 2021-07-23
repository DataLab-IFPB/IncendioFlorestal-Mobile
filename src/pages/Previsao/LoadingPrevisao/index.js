import React from 'react';
import { ActivityIndicator } from 'react-native';
const LoadingPrevisao = () => {
  return <ActivityIndicator size='small' animating={true} color={'#F00'} />;
};

export default LoadingPrevisao;
