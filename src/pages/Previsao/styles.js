import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    width: width * 0.5,
    height: width * 0.12,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: '47%',
    flexDirection: 'row',
    top: '4%',
    elevation: 3,
    borderColor: '#F00',
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor: '#000',
  },
  containerDetails: {
    alignItems: 'center',
  },
  iconSize: {
    fontSize: width * 0.04,
  },

  marginTopContanerTipoTempo: {
    marginTop: '2%',
  },
  labelInfo: {
    fontSize: width * 0.035,
    color: '#FFF',
  },
  containerDetalhesPrevisao: {
    alignItems: 'center',
  },
  iconCloseSize: width * 0.05,

  iconRed: {
    color: '#F00',
  },
  iconWhite: {
    color: '#FFFF',
  },
  iconSkyBlue: {
    color: 'skyblue',
  },
});
