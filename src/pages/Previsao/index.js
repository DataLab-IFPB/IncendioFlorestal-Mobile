import React, { useEffect } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IOIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import LoadingPrevisao from './LoadingPrevisao';
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
          <IconAwesome name='wind' style={styles.iconSize} color='#010101' />

          {previsao === null ? (
            <LoadingPrevisao />
          ) : (
            <Text>{previsao?.results.wind_speedy}</Text>
          )}
        </View>
        <View style={styles.containerDetails}>
          <IOIcon name='water-outline' style={styles.iconSize} color='blue' />
          {previsao === null ? (
            <LoadingPrevisao />
          ) : (
            <Text>{previsao?.results.humidity}</Text>
          )}
        </View>
        <View style={styles.containerDetails}>
          <IOIcon
            name='thermometer-outline'
            style={styles.iconSize}
            color='red'
          />
          {previsao === null ? <LoadingPrevisao /> : <Text>35º</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Previsao;
