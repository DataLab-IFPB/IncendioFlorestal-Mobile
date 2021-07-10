import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  containerMap: {
    flex: 1,
  },
  containerMapsAndButtons: {
    width: '100%',
    height: '100%',
    zIndex: 2,
  },
  containerButtons: {
    zIndex: 1,
    height: '60%',
    width: '30%',
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginHorizontal: '-3%',
  },
  containerIndexFire: {
    width: 100,
    height: 100,
  },
});
