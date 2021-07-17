import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = (theme) => {
  return StyleSheet.create({
    actionButtonIcon: {
      fontSize: width * 0.05,
      color: theme === 'dark' ? '#fff' : '#000',
    },
    container: {
      position: 'absolute',
      elevation: 10,
      zIndex: 2,
    },
    menuColor: {
      color: theme === 'dark' ? '#000' : '#FFF'
    }
  });
};
