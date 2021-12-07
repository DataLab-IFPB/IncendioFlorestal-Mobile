import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    width: width * 0.7,
    height: width * 0.7,
    backgroundColor: '#FFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: '30%',
    marginHorizontal: '15%',
    borderRadius: 15,
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
    marginHorizontal: '5%',
  },
  labelTextButton: {
    color: '#FFF',
    fontSize: width * 0.03,
  },
  labelHeader: {
    textAlign: 'center',
    color: '#000',
    fontSize: width * 0.033,
    fontWeight: 'bold',
  },
  containerButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  containerSlide: {
    height: '40%',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },

  containerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    top: '4%',
  },
  buttonDay: {
    width: width * 0.1,
    height: width * 0.1,
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lenghtSlide: {
    width: width * 0.6,
  },
  logoSize: {
    width: width * 0.2,
    height: width * 0.2,
  },
});
