import styled from 'styled-components';

export const Touchable = styled.TouchableOpacity`
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background-color: ${({theme}) => theme.main.primary};
`;

export const Label = styled.Text`
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
`;