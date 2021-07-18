import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import styles from './styles';
import MapboxGL from '@react-native-mapbox-gl/maps';
const Login = () => {
  const navigation = useNavigation();
  const [matricula, setMatricula] = useState(null);
  const [senha, setSenha] = useState(null);
  const [autenticacaoInvalida, setAutenticacaoInvalida] = useState(false);
  const loading = useSelector((state) => state.login.loading);
  const user = useSelector((state) => state.login.data);
  const error = useSelector((state) => state.login.error);
  const dispatch = useDispatch();

  useEffect(() => {
    async function verifyPermission() {
      const permission = await requestPermission();

      if (permission) {
        await AsyncStorage.setItem(
          PERMISSION_LOCATION_USE,
          JSON.stringify(permission),
        );
      }
    }
    verifyPermission();
  }, []);

  useEffect(() => {
    if (user) {
      navigation.navigate('Home');
    }
  }, [user]);

  useEffect(() => {
    if (error && !loading) {
      setAutenticacaoInvalida(true);
    } else {
      setAutenticacaoInvalida(false);
    }
  }, [error]);

  const requestPermission = async () => {
    return await MapboxGL.requestAndroidLocationPermissions();
  };

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
          keyboardType='email-address'
          style={styles.input}
          placeholder={'Digite sua matrícula'}
          autoCapitalize='none'
        />
        <Text style={styles.label}>Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          style={styles.input}
          secureTextEntry={true}
          autoCapitalize='none'
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
