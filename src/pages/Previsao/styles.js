import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    width: width * 0.5,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: '45%',
    flexDirection: 'row',
    borderColor: 'tomato',
    top: '2%',
    elevation: 3,
  },
  containerDetails: {
    alignItems: 'center',
  },
  iconSize: {
    fontSize: width * 0.07,
  },
});
