import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  containerEvidence: {
    width: '100%',
    height: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
  containerCreatedAt: {
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '2%',
    flexDirection: 'row',
  },
  labelCreatedAt: {
    color: '#000',
    fontWeight: 'bold',
  },
  imageEvidence: {
    width: width * 0.95,
    height: width * 0.35,
    resizeMode: 'cover',
  },
  videoEvidence: {
    width: width * 0.95,
    height: width * 0.35,
    flex: 1,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: '#FFFF',
    paddingVertical: '2%',
    paddingLeft: '2%',
  },
  labelGalery: {
    fontWeight: 'bold',
    fontSize: width * 0.03,
    color: 'skyblue',
  },
  containerGalery: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  iconClose: width * 0.07,
  icon: {
    fontSize: width * 0.1,
    color: '#000',
    marginHorizontal: '7%',
  },
  containerEvidenceVideo: {
    width: '100%',
    height: width * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '3%',
  },
  containerVisualizationEvidenceVideo: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerCOntainerVIsualizationEvidenceVideo: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingLeft: '2%',
    paddingTop: '2%',
  },
});
