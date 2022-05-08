import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    height: width * 0.6,
    width: width * 0.7,
    marginHorizontal: '15%',
    marginVertical: '30%',
    borderRadius: 15,
    top: '10%',
    flexDirection: 'column',
    elevation: 12,
  },
  logoApp: {
    width: 70,
    height: 70,
  },
  buttonConfirm: {
    backgroundColor: '#F00',
  },
  buttonReject: {
    backgroundColor: '#000',
  },
  basicStyleButton: {
    borderRadius: 15,
    height: width * 0.09,
    width: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelTextButton: {
    color: '#FFF',
    fontSize: 15,
  },
  containerButtons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  labelMessage: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: '5%',
    marginVertical: '2%',
  },
});
