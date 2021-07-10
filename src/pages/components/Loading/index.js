import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import styles from './styles';
const Loading = ({ loading }) => {
  return (
    <Modal transparent visible={loading}>
      <View style={styles.container}>
        <ActivityIndicator animating={true} size={'large'} color={'#F00'} />
      </View>
    </Modal>
  );
};

export default Loading;
