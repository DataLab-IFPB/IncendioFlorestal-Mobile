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
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../redux/login/login-action';
import Logo from '../../assets/logo.png';
import Loading from '../components/Loading';
import styles from './styles';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [matricula, setMatricula] = useState();
  const [senha, setSenha] = useState();
  const [autenticacaoInvalida, setAutenticacaoInvalida] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.login);

  useEffect(() => {
    if (!token.data) {
      setAutenticacaoInvalida(true);
    } else {
      setAutenticacaoInvalida(false);
    }
  }, [token]);

  const logar = () => {
    dispatch(fetchLogin({ matricula, senha }));
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (token.data) {
        navigation.navigate('Home');
      }
    }, 2000);
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
