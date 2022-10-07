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
	background-color: ${({theme}) => theme.colors.main["primary-v3"]};
`;

export const Label = styled.Text`
	margin-left: 5px;
	color: ${({theme}) => theme.colors.text["primary-v2"]};
`;
