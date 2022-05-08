import React, { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Modal, useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { Container, RootContainer, ContainerOptions, Label } from '../Filter/styles';
import { Logo, ButtonModal } from '../../UI';

const ModalNewFireIndice = ({ visible, onCancel, onConfirm }) => {

  const netInfo = useNetInfo();
  const { width } = useWindowDimensions();

  const indiceSaved = useSelector(
    (state) => state.indicesIncendios.indiceSaved,
  );

  useEffect(() => {
    if (indiceSaved) {
      onCancel();
    }
  }, [indiceSaved, onCancel]);

  return (
    <Modal visible={visible} transparent={true} animationType='fade'>
      <RootContainer>
        <Container>
          <Logo dimension={(width * 0.2)}/>

          { !netInfo.isConnected && (
            <Label>Registro Offline</Label>
          )}
          <Label>Deseja adicionar um novo registro de incêndio ?</Label>

          <ContainerOptions>
            <ButtonModal onPress={onConfirm} highlighted>Salvar</ButtonModal>
            <ButtonModal onPress={onCancel}>Fechar</ButtonModal>
          </ContainerOptions>
        </Container>
      </RootContainer>
    </Modal>
  );
};

export default ModalNewFireIndice;
