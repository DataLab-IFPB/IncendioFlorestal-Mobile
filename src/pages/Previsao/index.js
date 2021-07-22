import React, { useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import styles from './styles';
const Previsao = ({ userCoordinates }) => {
  const dispatch = useDispatch();
  const previsao = useSelector((state) => state.previsao.data);

  useEffect(() => {
    dispatch(fetchPrevisao(userCoordinates));
  }, [userCoordinates]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <View style={styles.containerDetails}>
          <IconAwesome name='wind' size={30} color='#010101' />

          <Text>{previsao?.results.wind_speedy || '-'}</Text>
        </View>
        <View style={styles.containerDetails}>
          <IOIcon name='water-outline' size={30} color='blue' />
          <Text>{previsao?.results.humidity || '-'}</Text>
        </View>
        <View style={styles.containerDetails}>
          <IOIcon name='thermometer-outline' size={30} color='red' />
          <Text>35º</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Previsao;
