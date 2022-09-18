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

export const ContainerNotification = styled.View`
	position: absolute;
	bottom: 20px;
	width: 100%;
	align-items: center;
	justify-content: center;
	elevation: 3;
`;

export const Notification = styled.View`
	flex-direction: row;
	width: 85%;
	padding: 5px;
	align-items: center;
	justify-content: center;
	background-color: #000;
	border-radius: 25px;
`;

export const TextNotification = styled.Text`
	color: #FFF;
	margin-left: 5px;
	font-weight: bold;
`;
