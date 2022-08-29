import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const ContainerButtonClose = styled.View`
	width: 100%;
	align-items: center;
	position: absolute;
	bottom: 30px;
	z-index: 999;
`;

export const Button = styled.TouchableOpacity`
	width: 45px;
	height: 45px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ButtonClose = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	padding: 15px;
	background-color: #000;
	border-radius: 50px;
	elevation: 3;
`;
