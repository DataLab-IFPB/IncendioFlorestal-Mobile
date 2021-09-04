import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/logo.png';
import { fetchNewUser } from '../../redux/login/login-action';
import Loading from '../components/Loading';
import styles from './styles';

const FirstLogin = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [senhasInvalidas, setSenhasInvalidas] = useState(false);
  const [novoUser, setNovoUser] = useState(null);
  const loadingNewUser = useSelector((state) => state.login.loadingNewUser);
  const newUser = useSelector((state) => state.login.newUser);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  // quando o novo usuario tiver sido cadastrado no authenticator
  // o usuário será redirecionado para o login novamente.
  useEffect(() => {
    if (!loadingNewUser && newUser !== null) {
      navigation.navigate('Home');
    }
  }, [loadingNewUser, navigation, newUser]);

  useEffect(() => {
    if (route?.params?.usuario) {
      setNovoUser(route.params.usuario);
    }
  }, [route]);

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
          userData: novoUser,
        }),
      );
    }
  }

  return (
    <>
      <Loading loading={loadingNewUser} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.descriptionMessage}>
            {
              'esse é seu primeiro login.\nPor favor,\naltere sua senha\n para poder prosseguir.'
            }
          </Text>

          <Text style={styles.descriptionMessage}>Nova senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setSenha}
          />
          <Text style={styles.descriptionMessage}>Confirme sua nova senha</Text>

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            onChangeText={setConfirmacaoSenha}
          />

          <Text style={[styles.labelSenhasInvalidas, styles.labelTamanhoSenha]}>
            Insira uma senha com mais de 3 caracteres.
          </Text>

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
