import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
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
  iconClose: width * 0.07,
});
