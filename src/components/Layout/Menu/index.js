import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ButtonMenu } from '../../UI';
import { useTheme } from 'styled-components';
import { Container, ActionButtonMenu } from './styles';

const Menu = ({ onLocation, onFilter, setMapStyle }) => {

    const theme = useTheme();
    
    function iconMaterial(name) {
        return <MaterialIcons name={name} size={20} color={theme.text.primary}/>;
    };

    function iconFontAwesome(name) {
        return <FontAwesome name={name} size={15} color={theme.text.primary}/>
    }

    return(
        <React.Fragment>
                
            <Container>
                <ButtonMenu onPress={onLocation}>
                    {iconMaterial('my-location')}
                </ButtonMenu>

                <ButtonMenu onPress={onFilter}>
                    {iconMaterial('filter-alt')}
                </ButtonMenu>
            </Container>
            <ActionButtonMenu  
                size={40}
                position='left'
                verticalOrientation='down'
                renderIcon={() => iconFontAwesome('layer-group')}
            >
                <ActionButtonMenu.Item
                    title='Satélite'
                    onPress={() => setMapStyle(MapboxGL.StyleURL.Satellite)}>
                    {iconFontAwesome('satellite')}
                </ActionButtonMenu.Item>
                <ActionButtonMenu.Item
                    title='Rua'
                    onPress={() => setMapStyle(MapboxGL.StyleURL.Street)}>
                    {iconFontAwesome('city')}
                </ActionButtonMenu.Item>

                <ActionButtonMenu.Item
                    title='Tráfego'
                    onPress={() => setMapStyle(MapboxGL.StyleURL.TrafficDay)}>
                    {iconFontAwesome('car')}
                </ActionButtonMenu.Item>

                <ActionButtonMenu.Item
                    title='Geográfico'
                    onPress={() => setMapStyle(MapboxGL.StyleURL.Outdoors)}>
                    {iconFontAwesome('tree')}
                </ActionButtonMenu.Item>
            </ActionButtonMenu>
        </React.Fragment>
    );
}

export default Menu;