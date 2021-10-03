import React from 'react';
import { ActivityIndicator } from 'react-native';
const LoadingPrevisao = () => {
  return <ActivityIndicator size='large' animating={true} color={'#F00'} />;
};

export default LoadingPrevisao;
