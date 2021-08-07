import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import LogoApp from '../../assets/logo.png';
import styles from './styles';

const ModalNovoIndice = ({ visible, onCancel, onConfirm }) => {
  const indiceSaved = useSelector(
    (state) => state.indicesIncendios.indiceSaved,
  );
  return (
    <Modal visible={visible} transparent={true} animationType='slide'>
      <View style={styles.container}>
        <Image source={LogoApp} style={styles.logoApp} />
        <Text style={styles.labelMessage}>
          Deseja adicionar um novo registro de incêndio ?
        </Text>
        <View style={styles.containerButtons}>
          <TouchableOpacity
            style={[styles.basicStyleButton, styles.buttonConfirm]}
            onPress={onCancel}>
            <Text style={styles.labelTextButton}>Não</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onConfirm();
              if (indiceSaved) {
                onCancel();
              }
            }}
            style={[styles.basicStyleButton, styles.buttonReject]}>
            <Text style={styles.labelTextButton}>Sim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNovoIndice;
