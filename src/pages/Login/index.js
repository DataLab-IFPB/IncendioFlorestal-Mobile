import React, { useEffect, useState } from 'react';
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
import Loading from '../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../redux/login/login-action';
import styles from './styles';

const Login = ({ navigation }) => {
  const [matricula, setMatricula] = useState(null);
  const [senha, setSenha] = useState(null);
  const [autenticacaoInvalida, setAutenticacaoInvalida] = useState(false);
  const loading = useSelector((state) => state.login.loading);
  const dispatch = useDispatch();
  const logar = () => {
    if (
      (!matricula && !senha) ||
      (matricula && !senha) ||
      (senha && !matricula)
    ) {
      setAutenticacaoInvalida(true);
    } else {
      setAutenticacaoInvalida(false);
      dispatch(fetchLogin({ matricula, senha }));

      // navigation.navigate('Home');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Loading loading={loading} />
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.label}>Matrícula</Text>
        <TextInput
          value={matricula}
          onChangeText={setMatricula}
          keyboardType='number-pad'
          style={styles.input}
          placeholder={'Digite sua matrícula'}
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={logar} style={styles.button}>
          <Text style={styles.labelEntrar}>Entrar</Text>
        </TouchableOpacity>

        {autenticacaoInvalida && <Text>Credenciais inválidas!</Text>}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
