import { Dimensions, StyleSheet } from 'react-native';

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
      top: '8%',
      // marginLeft: '2%',
      marginLeft: '-5%',
    },
    menuSize: width * 0.1,
  });
};
