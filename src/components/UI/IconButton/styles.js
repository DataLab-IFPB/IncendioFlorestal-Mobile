import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	border-radius: 5px;
	margin: 5px 0;
	padding: 10px;
	width: 150px;
	background-color: ${({theme}) => theme.colors.main.tertiary};
`;

export const Label = styled.Text`
	color: #fff;
	margin-left: 5px;
`;
