import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  containerEvidence: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row-reverse',
    marginTop: '4%',
    backgroundColor: '#c1c1c1',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  containerCreatedAt: {
    justifyContent: 'space-between',
    width: '40%',
    flexDirection: 'column',
  },
  labelCreatedAt: {
    color: '#000',
    fontWeight: 'bold',
  },
  imageEvidence: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
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
    color: '#000',
  },
  containerGalery: {
    flex: 1,
    backgroundColor: '#FFFF',
  },
  iconClose: width * 0.07,
  icon: {
    fontSize: width * 0.08,
    color: '#000',
    marginHorizontal: '7%',
    alignItems: 'center',
  },
  containerEvidenceVideo: {
    height: width * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
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
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    paddingBottom: '2%',
  },

  labelVisualizationGallery: {
    alignItems: 'center',
    flexDirection: 'column',
    bottom: '5%',
  },
  labelVideoEvidence: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  iconTrash: {
    fontSize: width * 0.07,
    color: '#000',
    paddingHorizontal: '2%',
  },
});
