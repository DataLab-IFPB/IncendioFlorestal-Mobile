import styled from "styled-components/native";

export const Touchable = styled.TouchableOpacity`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.main["primary-v1"]};
`;

export const Label = styled.Text`
    text-align: center;
    font-weight: bold;
    font-size: 16px;
    color: ${({theme}) => theme.colors.text["primary-v2"]};
`;
