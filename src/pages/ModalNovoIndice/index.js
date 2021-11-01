import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import LogoApp from '../../assets/logo.png';
import { resetEvidenceSaved } from '../../redux/indices-incendios/indices-incendios-action';
import styles from './styles';
const ModalNovoIndice = ({ visible, onCancel, onConfirm }) => {
  const dispatch = useDispatch();
  const indiceSaved = useSelector(
    (state) => state.indicesIncendios.indiceSaved,
  );

  useEffect(() => {
    if (indiceSaved) {
      dispatch(resetEvidenceSaved(false));
      onCancel();
    }
  }, [dispatch, indiceSaved, onCancel]);

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
            }}
            style={[styles.basicStyleButton, styles.buttonReject]}>
            {!indiceSaved ? (
              <Text style={styles.labelTextButton}>Sim</Text>
            ) : (
              <ActivityIndicator size='small' color='#F00' />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNovoIndice;
