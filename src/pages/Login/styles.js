import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    margin: 10,
  },
  input: {
    width: width * 0.6,
    height: width * 0.1,
    borderRadius: 25,
    backgroundColor: '#C1C1C1',
    textAlign: 'center',
  },
  button: {
    width: width * 0.3,
    height: width * 0.1,
    borderRadius: 25,
    backgroundColor: 'tomato',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: '#010101',
    borderRadius: 15,
  },
});
