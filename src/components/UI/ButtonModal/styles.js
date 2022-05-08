import styled from 'styled-components';

export const Touchable = styled.TouchableOpacity`
    margin: 0 5px;
    padding: 8px 25px;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme, isHighlighted}) => (
        isHighlighted ? theme.main.primary : theme.main.secondary
    )};
`;

export const Label = styled.Text`
    text-transform: capitalize;
    color: ${({theme}) => theme.text.primary};    
`;