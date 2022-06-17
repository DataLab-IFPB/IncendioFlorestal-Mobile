import styled from "styled-components/native";

export const Touchable = styled.TouchableOpacity`
    margin: 5px 0;
    padding: 8px 0;
	width: 90%;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    background-color: ${({theme, isHighlighted}) => (
		isHighlighted ? theme.main.primary : theme.main.secondary
	)};
`;

export const Label = styled.Text`
    text-transform: uppercase;
	font-size: 12px;
	font-weight: bold;
    color: ${({theme}) => theme.text.primary};
`;