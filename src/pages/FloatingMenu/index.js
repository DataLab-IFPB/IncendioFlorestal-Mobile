import React from 'react';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ActionButton from 'react-native-action-button';
import { useColorScheme } from 'react-native';
import { styles } from './styles';
const FloatingMenu = ({ setMapStyle }) => {
  const theme = useColorScheme();
  const style = styles(theme);
  const handleIcon = (name) => {
    return <IconAwesome name={name} style={style.actionButtonIcon} />;
  };

  return (
    <ActionButton
      style={style.container}
      renderIcon={() => handleIcon('layer-group')}
      verticalOrientation='down'
      position='left'
      buttonColor={style.menuColor.color}>
      <ActionButton.Item
        buttonColor={style.menuColor.color}
        title='Satélite'
        onPress={() => setMapStyle(MapboxGL.StyleURL.Satellite)}>
        {handleIcon('satellite')}
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={style.menuColor.color}
        title='Rua'
        onPress={() => setMapStyle(MapboxGL.StyleURL.Street)}>
        {handleIcon('city')}
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor={style.menuColor.color}
        title='Tráfego'
        onPress={() => setMapStyle(MapboxGL.StyleURL.TrafficDay)}>
        {handleIcon('car')}
      </ActionButton.Item>

      <ActionButton.Item
        buttonColor={style.menuColor.color}
        title='Geográfico'
        onPress={() => setMapStyle(MapboxGL.StyleURL.Outdoors)}>
        {handleIcon('tree')}
      </ActionButton.Item>
    </ActionButton>
  );
};

export default FloatingMenu;
