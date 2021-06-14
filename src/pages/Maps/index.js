import React from 'react';
import { Platform } from 'react-native';
import MapView, { UrlTile, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './styles';

const Maps = () => {
  return (
    <MapView
      initialRegion={{
        latitude: -7.8905349,
        longitude: -37.134219,
        latitudeDelta: 0.0033160984328199916,
        longitudeDelta: 0.001997910439968109,
      }}
      provider={PROVIDER_GOOGLE}
      mapType={Platform.OS === 'android' ? 'none' : 'standard'}
      style={styles.containerMap}>
      <UrlTile
        urlTemplate={'https://tile.openstreetmap.de/7/63/42.png'}
        flipY={false}
        tileSize={256}
      />

      <Marker
        coordinate={{
          latitude: -7.8905349,
          longitude: -37.134219,
        }}
      />
    </MapView>
  );
};

export default Maps;
