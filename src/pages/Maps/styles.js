import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerMap: {
    flex: 1,
  },
  containerMapsAndButtons: {
    width: '100%',
    height: '100%',
    zIndex: 2,
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
    fontSize: 16,
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
});
