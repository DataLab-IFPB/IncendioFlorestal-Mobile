import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  actionButtonIcon: {
    fontSize: width * 0.05,
    color: '#000',
  },
});
