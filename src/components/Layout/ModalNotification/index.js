import React from 'react';
import { Modal } from 'react-native';
import { Container, RootContainer, Label, Touachble, LabelButton } from './styles';

const ModalNotification = ({ isVisible, message, onConfirm }) => {
    return(
        <Modal visible={isVisible} transparent={true} animationType='fade'>
            <RootContainer>
                <Container>
                    <Label>{message}</Label>
                    <Touachble onPress={onConfirm}>
                        <LabelButton>Ok</LabelButton>
                    </Touachble>
                </Container>
            </RootContainer>

        </Modal>
    );
}

export default ModalNotification;