import React, { useEffect, useState } from 'react';
import { BackHandler, TouchableOpacity } from 'react-native';
import { View, Text, Alert, Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FloatingMenu from '../FloatingMenu';
import Loading from '../components/Loading';
import styles from './styles';

import { useSelector } from 'react-redux';

const Maps = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiaXRhbG9hN3giLCJhIjoiY2txYjVxcndqMHd5aTJ1dDV0ZXBlM2kxaCJ9.P1_QYLu4AQbAX9u-V37_1Q',
  );
  const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Outdoors);
  const indices = useSelector((state) => state.indicesIncendios.data);
  const loadingIndices = useSelector((state) => state.indicesIncendios.loading);
  const errorsRequest = useSelector((state) => state.indicesIncendios.error);
  const [indicesNotFound, setShowIndicesNotFound] = useState(false);
  const [showMessageIndicesNotFound, setShowMessageIndicesNotFound] =
    useState(false);
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

  useEffect(() => {
    if (
      !loadingIndices &&
      !loadingValidateGeolocationUser &&
      indices === null
    ) {
      setShowIndicesNotFound(true);
      setShowMessageIndicesNotFound(true);
    }
  }, [errorsRequest, indices]);

  return loadingValidateGeolocationUser ? (
    <Loading loading={loadingValidateGeolocationUser || loadingIndices} />
  ) : (
    <View style={styles.containerMapsAndButtons}>
      <FloatingMenu setMapStyle={setMapStyle} />

      <MapboxGL.MapView
        styleURL={mapStyle}
        zoomLevel={20}
        logoEnabled={false}
        attributionEnabled={false}
        centerCoordinate={[userGeolocation.longitude, userGeolocation.latitude]}
        style={styles.containerMap}>
        <MapboxGL.Camera
          zoomLevel={15}
          minZoomLevel={5}
          maxZoomLevel={15}
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
      {indicesNotFound &&
        !loadingIndices &&
        !loadingValidateGeolocationUser &&
        indices &&
        indices === null && (
          <Modal visible={showMessageIndicesNotFound} transparent={true}>
            <View
              style={{
                width: 250,
                height: 100,
                backgroundColor: '#000',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                elevation: 10,
                zIndex: 2,
                borderRadius: 30,
                top: '40%',
                left: '20%',
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#FFF',
                }}>
                {`${'!Ops.\nNão foi possível carregar os dados'}`}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#fff',
                  width: 80,
                  height: 20,
                  alignItems: 'center',
                  borderRadius: 15,
                }}
                onPress={() => setShowMessageIndicesNotFound(false)}>
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
    </View>
  );
};

export default Maps;
