import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { weather } from "../../../shared/services/weather";
import { useNetInfo } from "@react-native-community/netinfo";
import {
	Container,
	ContainerInfo,
	Label,
	WindInfoLabel,
	WindIcons,
	WindInfoContainer,
	NorthLabel
} from "./styles";

const Forecast = ({ userCoordinates }) => {

	const netInfo = useNetInfo();

	const { getForecast } = weather();
	const [currentWeather, setCurrentWeather] = useState(null);

	useEffect(() => {
		if (userCoordinates.latitude && userCoordinates.longitude)
			refreshWeather();

	}, [userCoordinates, netInfo.isConnected]);


	async function refreshWeather() {
		setCurrentWeather(await getForecast(userCoordinates.longitude, userCoordinates.latitude));
	}

	function renderInfo(info) {
		return info === null ? " - " : info;
	}

	function windInfoContainer() {
		return currentWeather === null ? <Label> - </Label> : (
			<WindInfoContainer>
				<WindInfoLabel>
					{renderInfo(currentWeather && currentWeather.wind_kph + "\nKM/H")}
				</WindInfoLabel>
				<WindIcons>
					<NorthLabel>N</NorthLabel>
					<Ionicons
						name={"arrow-up-outline"}
						size={17}
						color={"red"}
						style={{ transform: [{ rotate: currentWeather.wind_degree + "deg" }] }}
					/>
				</WindIcons>
			</WindInfoContainer>
		);
	}

	function iconIonicons(name, color) {
		return <Ionicons name={name} size={15} color={color}/>;
	}

	if(netInfo.isConnected) {
		return (
			<Container>
				{/* Velocidade e direcao do vento */}
				<ContainerInfo>
					<FontAwesome name='wind' color="white" size={15}/>
					{windInfoContainer()}
				</ContainerInfo>

				{/* Temperatura */}
				<ContainerInfo>
					{iconIonicons("thermometer-outline", "red")}
					<Label> {renderInfo(currentWeather && currentWeather.temp_c + "º")} </Label>
				</ContainerInfo>

				{/* Humidade */}
				<ContainerInfo>
					{iconIonicons("water", "skyblue")}
					<Label> {renderInfo(currentWeather && Math.floor(currentWeather.humidity) + "%")} </Label>
				</ContainerInfo>

				{/* Precipitacao */}
				<ContainerInfo>
					{iconIonicons("thunderstorm-outline", "skyblue")}
					<Label> {renderInfo(currentWeather && currentWeather.precip_in + "%")} </Label>
				</ContainerInfo>
			</Container>
		);
	}

	return <></>;
};

export { Forecast };
