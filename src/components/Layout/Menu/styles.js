import ActionButton from 'react-native-action-button-fix';
import styled from 'styled-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const Container = styled.View`
    position: absolute;
    z-index: 2;
    margin: 10px 15px;
`;

export const ActionButtonMenu = styled(ActionButton)`
     position: absolute;
      z-index: 2;
      top: 15%;
      margin-left: ${Math.floor(-width * 0.04) + 'px'};
`;
