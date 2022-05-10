import ActionButton from 'react-native-action-button-fix';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
    position: absolute;
    z-index: 2;
    margin: 10px 15px;
`;

export const ActionButtonMenu = styled(ActionButton)`
    position: absolute;
    z-index: 5;
    left: -4%;
    margin-top: 28%;
`;

