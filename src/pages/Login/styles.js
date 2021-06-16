import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: width * 0.04,
    margin: 10,
    color: '#010101',
  },
  input: {
    width: width * 0.6,
    height: width * 0.1,
    borderRadius: 25,
    backgroundColor: '#C1C1C1',
    textAlign: 'center',
    fontSize: width * 0.04,
  },
  button: {
    width: width * 0.3,
    height: width * 0.1,
    borderRadius: 25,
    backgroundColor: '#C00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
  },
  labelEntrar: {
    color: '#FFFF',
    fontSize: width * 0.04,
  },
});
