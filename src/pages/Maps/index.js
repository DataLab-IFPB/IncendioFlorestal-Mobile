import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { BackHandler } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import styles from './styles';

const Maps = () => {
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
    <MapView
      initialRegion={{
        latitude: userGeolocation.latitude,
        longitude: userGeolocation.longitude,
        latitudeDelta: 0.0033160984328199916,
        longitudeDelta: 0.001997910439968109,
      }}
      mapType={'terrain'}
      onRegionChangeComplete={(region) => {
        setUserGeolocation({
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        });
      }}
      loadingEnabled={true}
      showsMyLocationButton={true}
      provider={PROVIDER_GOOGLE}
      style={styles.containerMap}
    />
  );
};

export default Maps;
