import Slider from '@react-native-community/slider';
import React, { useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { fetchFilterIndices } from '../../../redux/indices-incendios/indices-incendios-action';
import styles from './styles';

const Filter = ({ visible, closeModal, indices, refreshIndices }) => {
  const [valueSlide, setValueSlide] = useState(1);
  const MAX_VALUE_RANGE_DAYS = 3;
  const dispatch = useDispatch();

  // realiza uma nova requisição ao banco de dados para buscar os indices de acordo com a data
  function filtrarIndices() {
    dispatch(fetchFilterIndices(valueSlide));
    closeModal();
  }

  return (
    <Modal transparent={true} visible={visible} animationType={'slide'}>
      <View style={styles.container}>
        <Image
          source={require('../../../assets/logo.png')}
          style={styles.logoSize}
        />
        <View style={styles.containerHeader}>
          <Text style={[styles.labelTextButton, styles.labelHeader]}>
            {'Filtrar os registros de incêndios'}
          </Text>
        </View>

        <View style={styles.containerSlide}>
          <Text>{`${valueSlide} ${valueSlide === 1 ? 'dia:' : 'dias:'}`}</Text>
          <Slider
            minimumValue={1}
            maximumValue={MAX_VALUE_RANGE_DAYS}
            minimumTrackTintColor='#000'
            maximumTrackTintColor='#000'
            thumbTintColor={'#000'}
            step={1}
            style={styles.lenghtSlide}
            onValueChange={(value) => setValueSlide(value)}
            value={valueSlide}
          />
        </View>

        <View style={styles.containerButtons}>
          <TouchableOpacity
            onPress={() => {
              filtrarIndices();
            }}
            style={[styles.basicStyleButton, styles.buttonConfirm]}>
            <Text style={styles.labelTextButton}>{'Filtrar'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => closeModal()}
            style={[styles.basicStyleButton, styles.buttonReject]}>
            <Text style={styles.labelTextButton}>{'Fechar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Filter;
