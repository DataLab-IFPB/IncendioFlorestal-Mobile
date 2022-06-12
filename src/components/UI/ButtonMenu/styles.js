import styled from 'styled-components';

export const Touchable = styled.TouchableOpacity`
    height: 40px;
    width: 40px;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 50px;
    background-color: ${({theme}) => theme.main.secondary};
    elevation: 5;
`;