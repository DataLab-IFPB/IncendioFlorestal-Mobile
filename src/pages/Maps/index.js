import AsyncStorage from '@react-native-async-storage/async-storage';
import MapboxGL from '@react-native-mapbox-gl/maps';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  BackHandler,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import {
  fetchIndicesIncendios,
  fetchSaveIndice,
} from '../../redux/indices-incendios/indices-incendios-action';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import getMoment from '../../utils/getMoment';
import Loading from '../components/Loading';
import DetailIndice from '../DetailIndice';
import FloatingMenu from '../FloatingMenu';
import styles from './styles';

const Maps = () => {
  const dispatch = useDispatch();
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiaXRhbG9hN3giLCJhIjoiY2txYjVxcndqMHd5aTJ1dDV0ZXBlM2kxaCJ9.P1_QYLu4AQbAX9u-V37_1Q',
  );
  const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Outdoors);
  const indices = useSelector((state) => state.indicesIncendios.data);
  // const [indices, setIndices] = useState([]);
  const loadingIndices = useSelector((state) => state.indicesIncendios.loading);
  // const [loadingIndices, setLoadingIndices] = useState(false);
  const errorsRequest = useSelector((state) => state.indicesIncendios.error);

  const indiceSaved = useSelector(
    (state) => state.indicesIncendios.indiceSaved,
  );

  const [showDetail, setShowDetail] = useState(false);
  const [indiceCoords, setIndiceCoords] = useState();
  const [indiceToShow, setIndiceToShow] = useState(null);
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

  const previsaoNewIndice = useSelector((state) => state.previsao.data);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useEffect(() => {
    if (indices === null && !loadingIndices) {
      dispatch(fetchIndicesIncendios());
    }
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
      setShowMessageIndicesNotFound(true);
    }
  }, [errorsRequest, indices]);

  useEffect(() => {
    dispatch(fetchIndicesIncendios());
  }, [indiceSaved]);

  function _saveIndice(value) {
    const coordinates = value.geometry.coordinates;
    const longitude = coordinates[0];
    const latitude = coordinates[1];

    const indiceCreateToUser = {
      latitude: latitude,
      longitude: longitude,
      userCreated: true,
      acq_date: new Date().toISOString(),
      acq_datetime: null,
      acq_time: null,
      ativo: true,
      brightness: null,
      brightness_2: null,
      confidence: null,
      daynight: getMoment(),
      frp: null,
      point: [longitude, latitude],
      satellite: '',
      scan: '',
      track: '',
      version: '1',
      temperature: {
        temp_c: previsaoNewIndice && previsaoNewIndice.current.temp_c,
        wind_kph: previsaoNewIndice && previsaoNewIndice.current.wind_kph,
        humidity: previsaoNewIndice && previsaoNewIndice.current.humidity,
        locale: previsaoNewIndice && previsaoNewIndice.location.name,
        precip_in: previsaoNewIndice && previsaoNewIndice.current.precip_in,
      },
    };

    const latitudeCoordisClickMap = value.geometry.coordinates[1];
    const longitudeCoordisClickMap = value.geometry.coordinates[0];
    dispatch(
      fetchPrevisao({
        latitude: latitudeCoordisClickMap,
        longitude: longitudeCoordisClickMap,
      }),
    );

    if (previsaoNewIndice) {
      dispatch(fetchSaveIndice(indiceCreateToUser));
    }
  }
  return loadingValidateGeolocationUser ? (
    <Loading loading={loadingValidateGeolocationUser || loadingIndices} />
  ) : (
    <View style={styles.containerMapsAndButtons}>
      <FloatingMenu setMapStyle={setMapStyle} />
      <Modal transparent={true} visible={showDetail} animationType='slide'>
        <DetailIndice
          resetIndiceToShow={setIndiceToShow}
          indice={indiceToShow}
          indiceCoords={indiceCoords}
          closeIndiceDetail={setShowDetail}
        />
      </Modal>
      <MapboxGL.MapView
        onLongPress={(value) => {
          if (indiceToShow === null) {
            Alert.alert('', 'deseja registrar um novo foco de incêndio?', [
              {
                text: 'Não',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Sim',
                onPress: () => _saveIndice(value),
              },
            ]);
          }
        }}
        styleURL={mapStyle}
        zoomLevel={20}
        logoEnabled={false}
        attributionEnabled={false}
        centerCoordinate={[userGeolocation.longitude, userGeolocation.latitude]}
        style={styles.containerMap}>
        <MapboxGL.Camera
          zoomLevel={10}
          // zoom pra cima
          minZoomLevel={7}
          // zoom pra baixo
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
            if (coordinate.ativo) {
              return (
                <MapboxGL.MarkerView
                  key={index}
                  coordinate={[
                    Number(coordinate.longitude),
                    Number(coordinate.latitude),
                  ]}>
                  {coordinate.userCreated ? (
                    <View style={styles.containerIndexFire}>
                      <IconSimple
                        onPress={() => {
                          setShowDetail(true);
                          setIndiceCoords({
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                          });
                          setIndiceToShow(coordinate);
                        }}
                        name='fire'
                        size={30}
                        color={'#FFF000'}
                      />
                    </View>
                  ) : (
                    <View style={styles.containerIndexFire}>
                      <IconSimple
                        onPress={() => {
                          setShowDetail(true);
                          setIndiceCoords({
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                          });
                          setIndiceToShow(coordinate);
                        }}
                        name='fire'
                        size={30}
                        color={
                          coordinate.brightness >= 500 ? '#F00' : '#ff4500'
                        }
                      />
                    </View>
                  )}
                </MapboxGL.MarkerView>
              );
            }
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
