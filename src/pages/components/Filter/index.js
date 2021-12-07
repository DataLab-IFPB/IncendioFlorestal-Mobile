import Slider from '@react-native-community/slider';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';

const Filter = ({ visible, closeModal, indices, refreshIndices }) => {
  const [valueSlide, setValueSlide] = useState(1);
  const [maxValueSlide, setMaxValueSlide] = useState(31);
  const mounthAtual = new Date().getMonth();

  useEffect(() => {
    verifyMounth();
  }, []);
  function verifyMounth() {
    if (mounthAtual === 2) {
      setMaxValueSlide(29);
    } else {
      setMaxValueSlide(30);
    }
  }

  function getRange(startDate, endDate, type) {
    let fromDate = moment(startDate);
    let toDate = moment(endDate);
    let diff = toDate.diff(fromDate, type);
    let range = [];
    for (let i = 0; i < diff; i++) {
      range.push(moment(startDate).add(i, type));
    }
    return range;
  }

  function filtrarIndices() {
    const indicesFiltrados = indices.filter((indice) => {
      let diference =
        getRange(indice.acq_date, new Date(), 'days').length === valueSlide;

      return diference;
    });
    refreshIndices(indicesFiltrados);
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
            {
              'Filtrar os registros de incêndios pela quantidade de dias anterior ao dia atual'
            }
          </Text>
        </View>

        <View style={styles.containerSlide}>
          <Text>{`${valueSlide} ${valueSlide === 1 ? 'dia:' : 'dias:'}`}</Text>
          <Slider
            minimumValue={1}
            maximumValue={maxValueSlide}
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
