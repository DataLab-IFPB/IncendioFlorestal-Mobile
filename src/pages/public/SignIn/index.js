import React, { useEffect, useState } from 'react';
import packageJson from '../../../../package.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { useForm } from 'react-hook-form';
import { Loading } from '../../../components/UI';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { authFormSchema } from '../../../shared/schemas/validation';
import { ModalWarning } from '../../../components/Layout';
import { Button, Logo, Input } from '../../../components/UI';
import { requestLogin } from '../../../redux/login/login-action';
import { PERMISSION_LOCATION_USE } from '../../../constants/keys';
import { Keyboard, StatusBar, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import { ContainerForm, ContainerRoot, ContainerVersion, Form, LabelVersion } from './styles';

const SignIn = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const { control, clearErrors,  getValues, resetField, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(authFormSchema)
  });

  const [showVersionLabel, setShowVersionLabel] = useState(true);
  const [showModalWarning, setShowModalWarning] = useState(
    { isVisible: false, message: ''}
  );

  const loading = useSelector((state) => state.login.loading);
  const user = useSelector((state) => state.login.data);
  const error = useSelector((state) => state.login.error);

  // Verificar permissões
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

  //  Configurar exibição do modal de aviso
  useEffect(() => {
    if( Object.keys(errors).length !== 0 ) {
      if( errors.registration && errors.password ) {
        setShowModalWarning({
          message: 'Informe suas credenciais',
          isVisible: true
        });
      } else {
       const input = Object.keys(errors)[0];
       const message = errors[input] && errors[input].message;
       setShowModalWarning({ message, isVisible: true });  
      }
    }
  }, [errors]);

   // Configurar exibição do modal de aviso para erro na requisição
   useEffect(() => {
    if( error ) {
      setShowModalWarning({ message: 'Matrícula ou senha incorreta', isVisible: true });
    }
  }, [error]);

  useEffect(() => {
    if( user && Object.values(user)[0].firstLogin ) {
      navigation.navigate('FirstLogin');
    }
  }, [user]);

  const requestPermission = async () => {
    return await MapboxGL.requestAndroidLocationPermissions();
  };

  const onSubmit = (data) => {
    Keyboard.dismiss();
    setShowVersionLabel(true);

    dispatch(requestLogin(data));
  }

  const onKeyboardHide = () => {
      setShowVersionLabel(true);
      Keyboard.dismiss();
  }

  const onInputFocus = (name) => {
    setShowVersionLabel(false);

    if( errors[name] ) {
      clearErrors(name);
    }
  }

  const onConfirmModalHandler = () => {
    setShowModalWarning({ isVisible: false, message: ''});
  }

  if( loading && !getValues('registration') && !getValues('password') ) {
    return(
      <Loading isVisible={loading}/>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onKeyboardHide}>
      <ContainerRoot>
        <StatusBar barStyle='dark-content' backgroundColor='#FFF'/>
        <Loading isVisible={loading}/>
        <ModalWarning 
          message={showModalWarning.message} 
          isVisible={showModalWarning.isVisible}
          onConfirm={onConfirmModalHandler}
        />
        
        <ContainerForm>
          <Logo dimension={(width * 0.32)}/>

          <Form>
            <Input
              icon='user'
              label='matrícula'
              hasErrors={errors.registration}
              controller={{ name: 'registration', control }}
              config={{
                keyboardType: 'number-pad',
                onFocus: onInputFocus.bind(null, 'registration')
              }}
            />  
             
            <Input
              icon='lock'
              label='Senha'
              hasErrors={errors.password}
              controller={{ name: 'password', control }}
              config={{
                keyboardType: 'default',
                secureTextEntry: true,
                onFocus: onInputFocus.bind(null, 'password')
              }}
            />
          </Form>
          
          <Button onPress={handleSubmit(onSubmit)}>Entrar</Button>
        </ContainerForm>

        {showVersionLabel && (
          <ContainerVersion>
            <LabelVersion>{`Version ${packageJson.version}`}</LabelVersion>
          </ContainerVersion>
        )}
      </ContainerRoot>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
