import React, { useState } from 'react';
import Slider from '@react-native-community/slider';
import { useDispatch } from 'react-redux';
import { Logo, ButtonModal } from '../../UI';
import { Modal, useWindowDimensions } from 'react-native';
import { fetchFilterIndices } from '../../../redux/fire-indices/fire-indices-action';
import { 
  RootContainer, 
  Container, 
  ContainerOptions, 
  ContainerSlider,
  Label, 
  LabelSlider
} from './styles';

const Filter = ({ visible, closeModal, filterDays, onUpdateDaysSlider }) => {

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();
  const [days, setDays] = useState(filterDays);
  const [initialized, setInitialized] = useState(false);

  function filterIndices() {
    onUpdateDaysSlider(days);
    dispatch(fetchFilterIndices(filterDays));
    closeModal();
  }

  function updateDaysHandler(days) {

    if( initialized ) {
      setDays(days)
    }

    setInitialized(true);
  }

  return (
    <Modal transparent={true} visible={visible} animationType={'fade'}>
     <RootContainer>
     <Container>
        
        <Logo dimension={(width * 0.2)}/>

        <Label>{`Filtrar Registros\nde incêndios`}</Label>

        <ContainerSlider>
          <LabelSlider>
            {`${days} ${days === 1 ? 'dia:' : 'dias:'}`}
          </LabelSlider>
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={2}
            style={{width: '100%'}}
            thumbTintColor={'#000'}
            minimumTrackTintColor='#000'
            maximumTrackTintColor='#000'
            value={filterDays}
            onValueChange={updateDaysHandler}
          />
        </ContainerSlider>

        <ContainerOptions>
          <ButtonModal onPress={filterIndices} highlighted>filtrar</ButtonModal>
          <ButtonModal onPress={closeModal}>fechar</ButtonModal>
        </ContainerOptions>

      </Container>
     </RootContainer>
    </Modal>
  );
};

export default Filter;
