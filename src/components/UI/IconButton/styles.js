import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	padding: 10px 15px;
	background-color: ${({theme}) => theme.colors.main.tertiary};
`;

export const Label = styled.Text`
	color: #fff;
`;
