import styled from 'styled-components';

export const Container = styled.View`
    width: 100%;
    margin-bottom: 15px;
`;

export const ContainerInput = styled.View`
    flex-direction: row;
    border-radius: 10px;
    background-color: ${({theme}) => theme.colors.secondary};
    border: ${({theme, isValid}) => isValid ? `2px solid ${theme.colors.invalid}` : 'none'};
`;

export const ContainerIcon = styled.View`
    align-items: center;
    justify-content: center;
    padding: 5px;
    margin-left: 5px;
`;

export const ButtonShowPassword = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
`

export const Label = styled.Text`
    margin-bottom: 3px;
    font-size: 15px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.colors.label};
`;

export const Field = styled.TextInput`
    flex: 1;
    padding: 10px;
    color: ${({ theme }) => theme.colors.label};
`;