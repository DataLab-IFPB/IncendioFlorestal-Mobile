import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { coordinates } from '../../../fakeCoordinates';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';

const Maps = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiaXRhbG9hN3giLCJhIjoiY2txYjVxcndqMHd5aTJ1dDV0ZXBlM2kxaCJ9.P1_QYLu4AQbAX9u-V37_1Q',
  );

  const [userGeolocation, setUserGeolocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const [loadingValidateGeolocationUser, setLoadingValidateGeolocationUser] =
    useState(false);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useEffect(() => {
    async function verifyPermission() {
      const permission = await AsyncStorage.getItem(PERMISSION_LOCATION_USE);

      if (!permission) {
        const request = await MapboxGL.requestAndroidLocationPermissions();
        await AsyncStorage.setItem(
          PERMISSION_LOCATION_USE,
          JSON.stringify(request),
        );
      }
    }
    verifyPermission();
  }, []);

  // load location user
  useEffect(() => {
    const watchPosition = Geolocation.watchPosition(
      (position) => {
        setUserGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.warn('Error on loading user geolocation ', err),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 2000,
      },
    );

    Geolocation.getCurrentPosition(
      (position) => {
        setUserGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => console.warn('Error on get current position user ', err),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 2000,
      },
    );

    return () => Geolocation.clearWatch(watchPosition);
  }, []);

  useEffect(() => {
    if (userGeolocation.latitude && userGeolocation.longitude) {
      setLoadingValidateGeolocationUser(false);
    }
  }, [userGeolocation]);

  return loadingValidateGeolocationUser ? (
    <View />
  ) : (
    <MapboxGL.MapView
      styleURL={MapboxGL.StyleURL.Street}
      zoomLevel={20}
      logoEnabled={false}
      attributionEnabled={false}
      centerCoordinate={[userGeolocation.longitude, userGeolocation.latitude]}
      style={styles.containerMap}>
      <MapboxGL.Camera
        zoomLevel={15}
        centerCoordinate={[userGeolocation.longitude, userGeolocation.latitude]}
        animationMode={'flyTo'}
        animationDuration={1100}
      />
      {coordinates.map((coordinate) => {
        return (
          <MapboxGL.MarkerView
            key={coordinate.id}
            coordinate={[coordinate.longitude, coordinate.latitude]}
            title={'AAA'}>
            <View style={{ width: 100, height: 100 }}>
              <IconAwesome
                name='fire'
                size={30}
                color={coordinate.intensidade <= 5 ? '#F00' : '#ff4500'}
              />
            </View>
          </MapboxGL.MarkerView>
        );
      })}
    </MapboxGL.MapView>
  );
};

export default Maps;
