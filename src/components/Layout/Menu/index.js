/* eslint-disable no-undef */
import React, { useRef } from "react";
import MapboxGL from "@rnmapbox/maps";

import { MenuButton } from "../../UI";
import { Text, Animated } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Container, SubMenuOption, SubMenuLabel, SubMenu } from "./styles";

const Menu = ({
	showSubMenu,
	setShowSubMenu,
	handleLocation,
	handleFilter,
	handleMapStyle,
	handleMapManager
}) => {
	const subMenuAnimation = useRef(new Animated.Value(0)).current;

	function fadeInSubMenu() {
		Animated.timing(subMenuAnimation, {
			toValue: 1,
			duration: 300,
			useNativeDriver: true
		}).start();
	}

	function fadeOutSubMenu() {
		Animated.timing(subMenuAnimation, {
			toValue: 0,
			duration: 300,
			useNativeDriver: true
		}).start();
	}

	function iconMaterial(name) {
		return <MaterialIcons name={name} size={20} color="white" />;
	}

	function iconFontAwesome(name) {
		return <FontAwesome name={name} size={15} color="white" />;
	}

	function subMenuHandler() {
		if( showSubMenu ) {
			fadeOutSubMenu();
			setTimeout(() =>  {
				setShowSubMenu((currentState) => !currentState);
			}, 500);
		} else {
			setShowSubMenu((currentState) => !currentState);
			fadeInSubMenu();
		}
	}

	return (
		<React.Fragment>
			<Container>
				<MenuButton onPress={handleLocation}>
					{iconMaterial("my-location")}
				</MenuButton>

				<MenuButton onPress={handleFilter}>
					{iconMaterial("filter-alt")}
				</MenuButton>

				<MenuButton onPress={handleMapManager}>
					{iconFontAwesome("download")}
				</MenuButton>

				<MenuButton onPress={subMenuHandler}>
					{iconFontAwesome("layer-group")}
				</MenuButton>

				{/* SUB-MENU */}
				<Animated.View style={{ opacity: subMenuAnimation }}>
					<SubMenu isVisible={showSubMenu}>
						<SubMenuOption>
							<MenuButton onPress={() => handleMapStyle(MapboxGL.StyleURL.Street)}>
								{iconFontAwesome("city")}
							</MenuButton>

							<SubMenuLabel>
								<Text>Rua</Text>
							</SubMenuLabel>
						</SubMenuOption>

						<SubMenuOption>
							<MenuButton onPress={() => handleMapStyle(MapboxGL.StyleURL.Satellite)}>
								{iconFontAwesome("satellite")}
							</MenuButton>

							<SubMenuLabel>
								<Text>Satélite</Text>
							</SubMenuLabel>
						</SubMenuOption>

						<SubMenuOption>
							<MenuButton onPress={() => handleMapStyle(MapboxGL.StyleURL.TrafficDay)}>
								{iconFontAwesome("car")}
							</MenuButton>

							<SubMenuLabel>
								<Text>Tráfego</Text>
							</SubMenuLabel>
						</SubMenuOption>

						<SubMenuOption>
							<MenuButton onPress={() => {
								handleMapStyle("mapbox://styles/mapbox/outdoors-v11");
							}}>
								{iconFontAwesome("tree")}
							</MenuButton>

							<SubMenuLabel>
								<Text>Geográfico</Text>
							</SubMenuLabel>
						</SubMenuOption>
					</SubMenu>
				</Animated.View>
			</Container>
		</React.Fragment>
	);
};

export { Menu };
