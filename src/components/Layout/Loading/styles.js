import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
`;

export const ContainerIndicator = styled.View`
    margin-top: 10px;
`;


export const Label = styled.Text`
    margin-top: 10px;
    font-size: 17px;
    color: ${({theme}) => theme.colors.label};
`;
