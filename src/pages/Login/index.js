import AsyncStorage from '@react-native-async-storage/async-storage';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import packageJson from '../../../package.json';
import Logo from '../../assets/logo.png';
import { PERMISSION_LOCATION_USE } from '../../constants/keys';
import { fetchLogin } from '../../redux/login/login-action';
import Loading from '../components/Loading';
import styles from './styles';

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
      console.log('voltou pra tela de login ', user);
      if (user.birthDate !== '') {
        navigation.navigate('FirstLogin', {
          usuario: user,
        });
      } else if (user.birthDate === '') {
        navigation.navigate('Home');
      }
    }
  }, [user]);

  useEffect(() => {
    if (error && !loading) {
      setAutenticacaoInvalida(true);
    } else {
      setAutenticacaoInvalida(false);
    }
  }, [error, loading]);

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
      setMatricula(matricula);
      dispatch(fetchLogin({ matricula, senha: parseInt(senha, 10) }));
    }
  };
  const [iconName, setIconName] = useState('eye-slash');
  const [showVersionLabel, setShowVersionLabel] = useState(true);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setShowVersionLabel(true);
      }}>
      <View style={styles.container}>
        <Loading loading={loading} />
        <Image style={styles.logo} source={Logo} />
        <Text style={styles.label}>Matrícula</Text>
        <TextInput
          onPressIn={() => setShowVersionLabel(false)}
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="number-pad"
          style={styles.input}
          placeholder={'Digite sua matrícula'}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Senha</Text>
        <View style={styles.containerInputSenha}>
          <TextInput
            onPressIn={() => setShowVersionLabel(false)}
            value={senha}
            onChangeText={setSenha}
            style={styles.input}
            secureTextEntry={iconName === 'eye' ? false : true}
            autoCapitalize="none"
          />

          <Icon
            onPress={() =>
              setIconName(iconName === 'eye' ? 'eye-slash' : 'eye')
            }
            name={iconName}
            style={styles.iconViewSenha}
            size={styles.iconSize}
            color="#F00"
          />
        </View>

        <TouchableOpacity onPress={logar} style={styles.button}>
          <Text style={styles.labelEntrar}>Entrar</Text>
        </TouchableOpacity>

        {autenticacaoInvalida && (
          <Text style={styles.label}>{'Credenciais inválidas!'}</Text>
        )}

        {showVersionLabel && (
          <Text style={styles.textVersion}>
            {`Version ${packageJson.version}`}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
