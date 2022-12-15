/* eslint-disable no-undef */
import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Geolocation from "react-native-geolocation-service";
import MapboxGL, { Logger } from "@rnmapbox/maps";
import Toast from "react-native-toast-message";
import { useNetInfo } from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";

import { usePermission } from "../../../hooks/usePermission";
import { MAP_BOX_KEY } from "../../../constants";
import firebase  from "../../../shared/services/firebase";
import weather from "../../../shared/services/weather";
import { firesActions, loaderActions } from "../../../store/actions";
import { LineString } from "../../../helpers";
import { createFireOutbreak } from "../../../helpers/fires";
import {
	clearAllFiresOffline,
	getAllEvidenceByFireOffline,
	getAllFiresOffline,
	getAllTrailsByFireOffline,
	saveFireOffline
} from "../../../shared/services/realm";

import { RecorderButton, FirePoint } from "../../../components/UI";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BackHandler, StatusBar } from "react-native";
import {
	Menu,
	Filter,
	Forecast,
	FireDetails,
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

	MapboxGL.setWellKnownTileServer("Mapbox");
	MapboxGL.setAccessToken(MAP_BOX_KEY);

	const dispatch = useDispatch();
	const netInfo = useNetInfo();
	const mapRef = useRef();
	const { verifyPermission } = usePermission();
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
		registerNewTrail,
		registerNewFireIndice
	} = firebase();

	const [mapManagerIsOpen, setMapManagerIsOpen] = useState(false);
	const [filterDays, setFilterDays] = useState(1);
	const [mapZoomIsEnabled, setMapZoomIsEnabled] = useState(true);
	const [sourceTrail, setSourceTrail] = useState();
	const [showModalFilter, setShowModalFilter] = useState(false);
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [mapStyle, setMapStyle] = useState(MapboxGL.StyleURL.Street);
	const [error, setError] = useState("");
	const [showQuitPrompt, setShowQuitPrompt] = useState(false);
	const [fireDetails, setFireDetails] = useState(null);
	const [coordsNewFire, setCoordsNewFire] = useState(null);
	const [recorderRouter, setRecorderRouter] = useState(null);
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
	const fires = useSelector((state) => state.fires.filtered);
	const activeFires = useMemo(() => fires, [fires]);

	Logger.setLogCallback((log) => {
		const { message } = log;
		return message.match("Request failed due to a permanent error: Canceled") ||
			message.match("Request failed due to a permanent error: Socket Closed");
	});

	// Exibir trilhas
	useEffect(() => {
		const params = route.params;
		if (params) {
			const { recoderTrailIsActive, fire, coordinates } = params;
			if (recoderTrailIsActive) {
				setRecorderRouter(fire.id);
			} else if (coordinates) {
				LineString.features[0].geometry.coordinates = [];
				LineString.features[0].geometry.coordinates = coordinates;
				setSourceTrail(LineString);
			}
		}
	}, [route]);

	// Sincronizar dados offline
	useEffect(() => {
		const syncOfflineData = async () => {
			const data = await getAllFiresOffline();
			data.forEach(async (fire, index) => {
				const fireIndiceFormatted = {
					latitude: fire.longitude,
					longitude: fire.latitude,
					userCreated: fire.userCreated,
					active: fire.active,
					status: JSON.parse(fire.status)
				};

				const uidFireIndice = await saveFireIndice(fireIndiceFormatted);
				const evidences = await getAllEvidenceByFireOffline(fire.id);
				const trails = await getAllTrailsByFireOffline(fire.id);

				evidences.forEach(async (evidence) => {
					await registerNewEvidence(
						evidence.path,
						evidence.fileType,
						user.registration,
						uidFireIndice
					);
				});

				trails.forEach(async (trail) => {
					const data = {
						fireId: trail.fireId,
						start_coordinates: {
							latitude: trail.start_latitude,
							longitude: trail.start_longitude,
						},
						end_coordinates: {
							latitude: trail.end_latitude,
							longitude: trail.end_longitude,
						}
					};
					await registerNewTrail(uidFireIndice, user.registration, data);
				});

				if (index === data.length - 1) {
					clearAllFiresOffline();
				}
			});
		};

		const verify = async () => {
			if (netInfo.isConnected !== null) {
				if (netInfo.isConnected) {
					syncOfflineData();
				} else {
					const data = await getAllFiresOffline();
					dispatch(loadFiresOffline(data));
				}
			}
		};
		verify();
	}, [netInfo.isConnected]);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			if (mapManagerIsOpen)
				setMapManagerIsOpen(false);
			else if(showSubMenu)
				setShowSubMenu(false);
			else
				setShowQuitPrompt(true);

			return true;
		});

		return () => backHandler.remove();
	}, [mapManagerIsOpen, showSubMenu]);

	// Carregar dados
	useEffect(() => {
		const fetchData = async () => {
			if (netInfo.isConnected) {
				await fetchFireIndices();
			} else {
				const data = await getAllFiresOffline();
				dispatch(loadFiresOffline(data));
			}
		};

		if (netInfo.isConnected !== null)
			fetchData();
	}, [netInfo]);

	useEffect(() => {
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

	async function generateFireIndice() {
		const [longitude, latitude] = coordsNewFire.geometry.coordinates;
		const fireOutbreak = createFireOutbreak(latitude, longitude);

		try {
			if (netInfo.isConnected) {
				saveFireIndice(fireOutbreak);
			} else {
				const fire = await saveFireOffline(fireOutbreak);
				dispatch(storeFires(fire));
			}
		} catch {
			Toast.show({
				type: "error",
				text1: "Atenção!",
				text2: "Ocorreu um problema ao salvar o incêndio",
				visibilityTime: 5000
			});
		}
		setCoordsNewFire(null);
	}

	async function saveFireIndice(fireIndice) {
		dispatch(enableLoading("Salvando novo registro"));
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

	const renderFires = useCallback(() => {
		return (
			activeFires.map((register) => {
					return (
						<FirePoint
							key={register.id}
							register={register}
							setFireDetails={setFireDetails}
						/>
					);
			})
		);
	});

	return (
		<>
			<StatusBar barStyle='light-content' backgroundColor='#000' />
			<ModalNotification />

			{showModalFilter && (
				<Filter
					filterDays={filterDays}
					closeModal={() => setShowModalFilter(false)}
					onUpdateDaysSlider={setFilterDays}
				/>
			)}

			{!!fireDetails && (
				<FireDetails
					fire={fireDetails}
					onClose={() => setFireDetails(null)}
				/>
			)}

			{!!error && (
				<ModalWarning
					isVisible={!!error}
					message={error}
					onConfirm={() => setError("")}
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

			{showQuitPrompt && (
				<ModalConfirmation
					isVisible={showQuitPrompt}
					message={"Tem certeza que deseja sair do aplicativo?"}
					onConfirm={() => BackHandler.exitApp()}
					onCancel={() => setShowQuitPrompt(false)}
				/>
			)}

			<ModalConfirmation
				isVisible={!!coordsNewFire}
				message={
					`${!netInfo.isConnected ? "Registro offline\n\n" : ""}Deseja adicionar um novo registro de incêndio?`
				}
				onConfirm={generateFireIndice}
				onCancel={() => setCoordsNewFire(null)}
			/>

			<Container>
				{netInfo.isConnected && !mapManagerIsOpen && (
					<Forecast userCoordinates={userGeolocation} />
				)}

				{!mapManagerIsOpen && (
					<Menu
						showSubMenu={showSubMenu}
						setShowSubMenu={setShowSubMenu}
						handleLocation={returnToLocaleHandler}
						handleFilter={() => setShowModalFilter(true)}
						onRecorderRouter={() => setRecorderRouter((state) => !state)}
						handleMapStyle={setMapStyle}
						handleMapManager={() => setMapManagerIsOpen(true)}
					/>
				)}

				{recorderRouter && (
					<RecorderButton
						currentCoordinates={userGeolocation}
						userRegistration={user.registration}
						fireId={recorderRouter}
						onCancel={() => setRecorderRouter(null)}
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
							setCoordsNewFire(event);
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

					{renderFires()}
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
