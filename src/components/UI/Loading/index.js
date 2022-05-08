import React from 'react';
import { Modal, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { Container } from './styles';

const Loading = ({ isVisible }) => {

    const theme = useTheme();

    return (
        <Modal transparent={true} visible={isVisible} animationType='fade'>
          <Container>
            <ActivityIndicator size='large' color={theme.colors.primary} />
          </Container>
        </Modal>
    )
}

export default Loading;