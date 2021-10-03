import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';

const Notify = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Evidência enviada com sucesso!</Text>
    </View>
  );
};

export default Notify;
