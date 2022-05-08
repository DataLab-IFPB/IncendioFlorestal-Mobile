import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    height: width * 1.2,
    marginHorizontal: '10%',
    marginVertical: '30%',
    borderRadius: 15,
    elevation: 10,
  },
  header: {
    top: '0%',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: '4%',
    marginTop: '4%',
    justifyContent: 'space-between',
  },
  containerDetail: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
  labelNoBold: {
    fontSize: width * 0.04,
  },
  containerOrientation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.6,
  },
  containerPrevisao: {
    borderRadius: 15,
    elevation: 10,
    width: width * 0.8,
    height: width * 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCloseSize: width * 0.07,
  iconIndiceSize: width * 0.15,

  iconColorBlack: {
    color: '#000',
    fontSize: width * 0.08,
  },
  containerRenderComponents: {
    alignItems: 'center',
  },
});
