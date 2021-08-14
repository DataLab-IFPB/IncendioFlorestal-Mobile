import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    width: width * 0.7,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: '28%',
    flexDirection: 'row',
    borderColor: 'tomato',
    top: '2%',
    elevation: 3,
  },
  containerDetails: {
    alignItems: 'center',
  },
  iconSize: {
    fontSize: width * 0.07,
  },
  containerPrecipitacao: {
    width: width * 0.12,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelPrecipitacao: {
    fontSize: width * 0.05,
  },
  marginTopContanerTipoTempo: {
    marginTop: '2%',
  },
  labelInfo: {
    fontSize: width * 0.04,
  },
  containerDetalhesPrevisao: {
    alignItems: 'center'
  }
  iconCloseSize: width * 0.07,
});
