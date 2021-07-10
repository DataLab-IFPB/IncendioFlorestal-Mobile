import React from 'react';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import MapboxGL from '@react-native-mapbox-gl/maps';
import ActionButton from 'react-native-action-button';
import styles from './styles';
const FloatingMenu = ({ setMapStyle }) => {
  const handleIcon = (name) => {
    return <IconAwesome name={name} style={styles.actionButtonIcon} />;
  };
  return (
    <ActionButton
      renderIcon={() => handleIcon('layer-group')}
      verticalOrientation='down'
      position='left'
      buttonColor='#c1c1c1'>
      <ActionButton.Item
        buttonColor='#FFF'
        onPress={() => setMapStyle(MapboxGL.StyleURL.Satellite)}>
        {handleIcon('satellite')}
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor='#FFF'
        onPress={() => setMapStyle(MapboxGL.StyleURL.Street)}>
        {handleIcon('city')}
      </ActionButton.Item>
      <ActionButton.Item
        buttonColor='#FFF'
        onPress={() => setMapStyle(MapboxGL.StyleURL.TrafficDay)}>
        {handleIcon('car')}
      </ActionButton.Item>

      <ActionButton.Item
        buttonColor='#FFF'
        onPress={() => setMapStyle(MapboxGL.StyleURL.Outdoors)}>
        {handleIcon('tree')}
      </ActionButton.Item>
    </ActionButton>
  );
};

export default FloatingMenu;
