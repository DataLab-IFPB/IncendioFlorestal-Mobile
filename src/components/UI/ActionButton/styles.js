import styled from "styled-components/native";

export const Button = styled.TouchableOpacity`
	border-radius: 50px;
	width: 30px;
	height: 30px;
	justify-content: center;
	align-items: center;
	background-color: ${({theme}) => theme.colors.main["primary-v1"]};
`;
