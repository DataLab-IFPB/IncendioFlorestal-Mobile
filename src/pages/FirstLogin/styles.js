import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
  },
  descriptionMessage: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '3%',
  },

  input: {
    width: width * 0.6,
    height: width * 0.1,
    borderRadius: 25,
    backgroundColor: '#C1C1C1',
    textAlign: 'left',
    fontSize: width * 0.04,
    color: '#000',
    marginTop: '3%',
    paddingLeft: 15,
  },
  button: {
    width: width * 0.6,
    height: width * 0.1,
    borderRadius: 25,
    backgroundColor: '#C00',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.2,
  },
  iconViewSenha: {
    left: '83%',
    width: width * 0.07,
    height: width * 0.05,
    bottom: '45%',
    position: 'absolute',
  },
  iconSize: width * 0.05,

  labelBtn: {
    color: '#FFFF',
    fontSize: width * 0.04,
  },
  labelSenhasInvalidas: {
    color: '#000',
    fontSize: width * 0.04,
    marginTop: '4%',
  },
  labelTamanhoSenha: {
    fontSize: width * 0.03,
  },
});
