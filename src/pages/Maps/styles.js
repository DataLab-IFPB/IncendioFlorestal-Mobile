import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  containerMap: {
    flex: 1,
  },
  containerMapsAndButtons: {
    flex: 1,
  },
  containerInteration: {
    alignItems: 'center',
    width: '100%',
    height: '20%',
  },
  containerIndexFire: {
    width: 100,
    height: 100,
  },
  containerIndicesNotFound: {
    width: 250,
    height: 100,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    elevation: 10,
    zIndex: 2,
    borderRadius: 30,
    top: '40%',
    left: '20%',
  },
  labelIndiceNotFound: {
    textAlign: 'center',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#FFF',
  },
  btnOkIndiceNotFound: {
    backgroundColor: '#fff',
    width: 80,
    height: 20,
    alignItems: 'center',
    borderRadius: 15,
  },
  labelButtonOk: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: '#000',
  },
  containerIconLocation: {
    position: 'absolute',
    zIndex: 2,
    marginLeft: '8%',
    top: '3%',
    backgroundColor: '#000',
    borderRadius: 30,
    height: '7%',
    width: '7%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  styleIcon: {
    fontSize: width * 0.065,
    color: '#FFF'
  },
 
});
