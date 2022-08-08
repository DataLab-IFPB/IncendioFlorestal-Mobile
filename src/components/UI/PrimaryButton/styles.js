import styled from "styled-components/native";

export const Touchable = styled.TouchableOpacity`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.main.primary};
`;

export const Label = styled.Text`
    text-align: center;
    color: #FFF;
    font-weight: bold;
    font-size: 16px;
`;
