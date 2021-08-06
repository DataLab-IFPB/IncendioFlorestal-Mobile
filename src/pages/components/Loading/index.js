import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import styles from './styles';
const Loading = ({ loading }) => {
  return (
    <Modal>
      <View style={styles.container}>
        <ActivityIndicator size='large' color='#F00' />
      </View>
    </Modal>
  );
};

export default Loading;
