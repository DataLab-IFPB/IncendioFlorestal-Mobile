import React, { useState } from "react";
import MapboxGL from "@react-native-mapbox-gl/maps";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ButtonMenu } from "../../UI";
import { Text } from "react-native";
import { Container, SubMenuOption, SubMenuLabel, SubMenu } from "./styles";

const Menu = ({ onLocation, onFilter, setMapStyle }) => {

	const [showSubMenu, setShowSubMenu] = useState(false);

	function iconMaterial(name) {
		return <MaterialIcons name={name} size={20} color="white"/>;
	}

	function iconFontAwesome(name) {
		return <FontAwesome name={name} size={15} color="white"/>;
	}

	function subMenuHandler() {
		setShowSubMenu((currentState) => !currentState);
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
				<SubMenu isVisible={showSubMenu}>
					<SubMenuOption>
						<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.Street)}>
							{iconFontAwesome("city")}
						</ButtonMenu>
						<SubMenuLabel>Rua</SubMenuLabel>
					</SubMenuOption>

					<SubMenuOption>
						<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.Satellite)}>
							{iconFontAwesome("satellite")}
						</ButtonMenu>
						<SubMenuLabel>Satélite</SubMenuLabel>
					</SubMenuOption>

					<SubMenuOption>
						<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.TrafficDay)}>
							{iconFontAwesome("car")}
						</ButtonMenu>
						<SubMenuLabel>Tráfego</SubMenuLabel>
					</SubMenuOption>

					<SubMenuOption>
						<ButtonMenu onPress={() => setMapStyle(MapboxGL.StyleURL.Outdoors)}>
							{iconFontAwesome("tree")}
						</ButtonMenu>
						<SubMenuLabel>Geográfico</SubMenuLabel>
					</SubMenuOption>
					
				</SubMenu>
			</Container>
		</React.Fragment>
	);
};

export default Menu;
