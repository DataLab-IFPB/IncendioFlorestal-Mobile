import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = (theme) => {
  return StyleSheet.create({
    actionButtonIcon: {
      fontSize: width * 0.04,
      color: '#FFFF',
    },

    menuColor: {
      color: '#000',
    },
    containerFloatingMenu: {
      position: 'absolute',
      zIndex: 2,
      elevation: 10,
      top: '8%'
    },
  });
};
