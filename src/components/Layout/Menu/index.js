/* eslint-disable no-undef */
import React, { useState, useRef } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ButtonMenu } from "../../UI";
import { Text, Animated } from "react-native";
import { Container, SubMenuOption, SubMenuLabel, SubMenu } from "./styles";

const Menu = ({ onLocation, onFilter, setMapStyle }) => {

	const subMenuAnimation = useRef(new Animated.Value(0)).current;
	const [showSubMenu, setShowSubMenu] = useState(false);

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
		return <MaterialIcons name={name} size={20} color="white"/>;
	}

	function iconFontAwesome(name) {
		return <FontAwesome name={name} size={15} color="white"/>;
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
				<ButtonMenu onPress={onLocation}>
					{iconMaterial("my-location")}
				</ButtonMenu>

				<ButtonMenu onPress={onFilter}>
					{iconMaterial("filter-alt")}
				</ButtonMenu>

				<ButtonMenu onPress={subMenuHandler}>
					{iconFontAwesome("layer-group")}
				</ButtonMenu>

				{/* SUB-MENU */}
				<Animated.View style={{ opacity: subMenuAnimation }}>
					<SubMenu isVisible={showSubMenu}>
						<SubMenuOption>
							<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.Street)}>
								{iconFontAwesome("city")}
							</ButtonMenu>

							<SubMenuLabel>
								<Text>Rua</Text>
							</SubMenuLabel>
						</SubMenuOption>

						<SubMenuOption>
							<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.Satellite)}>
								{iconFontAwesome("satellite")}
							</ButtonMenu>

							<SubMenuLabel>
								<Text>Satélite</Text>
							</SubMenuLabel>
						</SubMenuOption>

						<SubMenuOption>
							<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.TrafficDay)}>
								{iconFontAwesome("car")}
							</ButtonMenu>

							<SubMenuLabel>
								<Text>Tráfego</Text>
							</SubMenuLabel>
						</SubMenuOption>

						<SubMenuOption>
							<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.Outdoors)}>
								{iconFontAwesome("tree")}
							</ButtonMenu>

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

export default Menu;
