import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = (theme) => {
  return StyleSheet.create({
    actionButtonIcon: {
      fontSize: width * 0.04,
      color: '#FFFF',
    },
    container: {
      position: 'absolute',
      elevation: 10,
      zIndex: 2,
    },
    menuColor: {
      color: '#000',
    },
  });
};
