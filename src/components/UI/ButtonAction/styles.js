import styled from "styled-components";

export const Button = styled.TouchableOpacity`
	border-radius: 50px;
	width: 30px;
	height: 30px;
	justify-content: center;
	align-items: center;
	background-color: ${({theme}) => theme.main.primary};
`;
