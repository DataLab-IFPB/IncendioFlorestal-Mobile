import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

const Login = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logo} />
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
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
