import React from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LogoApp from '../../../assets/logo.png';
import styles from './styles';
const CustomModal = ({
  visible,
  message,
  onClose,
  onConfirm,
  loading,
  enableButtonCancel = true,
  labelButtonConfirm = 'Sim',
  labelButtonCancel = 'Não',
}) => {
  return (
    <Modal visible={visible} transparent={true} animationType='slide'>
      <View style={styles.container}>
        <Image source={LogoApp} style={styles.logoApp} />

        <Text style={styles.labelMessage}>{message}</Text>
        <View
          style={[
            styles.containerButtons,
            !enableButtonCancel ? { justifyContent: 'center' } : null,
          ]}>
          {enableButtonCancel && (
            <TouchableOpacity
              style={[styles.basicStyleButton, styles.buttonConfirm]}
              onPress={onClose}>
              <Text style={styles.labelTextButton}>{labelButtonCancel}</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => {
              onConfirm();
            }}
            style={[styles.basicStyleButton, styles.buttonReject]}>
            {!loading ? (
              <Text style={styles.labelTextButton}>{labelButtonConfirm}</Text>
            ) : (
              <ActivityIndicator size='small' color='#F00' />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
