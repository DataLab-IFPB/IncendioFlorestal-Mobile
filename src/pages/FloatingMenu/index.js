import React from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import IconAntiDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

const FloatingMenu = () => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback>
        <Animated.View>
          <IconAntiDesign name='plus' size={24} color='#FFF' />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
    position: 'absolute',
  },
});
export default FloatingMenu;
