/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from "react";
import Geolocation from "react-native-geolocation-service";
import MapboxGL, { Logger } from "@react-native-mapbox-gl/maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { useNetInfo } from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";

import { PERMISSION_LOCATION_USE, MAP_BOX_KEY } from "../../../constants";
import firebase  from "../../../shared/services/firebase";
import weather from "../../../shared/services/weather";
import watermelonDB from "../../../shared/services/watermelonDB";
import { formatDatetime } from "../../../shared/utils/formatDate";
import { firesActions, loaderActions } from "../../../store/actions";
import { LineString } from "../../../helpers";

import { useTheme } from "styled-components";
import { RecorderButton } from "../../../components/UI";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import IconSimple from "react-native-vector-icons/SimpleLineIcons";
import { BackHandler, StatusBar, TouchableOpacity } from "react-native";
import {
	Menu,
	Filter,
	Forecast,
	FireIndiceDetails,
	ModalConfirmation,
	ModalNotification,
	MapManagerControl,
	ModalWarning,
	ModalInput
} from "../../../components/Layout";
import {
	ButtonClose,
	Container,
	Actions,
	NotificationContainer,
	Notification,
	TextNotification
} from "./styles";

const Map = ({ route }) => {

	MapboxGL.setAccessToken(MAP_BOX_KEY);

	const dispatch = useDispatch();
	const netInfo = useNetInfo();
	const mapRef = useRef();
	const theme = useTheme();
	const offlineManager = MapboxGL.offlineManager;

	const { getForecast } = weather();
	const { enableLoading, disableLoading } = loaderActions;
	const {
		loadFires,
		loadFiresOffline,
		storeFires
	} = firesActions;

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
	} = watermelonDB().fireIndiceManagerDB();

	const [mapManagerIsOpen, setMapManagerIsOpen] = useState(false);
	const [filterDays, setFilterDays] = useState(1);
	const [mapZoomIsEnabled, setMapZoomIsEnabled] = useState(true);
	const [sourceTrail, setSourceTrail] = useState();
	const [showModalFilter, setShowModalFilter] = useState(false);
	const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Street);
	const [notification, setNofication] = useState({ show: false, message: "" });
	const [error, setError] = useState("");
	const [fireIndiceDetails, setFireIndiceDetails] = useState({
		isVisible: false, fireIndice: null
	});
	const [showModalNewFireIndice, setShowModalNewFireIndice] = useState({
		show: false, data: null
	});
	const [showButtonRecorderRouter, setShowButtonRecorderRouter] = useState({
		show: false, fireIndice: null
	});
	const [downloadArea, setDownloadArea] = useState({
		northeast: null,
		southwest: null
	});
	const [inputModal, setInputModal] = useState({
		show: false,
		message: "",
		label: "",
		data: null
	});

	const [userGeolocation, setUserGeolocation] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0,
		longitudeDelta: 0,
	});

	const user = useSelector((state) => state.auth);
	const firesIndicesActivated = useSelector((state) => state.fires.filtered);

	Logger.setLogCallback((log) => {
		const { message } = log;

		// expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
		return message.match("Request failed due to a permanent error: Canceled") ||
			message.match("Request failed due to a permanent error: Socket Closed");
	});

	// Monitor do status da rede do dispositivo
	useEffect(() => {
		if (netInfo.isConnected !== null && !netInfo.isConnected) {
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

		if (params) {
			const { recoderTrailIsActive, fireIndice, coordinates } = params;
			if (recoderTrailIsActive) {
				setShowButtonRecorderRouter({ show: true, fireIndice: fireIndice.uid });
			} else if (coordinates) {
				LineString.features[0].geometry.coordinates = [];
				LineString.features[0].geometry.coordinates = coordinates;
				setSourceTrail(LineString);
			}
		}
	}, [route]);

	// Sincronizar dados offline
	useEffect(() => {
		const syncDataOffline = async () => {
			const data = await fetchFiresIndicesOffline();
			data.forEach(async (fireIndice, index) => {
				const fireIndiceFormatted = {
					latitude: fireIndice.longitude,
					longitude: fireIndice.latitude,
					userCreated: fireIndice.userCreated,
					active: fireIndice.active,
					status: JSON.parse(fireIndice.status)
				};

				const uidFireIndice = await saveFireIndice(fireIndiceFormatted);
				const evidences = await fetchEvidencesOffline(fireIndice.id);

				evidences.forEach(async (evidence) => {
					await registerNewEvidence(
						evidence.path, evidence.fileType, user.registration, uidFireIndice
					);
				});

				if (index === data.length - 1)
					clearFireIndicesOffline();

			});

		};

		const loadDataOffiline = async () => {
			const data = await fetchFiresIndicesOffline();
			dispatch(loadFires(data));
		};

		const verify = async () => {
			if (netInfo.isConnected !== null) {
				if (netInfo.isConnected)
					syncDataOffline();
				else
					loadDataOffiline();
			}
		};

		verify();
	}, [netInfo.isConnected]);

	useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", () => {
			return true;
		});
	}, []);

	// Carregar dados
	useEffect(() => {
		const fetchData = async () => {
			if (netInfo.isConnected) {
				await fetchFireIndices();
			} else {
				const data = await fetchFiresIndicesOffline();
				dispatch(loadFiresOffline(data));
			}
		};

		if (netInfo.isConnected !== null)
			fetchData();

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

	// load user location
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
			(err) => console.warn("Error on getting current user position ", err),
			{
				enableHighAccuracy: true,
				timeout: 20000,
				maximumAge: 2000,
			},
		);

		return () => Geolocation.clearWatch(watchPosition);
	}, []);

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.zoomTo(13);

			if (mapManagerIsOpen) {
				setMapZoomIsEnabled(false);
			} else {
				setMapZoomIsEnabled(true);
			}
		}
	}, [mapManagerIsOpen]);

	async function fetchFireIndices() {
		const data = await getFiresIndices();
		dispatch(loadFires(data));
	}

	function createNewFireIndice(event) {
		const [longitude, latitude] = event.geometry.coordinates;

		return {
			latitude,
			longitude,
			userCreated: true,
			active: true,
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

		if (netInfo.isConnected) {
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

		dispatch(storeFires({ ...newIndice, uid }));
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
		const copyFireIndice = { ...fireIndice, status: fireIndice.status };

		if (typeof copyFireIndice.status === "string") {
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
				if (register.active) {
					return (
						<MapboxGL.PointAnnotation
							id={`${index}`}
							onSelected={() => showFireIndiceDetails(register)}
							onDeselected={() => showFireIndiceDetails(register)}
							key={index}
							coordinate={[
								register.latitude,
								register.longitude
							]}
						>
							{register.userCreated ? (
								<TouchableOpacity>
									<IconSimple
										name='fire'
										size={30}
										color={theme.colors.icon["accent-color-v2"]}
									/>
								</TouchableOpacity>
							) : (
								<TouchableOpacity>
									<IconSimple
										name='fire'
										size={30}
										color={register.brightness >= 500 ?
											theme.colors.icon["accent-color-v1"] :
											theme.colors.icon["accent-color-v3"]
										}
									/>
								</TouchableOpacity>
							)}
						</MapboxGL.PointAnnotation>
					);
				}
			})
		);
	}

	function cancelRecoderHandler() {
		setShowButtonRecorderRouter({ show: false, fireIndice: null });
	}

	async function generateDownloadArea(event) {
		const bounds = event.properties.visibleBounds;
		const [northeast, southwest] = bounds;
		setDownloadArea({ northeast, southwest });
	}

	function handleCreateArea() {
		checkConnection(() => {
			setInputModal({
				show: true,
				message: "nome da área",
				label: "Área"
			});
		});
	}

	async function handleAddNewPack(areaName) {
		handleCloseInputModal();

		checkConnection(async () => {
			const progressListener = (_, status) => {
				if (status.percentage === 100) {
					dispatch(disableLoading());
					Toast.show({
						type: "success",
						text1: "Área baixada com sucesso!",
						text2: "Verifique a lista de áreas salvas",
						visibilityTime: 5000
					});
				} else {
					dispatch(enableLoading(~~status.percentage + "%"));
				}
			};

			await offlineManager.createPack({
				name: areaName,
				styleURL: mapStyle,
				minZoom: 10,
				maxZoom: 13,
				bounds: [
					downloadArea.northeast,		//Northeast (superior direito) longitude latitude
					downloadArea.southwest		//Southwest (inferior esquerdo) longitude latitude
				]
			}, progressListener, () => {})
				.catch(() => {
					setError("Uma área com o mesmo nome já foi baixada.");
				});
		});
	}

	function checkConnection(onConnected) {
		if (netInfo.isConnected) {
			onConnected();
		} else {
			setError("Não é possível baixar novas áreas sem conexão!");
		}
	}

	function handleCloseInputModal() {
		setInputModal({
			show: false,
			message: "",
			label: ""
		});
	}

	return (
		<>
			<StatusBar barStyle='light-content' backgroundColor='#000' />

			{showModalFilter && (
				<Filter
					filterDays={filterDays}
					visible={showModalFilter}
					closeModal={closeModalFilter}
					onUpdateDaysSlider={updateDaysSliderHandler}
				/>
			)}

			{fireIndiceDetails.fireIndice && (
				<FireIndiceDetails
					fireIndice={fireIndiceDetails.fireIndice}
					isVisible={fireIndiceDetails.isVisible}
					onClose={closeModalFireIndiceDetails}
				/>
			)}

			{!!error && (
				<ModalWarning
					isVisible={!!error}
					message={error}
					onConfirm={() => setError("")}
				/>
			)}

			{notification.show && (
				<ModalNotification
					isVisible={notification.show}
					message={notification.message}
					onConfirm={confirmNofifactionHandler}
				/>
			)}

			{inputModal.show && (
				<ModalInput
					message={inputModal.message}
					onConfirm={handleAddNewPack}
					onCancel={handleCloseInputModal}
					onChangeText={newName => setAreaName(newName)}
					keyboardType='default'
				/>
			)}

			{showModalNewFireIndice.show && (
				<ModalConfirmation
					isVisible={showModalNewFireIndice.show}
					message={
						`${!netInfo.isConnected ? "Registro offline\n\n" : ""}Deseja adicionar um novo registro de incêndio?`
					}
					onConfirm={generateFireIndice}
					onCancel={() => setShowModalNewFireIndice({ show: false, data: null })}
				/>
			)}

			<Container>
				{netInfo.isConnected && !mapManagerIsOpen && (
					<Forecast userCoordinates={userGeolocation} />
				)}

				{!mapManagerIsOpen && (
					<Menu
						handleLocation={returnToLocaleHandler}
						handleFilter={() => setShowModalFilter(true)}
						onRecorderRouter={showRocorderRouterHandler}
						handleMapStyle={setMapStyle}
						handleMapManager={() => setMapManagerIsOpen(true)}
					/>
				)}

				{showButtonRecorderRouter.show && (
					<RecorderButton
						currentCoordinates={userGeolocation}
						userRegistration={user.registration}
						onCancel={cancelRecoderHandler}
						uidFireIndice={showButtonRecorderRouter.fireIndice}
					/>
				)}

				{sourceTrail && (
					<Actions>
						<ButtonClose onPress={() => setSourceTrail(null)}>
							<AntDesign name="close" color="#FFF" size={20} />
						</ButtonClose>
					</Actions>
				)}

				<MapboxGL.MapView
					animated={true}
					logoEnabled={false}
					zoomEnabled={mapZoomIsEnabled}
					styleURL={mapStyle}
					compassEnabled={false}
					attributionEnabled={false}
					style={{ flex: 1 }}
					renderToHardwareTextureAndroid={true}
					onLongPress={(event) => {
						if (!mapManagerIsOpen) {
							setShowModalNewFireIndice({ show: true, data: event });
						}
					}}
					onRegionDidChange={(event) => {
						if (mapManagerIsOpen) {
							generateDownloadArea(event);
						}
					}}
					centerCoordinate={[
						userGeolocation.longitude,
						userGeolocation.latitude,
					]}
				>
					<MapboxGL.Camera
						ref={mapRef}
						zoomLevel={13}
						minZoomLevel={7}
						maxZoomLevel={20}
						animationMode={"flyTo"}
						animationDuration={1100}
						centerCoordinate={[
							userGeolocation.longitude,
							userGeolocation.latitude,
						]}
					/>

					{sourceTrail && (
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

				{mapManagerIsOpen && (
					<>
						<MapManagerControl
							onDownload={handleCreateArea}
							onCancel={() => setMapManagerIsOpen(false)}
						/>

						<NotificationContainer>
							<Notification>
								<Ionicons
									name="alert-circle-outline"
									color="#FFF"
									size={25}
								/>
								<TextNotification>
									Posicione-se sobre a área de download
								</TextNotification>
							</Notification>
						</NotificationContainer>
					</>
				)}
			</Container>
		</>
	);
};

export default Map;
