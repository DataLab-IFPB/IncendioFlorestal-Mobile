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
    color: '#000',
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
  containerInputSenha: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: '10%',
  },
  iconViewSenha: {
    marginLeft: '3%',
    width: width * 0.07,
    height: width * 0.05,
  },
  textVersion: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    position: 'absolute',
    top: '96%',
    fontSize: width * 0.03,
  },
  iconSize: width * 0.05,
});
