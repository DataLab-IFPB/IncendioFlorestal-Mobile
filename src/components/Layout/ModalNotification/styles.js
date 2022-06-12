import styled from "styled-components/native";

export const RootContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Container = styled.View`
    width: 70%;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    border: 1px solid ${({theme}) => theme.main.primary};
    background-color: ${({theme}) => theme.main.secondary};
`;

export const Label = styled.Text`
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: ${({theme}) => theme.text.primary};
`;

export const Touachble = styled.TouchableOpacity`
    margin: 20px 10px 10px 10px;
    padding: 5px 50px;
    border-radius: 15px;
    background-color: ${({theme}) => theme.text.primary};
`;

export const LabelButton = styled.Text`
    font-weight: bold;
`;
