/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import firebase from "../../../shared/services/firebase";
import Geolocation from "react-native-geolocation-service";
import MapboxGL, { Logger } from "@react-native-mapbox-gl/maps";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MAP_BOX_KEY } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { weather } from "../../../shared/services/weather";
import { BackHandler, View, StatusBar } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import { watermelonDB } from "../../../shared/services/watermelonDB";
import { firesIndicesActions, loadingActions } from "../../../store/actions";
import { getMoment, formatDatetime } from "../../../shared/utils/formatDate";
import { PERMISSION_LOCATION_USE } from "../../../constants";
import styles, { ButtonClose, Container, ContainerButtonClose } from "./styles";
import { ButtonRecorder } from "../../../components/UI";
import {
	Menu,
	Filter,
	Forecast,
	FireIndiceDetails,
	ModalConfirmation,
	ModalNotification
} from "../../../components/Layout";

const Map = ({ route }) => {

	MapboxGL.setAccessToken(MAP_BOX_KEY);

	const dispatch = useDispatch();
	const netInfo = useNetInfo();
	const mapRef = useRef();

	const { enableLoading, disableLoading } = loadingActions;
	const { loadFireIndices, loadFireIndicesOffline, addFireIndice } = firesIndicesActions;
	const { getForecast } = weather();

	const {
		getFiresIndices,
		registerNewEvidence,
		registerNewFireIndice
	} = firebase();

	const {
		saveFireIndiceOffline,
		clearFireIndicesOffline,
		fetchFiresIndicesOffline,
		fetchEvidencesOffline
	} = watermelonDB();

	const [filterDays, setFilterDays] = useState(1);
	const [sourceTrail, setSourceTrail] = useState();
	const [showModalFilter, setShowModalFilter] = useState(false);
	const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Street);
	const [notification, setNofication] = useState({ show: false, message: "" });
	const [fireIndiceDetails, setFireIndiceDetails] = useState({ isVisible: false, fireIndice: null });
	const [showModalNewFireIndice, setShowModalNewFireIndice] = useState({ show: false, data: null });
	const [showButtonRecorderRouter, setShowButtonRecorderRouter] = useState({ show: false, fireIndice: null});
	const [userGeolocation, setUserGeolocation] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0,
		longitudeDelta: 0,
	});

	const user = useSelector((state) => state.auth);
	const firesIndicesActivated = useSelector((state) => state.firesIndices);

	Logger.setLogCallback((log) => {
		const { message } = log;

		// expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
		if (
			message.match("Request failed due to a permanent error: Canceled") ||
			message.match("Request failed due to a permanent error: Socket Closed")
		) {
			return true;
		}
		return false;
	});

	// Monitor do status da rede do dispositivo
	useEffect(() => {
		if( netInfo.isConnected !== null && !netInfo.isConnected ) {
			setNofication({
				show: true,
				message: `Sem Conexão!
        \nTodos os registros cadastrados manualmente serão enviado para a base de dados ao se conectar novamente.`
			});
		}
	}, [netInfo]);

	// Exibir trilhas
	useEffect(() => {
		const params = route.params;

		if( params ) {
			const { recoderTrailIsActive, fireIndice, coordinates } = params;
			if( recoderTrailIsActive ) {
				setShowButtonRecorderRouter({ show: true, fireIndice });
			} else if( coordinates ) {
				setSourceTrail({
					type: "FeatureCollection",
					features: [
						{
							type: "Feature",
							properties: {},
							geometry: {
								type: "LineString",
								coordinates
							}
						}
					]
				});
			}
		}
	}, [route]);

	// Sincronizar dados offline
	useEffect(() => {
		const saveFireIndiceToWatermelon = async () => {
			// const data = await fetchFiresIndicesOffline();
			// data.forEach(async (fireIndice) => {
			// 	const fireIndiceFormatted = {
			// 		...fireIndice,
			// 		status: JSON.parse(fireIndice.status)
			// 	};

			// 	//const uidFireIndice = await saveFireIndice(fireIndiceFormatted);
			// 	// const evidences = await fetchEvidencesOffline(fireIndice.id);

			// 	// evidences.forEach(async (evidence) => {
			// 	// 	await registerNewEvidence(evidence.path, user.registration, uidFireIndice);

			// 	// });
			// });

			clearFireIndicesOffline();
		};

		const loadDataOffiline = async () => {
			const data = await fetchFiresIndicesOffline();
			dispatch(loadFireIndices(data));
		};

		if( netInfo.isConnected ) {
			saveFireIndiceToWatermelon();
		} else {
			loadDataOffiline();
		}
	}, [netInfo.isConnected]);

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			return true;
		});
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			if( netInfo.isConnected ) {
				await fetchFireIndices();
			} else {
				const data = await fetchFiresIndicesOffline();
				dispatch(loadFireIndicesOffline(data));
			}
		};

		if( netInfo.isConnected !== null ) {
			fetchData();
		}
	}, [netInfo]);

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
			(err) => console.warn("Error on loading user geolocation ", err),
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
			(err) => console.warn("Error on get current position user ", err),
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 2000,
			},
		);

		return () => Geolocation.clearWatch(watchPosition);
	}, []);

	async function fetchFireIndices() {
		const data = await getFiresIndices();
		dispatch(loadFireIndices(data));
	}

	function createNewFireIndice(event) {

		const [longitude, latitude] = event.geometry.coordinates;

		return {
			latitude,
			longitude,
			userCreated: true,
			active: true,
			daynight: getMoment(),
			status: {
				registered_at: formatDatetime(new Date()),
				in_attendance_at: "",
				finished_at: ""
			}
		};
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

		dispatch(enableLoading("Salvando novo registro..."));

		const weather = await getForecast(fireIndice.longitude, fireIndice.latitude);
		const newIndice = {
			brightness: null,
			brightness_2: null,
			confidence: "100",
			frp: "",
			satellite: "",
			scan: "",
			track: "",
			version: "",
			weather,
			...fireIndice
		};
		const uid = await registerNewFireIndice(newIndice);

		dispatch(addFireIndice({...newIndice, uid}));
		fetchFireIndices();
		dispatch(disableLoading());

		return uid;
	}

	function returnToLocaleHandler() {
		mapRef.current.moveTo([
			userGeolocation.longitude,
			userGeolocation.latitude,
		]);
	}

	function showFireIndiceDetails(fireIndice) {

		const copyFireIndice = {...fireIndice};

		if( typeof copyFireIndice.status === "string" ) {
			copyFireIndice.status = JSON.parse(copyFireIndice.status);
		}

		setFireIndiceDetails({
			isVisible: true,
			fireIndice: copyFireIndice
		});
	}

	function updateDaysSliderHandler(days) {
		setFilterDays(days);
	}

	function closeModalFilter() {
		setShowModalFilter(false);
	}

	function closeModalFireIndiceDetails() {
		setFireIndiceDetails({
			isVisible: false,
			fireIndice: null
		});
	}

	function confirmNofifactionHandler() {
		setNofication({ show: false, message: "" });
	}

	function showRocorderRouterHandler() {
		setShowButtonRecorderRouter((currentState) => !currentState);
	}

	function renderFiresIndices() {
		return (
			firesIndicesActivated.map((register, index) => {
				if(register.active) {
					return(
						<MapboxGL.MarkerView
							key={index}
							coordinate={[
								register.latitude,
								register.longitude
							]}
						>
							{register.userCreated ? (
								<View style={styles.containerIndexFire}>
									<IconSimple
										name='fire'
										size={30}
										color={"#FFF000"}
										onPress={() => showFireIndiceDetails(register)}
									/>
								</View>
							) : (
								<View style={styles.containerIndexFire}>
									<IconSimple
										name='fire'
										size={30}
										onPress={() => showFireIndiceDetails(register)}
										color={register.brightness >= 500 ? "#F00" : "#FF4500"}
									/>
								</View>
							)}
						</MapboxGL.MarkerView>
					);
				}
			})
		);
	}

	function cancelRecoderHandler() {
		setShowButtonRecorderRouter({ show: false, fireIndice: null});
	}

	return(
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

			{ fireIndiceDetails.fireIndice &&
				<FireIndiceDetails
					fireIndice={fireIndiceDetails.fireIndice}
					isVisible={fireIndiceDetails.isVisible}
					onClose={closeModalFireIndiceDetails}
				/>
			}

			<ModalNotification
				isVisible={notification.show}
				message={notification.message}
				onConfirm={confirmNofifactionHandler}
			/>

			<ModalConfirmation
				isVisible={showModalNewFireIndice.show}
				message={
					`${!netInfo.isConnected ? "Registro offline\n\n" : ""}Deseja adicionar um novo registro de incêndio ?`
				}
				onConfirm={generateFireIndice}
				onCancel={() => setShowModalNewFireIndice({ show: false, data: null })}
			/>

			<Container>

				{netInfo.isConnected && <Forecast userCoordinates={userGeolocation} />}

				<Menu
					onLocation={returnToLocaleHandler}
					onFilter={() => setShowModalFilter(true)}
					onRecorderRouter={showRocorderRouterHandler}
					setMapStyle={setMapStyle}
				/>

				{ showButtonRecorderRouter.show && (
					<ButtonRecorder
						currentCoordinates={userGeolocation}
						userRegistration={user.registration}
						onCancel={cancelRecoderHandler}
						uidFireIndice={showButtonRecorderRouter.fireIndice.uid}
					/>
				)}

				{ sourceTrail && (
					<ContainerButtonClose>
						<ButtonClose onPress={() => setSourceTrail(null)}>
							<AntDesign name="close" color="#FFF" size={20}/>
						</ButtonClose>
					</ContainerButtonClose>
				)}

				<MapboxGL.MapView
					animated={true}
					zoomLevel={20}
					logoEnabled={false}
					styleURL={mapStyle}
					compassEnabled={false}
					attributionEnabled={false}
					style={styles.containerMap}
					renderToHardwareTextureAndroid={true}
					onLongPress={(event) => setShowModalNewFireIndice({ show: true, data: event })}
					centerCoordinate={[
						userGeolocation.longitude,
						userGeolocation.latitude,
					]}
				>
					<MapboxGL.Camera
						ref={mapRef}
						zoomLevel={13}                    // zoom pra cima
						minZoomLevel={7}                  // zoom pra baixo
						maxZoomLevel={20}
						animationMode={"flyTo"}
						animationDuration={1100}
						centerCoordinate={[
							userGeolocation.longitude,
							userGeolocation.latitude,
						]}
					/>

					{ sourceTrail && (
						<MapboxGL.ShapeSource
							id="trail"
							shape={sourceTrail}
						>
							<MapboxGL.LineLayer
								id="trailRoute"
								style={{ lineColor: "red", lineWidth: 5 }}
							/>
						</MapboxGL.ShapeSource>
					)}

					<MapboxGL.UserLocation
						showsUserHeadingIndicator={true}
						visible={true}
						renderMode='native'
					/>

					{renderFiresIndices()}
				</MapboxGL.MapView>
			</Container>
		</React.Fragment>
	);
};

export default Map;