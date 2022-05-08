import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../../../components/UI'
import { yupResolver } from'@hookform/resolvers/yup';
import { ContainerRoot, Info, Title } from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { ModalWarning } from '../../../components/Layout';
import { Button, Input, Logo } from '../../../components/UI'
import { changePasswordFormSchema } from '../../../shared/schemas/validation';
import { BackHandler, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { requestLoginSuccess, requestNewUser } from '../../../redux/login/login-action';

const FirstLogin = () => {

  const dispatch = useDispatch();

  const { control, handleSubmit, clearErrors, formState: { errors } } = useForm({
    resolver: yupResolver(changePasswordFormSchema)
  });

  const [showModalWarning, setShowModalWarning] = useState(
    { isVisible: false, message: ''}
  );

  const user = useSelector((state) => state.login.data);
  const error = useSelector((state) => state.login.error);
  const loading = useSelector((state) => state.login.loading);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  //  Configurar exibição do modal de aviso para erros nos inputs
  useEffect(() => {
    if( Object.keys(errors).length !== 0 ) {
      if( errors.password ) {
        setShowModalWarning({ message: errors.password.message, isVisible: true });
      } else if( errors.passwordConfirm ) {
        setShowModalWarning({ message: errors.passwordConfirm.message, isVisible: true });
      }
    }
  }, [errors]);

  // Configurar exibição do modal de aviso para erro na requisição
  useEffect(() => {
    if( error ) {
      setShowModalWarning({ message: error, isVisible: true });
    }
  }, [error]);

  useEffect(() => {
    if( user && !Object.values(user)[0].firstLogin ) {
      dispatch(requestLoginSuccess());
    }
  }, [user]);

  const onConfirmModalHandler = () => {
    setShowModalWarning({ message: '', isVisible: false });  
  }

  const onInputFocus = (name) => {
    if( errors[name] ) {
      clearErrors(name);
    }
  }

  const onSubmit = (data) => {
    dispatch(requestNewUser({ 
      password: data.password,
      userData: user
    }
    ));
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ContainerRoot>
          <Loading isVisible={loading}/>
          <ModalWarning 
            message={showModalWarning.message} 
            isVisible={showModalWarning.isVisible}
            onConfirm={onConfirmModalHandler}
          />

          <Logo dimension={(200)}/>

          <Title>
            {'Este é o seu primeiro login \nPor favor, altere sua senha para prosseguir'}
          </Title>

          <Info>{'A nova senha deve conter \nno mínimo 6 e no máximo 16 caracteres'}</Info>

          <Input
            icon='lock'
            label='Senha'
            controller={{ name: 'password', control }}
            hasErrors={errors.password}
            config={{
              keyboardType: 'default',
              secureTextEntry: true,
              onFocus: onInputFocus.bind(null, 'password')
            }}
          />

          <Input
            icon='lock'
            label='Confirmar senha'
            controller={{ name: 'passwordConfirm', control }}
            hasErrors={errors.passwordConfirm}
            config={{
              keyboardType: 'default',
              secureTextEntry: true,
              onFocus: onInputFocus.bind(null, 'passwordConfirm')
            }}
          />

         <Button onPress={handleSubmit(onSubmit)}>Alterar</Button>
        </ContainerRoot>
    </TouchableWithoutFeedback>
  );
};

export default FirstLogin;
