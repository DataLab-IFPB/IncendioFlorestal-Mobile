import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  BackHandler,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import Loading from '../components/Loading';
import Logo from '../../assets/logo.png';
import styles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewUser } from '../../redux/login/login-action';

const FirstLogin = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [novoUsuario, setNovoUsuario] = useState(null);
  const [senha, setSenha] = useState(null);
  const [confirmacaoSenha, setConfirmacaoSenha] = useState(null);
  const [senhasInvalidas, setSenhasInvalidas] = useState(false);

  const loadingNewUser = useSelector((state) => state.login.loadingNewUser);
  const newUser = useSelector((state) => state.login.newUser);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useEffect(() => {
    if (route?.params?.usuario) {
      setNovoUsuario(route.params.usuario);
    }
  }, [route]);

  // quando o novo usuario tiver sido cadastrado no authenticator
  // o usuário será redirecionado para o login novamente.
  useEffect(() => {
    if (!loadingNewUser && newUser !== null) {
      navigation.replace('Login');
    }
  }, [newUser]);

  function conferirSenhas() {
    if (senha !== confirmacaoSenha) {
      setSenhasInvalidas(true);
    }
    if (senha === null || confirmacaoSenha === null) {
      setSenhasInvalidas(true);
    } else {
      setSenhasInvalidas(false);
    }
  }

  function alterarSenhas() {
    conferirSenhas();

    if (!senhasInvalidas) {
      dispatch(
        fetchNewUser({
          senha: senha,
          user: novoUsuario,
        }),
      );
    }
  }

  function renderUserName() {
    return (novoUsuario && novoUsuario.name) || '';
  }
  return (
    <>
      <Loading loading={loadingNewUser} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <Text
            style={
              styles.descriptionMessage
            }>{`${renderUserName()}, esse é seu primeiro login.\nPor favor,\naltere sua senha\n para poder prosseguir.`}</Text>

          <TextInput
            placeholder={'Digite sua nova senha'}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setSenha}
          />

          <TextInput
            placeholder={'Confirme sua nova senha'}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setConfirmacaoSenha}
          />

          {senhasInvalidas && (
            <Text style={styles.labelSenhasInvalidas}>
              {'Erro ao atualizar sua nova senha!'}
            </Text>
          )}

          <TouchableOpacity style={styles.button} onPress={alterarSenhas}>
            <Text style={styles.labelBtn}>Alterar</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

export default FirstLogin;
