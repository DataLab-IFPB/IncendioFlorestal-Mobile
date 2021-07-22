import React, { useEffect, useState } from 'react';
import { BackHandler, TouchableOpacity, View, Text, Modal } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import FloatingMenu from '../FloatingMenu';
import Loading from '../components/Loading';
import { fetchIndicesIncendios } from '../../redux/indices-incendios/indices-incendios-action';
import styles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import Previsao from '../Previsao';

const Maps = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiaXRhbG9hN3giLCJhIjoiY2txYjVxcndqMHd5aTJ1dDV0ZXBlM2kxaCJ9.P1_QYLu4AQbAX9u-V37_1Q',
  );
  const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Outdoors);
  const indices = useSelector((state) => state.indicesIncendios.data);
  const loadingIndices = useSelector((state) => state.indicesIncendios.loading);
  const errorsRequest = useSelector((state) => state.indicesIncendios.error);
  const [showMessageIndicesNotFound, setShowMessageIndicesNotFound] =
    useState(false);
  const dispatch = useDispatch();
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
    dispatch(fetchIndicesIncendios());
  }, []);

  useEffect(() => {
    if (
      !loadingIndices &&
      !loadingValidateGeolocationUser &&
      indices === null
    ) {
      setShowMessageIndicesNotFound(true);
    }
  }, [errorsRequest, indices]);

  return loadingValidateGeolocationUser ? (
    <Loading loading={loadingValidateGeolocationUser || loadingIndices} />
  ) : (
    <View style={styles.containerMapsAndButtons}>
      <FloatingMenu setMapStyle={setMapStyle} />

      <Previsao userCoordinates={userGeolocation} />

      <MapboxGL.MapView
        styleURL={mapStyle}
        zoomLevel={20}
        logoEnabled={false}
        attributionEnabled={false}
        centerCoordinate={[userGeolocation.longitude, userGeolocation.latitude]}
        style={styles.containerMap}>
        <MapboxGL.Camera
          zoomLevel={20}
          // zoom pra cima
          minZoomLevel={6}
          // zoom pra baixo
          maxZoomLevel={17}
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
                  <IconSimple
                    name='fire'
                    size={30}
                    color={coordinate.brightness >= 500 ? '#F00' : '#ff4500'}
                  />
                </View>
              </MapboxGL.MarkerView>
            );
          })}
      </MapboxGL.MapView>
      {!loadingIndices && !loadingValidateGeolocationUser && indices === null && (
        <Modal visible={showMessageIndicesNotFound} transparent={true}>
          <View style={styles.containerIndicesNotFound}>
            <Text style={styles.labelIndiceNotFound}>
              {`${'!Ops.\nNão foi possível carregar os dados'}`}
            </Text>
            <TouchableOpacity
              style={styles.btnOkIndiceNotFound}
              onPress={() => setShowMessageIndicesNotFound(false)}>
              <Text style={[styles.labelIndiceNotFound, styles.labelButtonOk]}>
                Ok
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Maps;
