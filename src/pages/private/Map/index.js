import React, { useEffect, useRef, useState } from 'react';
import styles, { Container } from './styles';
import useNotify from '../../../hooks/useNotify';
import getMoment from '../../../shared/utils/getMoment';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL, { Logger } from '@react-native-mapbox-gl/maps';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../../../components/UI';
import { MAP_BOX_KEY } from '../../../config/keys';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { PERMISSION_LOCATION_USE } from '../../../constants/keys';
import { fetchPrevisao } from '../../../redux/previsao/previsao-action';
import { BackHandler, Modal, View, StatusBar } from 'react-native';
import {
  fetchIndicesIncendios,
  fetchSaveIndice,
} from '../../../redux/fire-indices/fire-indices-action';
import {
  Forecast,
  CustomModal, 
  Filter, 
  FireIndiceDetails,
  Menu,
  ModalNotification, 
  ModalNewFireIndice 
} from '../../../components/Layout';
import { realmDB } from '../../../shared/services/realmDB';
import { weather } from '../../../shared/services/weather';

const Map = () => {

  MapboxGL.setAccessToken(MAP_BOX_KEY);

  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const mapRef = useRef();
  const isFocused = useIsFocused();
  const notifyEvidenceUploaded = useNotify();

  const { saveFireIndiceOffline, getFireIndicesOffline, clearFireIndicesOffline } = realmDB();
  const { getForecast } = weather();

  const [filterDays, setFilterDays] = useState(1);
  const [indiceCoords, setIndiceCoords] = useState();
  const [showDetail, setShowDetail] = useState(false);
  const [indiceToShow, setIndiceToShow] = useState(null);
  const [coordsClickInMap, setCoordsClickInMap] = useState();
  const [showModalFilter, setShowModalFilter] = useState(false);
  const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Street);
  const [notification, setNofication] = useState({ show: false, message: '' });
  const [showModalNewFireIndice, setShowModalNewFireIndice] = useState({ show: false, data: null });
  const [loadingValidateGeolocationUser, setLoadingValidateGeolocationUser] = useState(false);
  const [userGeolocation, setUserGeolocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  });

  const indices = useSelector((state) => state.indicesIncendios.data);
  const previsaoNewIndice = useSelector((state) => state.previsao.data);
  const errorsRequest = useSelector((state) => state.indicesIncendios.error);
  const loadingIndices = useSelector((state) => state.indicesIncendios.loading);
  const indiceSaved = useSelector((state) => state.indicesIncendios.indiceSaved);

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
    if( netInfo.isConnected !== null && !netInfo.isConnected ) {
      setNofication({ 
        show: true, 
        message: `Sem Conexão! 
        \nTodos os registros cadastrados manualmente serão enviado para a base de dados ao se conectar novamente.`
      });
    }
  }, [netInfo]);

  useEffect(() => {

    async function loadDataOffline() {

      const data = await getFireIndicesOffline();

      data.map(async (fireIndice) => {
        saveFireIndice(fireIndice);  
      });

      clearFireIndicesOffline();
    }

    if( netInfo.isConnected ) {
      loadDataOffline();
    }
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useEffect(() => {
    dispatch(fetchIndicesIncendios());
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
    if (indiceSaved) {
      dispatch(fetchIndicesIncendios());
    }
  }, [dispatch, indiceSaved]);

  function createNewFireIndice(event) {
    const [latitude, longitude] = event.geometry.coordinates;
    const date = new Date();
    const dateFormated = date.toLocaleDateString('en-CA');

    return {
      latitude,
      longitude,
      acq_date: dateFormated,
      acq_datetime: `${dateFormated} ${date.getHours()}:${date.getMinutes()}:00`,
      userCreated: true,
      active: true,
      WKT: `POINT (${longitude} ${latitude})`,
      daynight: getMoment()
    }
  }

  function generateFireIndice() {

    const data = showModalNewFireIndice.data;
    const indiceCreated = createNewFireIndice(data);
    
    if( netInfo.isConnected ) {
      saveFireIndice(indiceCreated);
    } else {
      saveFireIndiceOffline(indiceCreated);
    }
    
    setShowModalNewFireIndice({ show: false, data: null });
  }

  async function saveFireIndice(fireIndice) {

    const weather = await getForecast(fireIndice.latitude, fireIndice.longitude);

    const newIndice = {
      acq_datetime: null,
      brightness: null,
      brightness_2: null,
      confidence: '100',
      frp: null,
      satellite: '',
      scan: '',
      track: '',
      version: '',
      weather,
      ...fireIndice
    };

    dispatch(fetchSaveIndice(newIndice));
    dispatch(fetchIndicesIncendios());
  }

  function returnToLocaleHandler() {
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

  function updateDaysSliderHandler(days) {
    setFilterDays(days);
  }

  function closeModalFilter() {
    setShowModalFilter(false);
  }

  function confirmNofifactionHandler() {
    setNofication({ show: false, message: '' });
  }

  function renderIndices() {
    return (
      indices &&
      indices.map((register, index) => {
        if (register.active) {
          return (
            <MapboxGL.MarkerView
              key={index}
              coordinate={[
                register.latitude,
                register.longitude
              ]}>
              {register.userCreated ? (
                <View style={styles.containerIndexFire}>
                  <IconSimple
                    onPress={() => {
                      showIndiceDetail(register);
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
                      showIndiceDetail(register);
                    }}
                    name='fire'
                    size={30}
                    color={register?.brightness >= 500 ? '#F00' : '#ff4500'}
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
    <Loading isVisible={loadingValidateGeolocationUser || loadingIndices} />
  ) : (
    <React.Fragment>
      <StatusBar barStyle='light-content' backgroundColor='#000'/>
      { showModalFilter && (
        <Filter
          filterDays={filterDays}
          visible={showModalFilter}
          closeModal={closeModalFilter}
          onUpdateDaysSlider={updateDaysSliderHandler}
        />
      )}

      <Modal transparent={true} visible={showDetail} animationType='slide'>
        <FireIndiceDetails
          resetIndiceToShow={setIndiceToShow}
          indiceFromMap={indiceToShow}
          indiceCoords={indiceCoords}
          closeIndiceDetail={setShowDetail}
        />
      </Modal>

      <ModalNotification 
        isVisible={notification.show}
        message={notification.message}
        onConfirm={confirmNofifactionHandler}
      />

      <ModalNewFireIndice
        visible={showModalNewFireIndice.show}
        onConfirm={generateFireIndice}
        onCancel={() => setShowModalNewFireIndice({ show: false, data: null })}
      />
        
      <Container>

        <Forecast userCoordinates={userGeolocation} />

        <Menu
          onLocation={returnToLocaleHandler}
          onFilter={() => setShowModalFilter(true)}
          setMapStyle={setMapStyle}
        />
      
        <MapboxGL.MapView
          animated={true}
          renderToHardwareTextureAndroid={true}
          onLongPress={(event) => setShowModalNewFireIndice({ show: true, data: event })}
          styleURL={mapStyle}
          zoomLevel={20}
          compassEnabled={false}
          logoEnabled={false}
          attributionEnabled={false}
          centerCoordinate={[
            userGeolocation.longitude,
            userGeolocation.latitude,
          ]}
          style={styles.containerMap}>

          <MapboxGL.Camera
            ref={mapRef}
            zoomLevel={13}        // zoom pra cima
            minZoomLevel={7}      // zoom pra baixo
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

          {renderIndices()}
        </MapboxGL.MapView>

        {notifyEvidenceUploaded}
      </Container>
    </React.Fragment>
  );
};

export default Map;
