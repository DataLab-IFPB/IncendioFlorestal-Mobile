import React from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import Logo from '../../assets/logo.png';
import styles from './styles';

const Login = ({ navigation }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.logo} source={Logo} />

        <Text style={styles.label}>Matrícula</Text>
        <TextInput
          keyboardType='number-pad'
          style={styles.input}
          placeholder={'Digite sua matrícula'}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} secureTextEntry={true} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.labelEntrar}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
