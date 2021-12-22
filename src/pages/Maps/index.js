import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Modal, Text, TouchableOpacity, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import { MAP_BOX_KEY } from '../../config/keys';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import useNotify from '../../hooks/useNotify';
import {
  fetchIndicesIncendios,
  fetchSaveIndice,
} from '../../redux/indices-incendios/indices-incendios-action';
import { fetchPrevisao } from '../../redux/previsao/previsao-action';
import getMoment from '../../utils/getMoment';
import CustomModal from '../components/CustomModal';
import Filter from '../components/Filter';
import Loading from '../components/Loading';
import DetailIndice from '../DetailIndice';
import FloatingMenu from '../FloatingMenu';
import ModalNovoIndice from '../ModalNovoIndice';
import Previsao from '../Previsao';
import styles from './styles';
const Maps = () => {
  const dispatch = useDispatch();
  MapboxGL.setAccessToken(MAP_BOX_KEY);
  const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Street);
  const indices = useSelector((state) => state.indicesIncendios.data);
  const loadingIndices = useSelector((state) => state.indicesIncendios.loading);
  const errorsRequest = useSelector((state) => state.indicesIncendios.error);
  const mapRef = useRef();
  const indiceSaved = useSelector(
    (state) => state.indicesIncendios.indiceSaved,
  );
  const [isConnect, setIsConnect] = useState(true);
  const connect = useNetInfo();

  const [showDetail, setShowDetail] = useState(false);
  const [indiceCoords, setIndiceCoords] = useState();
  const [indiceToShow, setIndiceToShow] = useState(null);
  const [showMessageIndicesNotFound, setShowMessageIndicesNotFound] =
    useState(false);

  const [showModalNotConnect, setShowModalNotConnect] = useState(false);
  const [userGeolocation, setUserGeolocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });
  const [loadingValidateGeolocationUser, setLoadingValidateGeolocationUser] =
    useState(false);

  const previsaoNewIndice = useSelector((state) => state.previsao.data);

  const [showModalNovoIndice, setShowModalNovoIndice] = useState(false);
  const [coordsClickInMap, setCoordsClickInMap] = useState();
  const [showModalFilter, setShowModalFilter] = useState(false);
  const isFocused = useIsFocused();
  const notifyEvidenceUploaded = useNotify();

  Logger.setLogCallback((log) => {
    const { message } = log;

    // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
    if (
      message.match('Request failed due to a permanent error: Canceled') ||
      message.match('Request failed due to a permanent error: Socket Closed')
    ) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    setIsConnect(connect.isConnected);
  }, [connect.isConnected]);

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
      setShowMessageIndicesNotFound(true);
    }
  }, [errorsRequest, indices, loadingIndices, loadingValidateGeolocationUser]);

  useEffect(() => {
    if (indiceSaved) {
      dispatch(fetchIndicesIncendios());
    }
  }, [dispatch, indiceSaved]);

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
    dispatch(fetchSaveIndice(indiceCreateToUser));
  }

  function returnToLocale() {
    mapRef.current.moveTo([
      userGeolocation.longitude,
      userGeolocation.latitude,
    ]);
  }

  function showIndiceDetail(coordinate) {
    setShowDetail(true);
    setIndiceToShow(coordinate);
    setIndiceCoords({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
  }

  function closeModalFilter() {
    setShowModalFilter(false);
  }

  function renderIndices() {
    return (
      indices &&
      indices.map((coordinate, index) => {
        if (coordinate.active) {
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
                      showIndiceDetail(coordinate);
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
                      showIndiceDetail(coordinate);
                    }}
                    name='fire'
                    size={30}
                    color={coordinate?.brightness >= 500 ? '#F00' : '#ff4500'}
                  />
                </View>
              )}
            </MapboxGL.MarkerView>
          );
        }
      })
    );
  }

  return loadingValidateGeolocationUser ? (
    <Loading loading={loadingValidateGeolocationUser || loadingIndices} />
  ) : (
    <>
      <Filter
        visible={showModalFilter}
        closeModal={closeModalFilter}
        indices={indices}
      />
      <CustomModal
        visible={showModalNotConnect}
        message={
          'Você não possui acesso a rede.\nPortanto, não poderá fazer um registro de incêndio'
        }
        onConfirm={() => setShowModalNotConnect(false)}
        enableButtonCancel={false}
        labelButtonConfirm={'Fechar!'}
      />
      <Modal transparent={true} visible={showDetail} animationType='slide'>
        <DetailIndice
          resetIndiceToShow={setIndiceToShow}
          indiceFromMap={indiceToShow}
          indiceCoords={indiceCoords}
          closeIndiceDetail={setShowDetail}
        />
      </Modal>

      {!loadingIndices &&
        !loadingValidateGeolocationUser &&
        indices === null &&
        isFocused && (
          <Modal visible={showMessageIndicesNotFound} transparent={true}>
            <View style={styles.containerIndicesNotFound}>
              <Text style={styles.labelIndiceNotFound}>
                {`${'!Ops.\nNão foi possível carregar os dados'}`}
              </Text>
              <TouchableOpacity
                style={styles.btnOkIndiceNotFound}
                onPress={() => setShowMessageIndicesNotFound(false)}>
                <Text
                  style={[styles.labelIndiceNotFound, styles.labelButtonOk]}>
                  Ok
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      <View style={styles.containerMapsAndButtons}>
        <Previsao userCoordinates={userGeolocation} />

        <FloatingMenu setMapStyle={setMapStyle} />
        <View style={styles.containerIconLocation}>
          <IconMaterial
            onPress={() => returnToLocale()}
            name={'my-location'}
            style={styles.styleIcon}
          />
        </View>

        <TouchableOpacity
          onPress={() => setShowModalFilter(true)}
          style={[styles.containerIconLocation, styles.containerFilter]}>
          <IconAwesome5 name={'filter'} style={styles.iconFilter} />
        </TouchableOpacity>

        <ModalNovoIndice
          visible={showModalNovoIndice}
          onConfirm={() => _saveIndice(coordsClickInMap)}
          onCancel={() => setShowModalNovoIndice(false)}
        />
        <MapboxGL.MapView
          animated={true}
          renderToHardwareTextureAndroid={true}
          onLongPress={(value) => {
            if (indiceToShow === null) {
              setCoordsClickInMap(value);

              if (!isConnect) {
                setShowModalNotConnect(true);
              } else {
                setShowModalNovoIndice(true);
              }
            }
          }}
          styleURL={mapStyle}
          zoomLevel={20}
          logoEnabled={false}
          attributionEnabled={false}
          centerCoordinate={[
            userGeolocation.longitude,
            userGeolocation.latitude,
          ]}
          style={styles.containerMap}>
          <MapboxGL.Camera
            ref={mapRef}
            // zoom pra cima
            zoomLevel={13}
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

          <MapboxGL.UserLocation
            showsUserHeadingIndicator={true}
            visible={true}
            renderMode='native'
          />

          {/* {indices &&
           } */}
          {renderIndices()}
        </MapboxGL.MapView>

        {notifyEvidenceUploaded}
      </View>
    </>
  );
};

export default Maps;
