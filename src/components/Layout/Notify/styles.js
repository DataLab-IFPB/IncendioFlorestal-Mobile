import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    width: width * 0.7,
    height: width * 0.1,
    backgroundColor: '#F00',
    position: 'absolute',
    bottom: '2%',
    alignItems: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
  },
});
