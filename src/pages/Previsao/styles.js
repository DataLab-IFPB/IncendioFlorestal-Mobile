import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    width: width * 0.6,
    height: width * 0.15,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: '38%',
    flexDirection: 'row',
    top: '2%',
    elevation: 3,
  },
  containerDetails: {
    alignItems: 'center',
  },
  iconSize: {
    fontSize: width * 0.05,
  },

  marginTopContanerTipoTempo: {
    marginTop: '2%',
  },
  labelInfo: {
    fontSize: width * 0.04,
    color: '#000',
    fontWeight: 'bold',
  },
  containerDetalhesPrevisao: {
    alignItems: 'center',
  },
  iconCloseSize: width * 0.05,
});
