import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { View, Text } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { coordinates } from '../../../fakeCoordinates';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FloatingMenu from '../FloatingMenu';
import styles from './styles';

import { useSelector } from 'react-redux';

const Maps = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiaXRhbG9hN3giLCJhIjoiY2txYjVxcndqMHd5aTJ1dDV0ZXBlM2kxaCJ9.P1_QYLu4AQbAX9u-V37_1Q',
  );
  const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Street);
  const indices = useSelector((state) => state.indicesIncendios.data);

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
    <View style={styles.containerMapsAndButtons}>
      {!loadingValidateGeolocationUser && (
        <View style={styles.containerButtons}>
          <FloatingMenu setMapStyle={setMapStyle} />
        </View>
      )}
      <MapboxGL.MapView
        styleURL={mapStyle}
        zoomLevel={20}
        logoEnabled={false}
        attributionEnabled={false}
        centerCoordinate={[userGeolocation.longitude, userGeolocation.latitude]}
        style={styles.containerMap}>
        <MapboxGL.Camera
          zoomLevel={15}
          minZoomLevel={10}
          maxZoomLevel={20}
          centerCoordinate={[
            userGeolocation.longitude,
            userGeolocation.latitude,
          ]}
          animationMode={'flyTo'}
          animationDuration={1100}
        />
        {indices &&
          indices.map((coordinate, index) => {
            return (
              <MapboxGL.MarkerView
                key={index}
                coordinate={[
                  Number(coordinate.longitude),
                  Number(coordinate.latitude),
                ]}>
                <View style={styles.containerIndexFire}>
                  <IconSimpleLineIcons
                    name='fire'
                    size={30}
                    color={coordinate.brightness >= 500 ? '#F00' : '#ff4500'}
                  />
                </View>
              </MapboxGL.MarkerView>
            );
          })}
      </MapboxGL.MapView>
    </View>
  );
};

export default Maps;
