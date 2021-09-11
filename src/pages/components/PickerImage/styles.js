import { Dimensions, StyleSheet } from 'react-native';
const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    paddingBottom: '2%',
  },
  containerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
  },
  icon: {
    fontSize: width * 0.06,
    color: '#000',
    marginHorizontal: '7%',
  },

  buttonUpload: {
    width: 40,
    height: 20,
    backgroundColor: '#F00',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCancelUpload: {
    backgroundColor: '#000',
  },
  labelButtonUpload: {
    color: '#FFF',
    fontSize: 15,
  },
  containerButtonsUpload: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    top: '5%',
  },
  containerUpload: {
    width: width * 0.5,
    height: width * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c1c1c1',
    marginHorizontal: '30%',
    marginVertical: '50%',
    borderRadius: 15,
    top: '10%',
    elevation: 10,
  },
  labelQuestionUpload: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 2,
  },
});
