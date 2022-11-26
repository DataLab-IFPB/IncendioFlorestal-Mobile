import styled from "styled-components/native";

export const Touchable = styled.TouchableOpacity`
	height: 40px;
	width: 40px;
	justify-content: center;
	align-items: center;
	margin-bottom: 20px;
	padding: 10px;
	border-radius: 50px;
	elevation: 5;
	background-color: ${({theme}) => theme.colors.main["primary-v3"]};
`;
