import ActionButton from "react-native-action-button-fix";
import styled from "styled-components";

export const Container = styled.View`
    position: absolute;
    z-index: 2;
    margin: 15px;
`;

export const ActionButtonMenu = styled(ActionButton)`
    position: absolute;
    z-index: 5;
    left: -4%;
    top: 15%;
`;

