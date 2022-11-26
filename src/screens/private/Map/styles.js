import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
`;

export const Actions = styled.View`
	width: 100%;
	align-items: center;
	position: absolute;
	bottom: 30px;
	z-index: 999;
`;

export const Button = styled.TouchableOpacity`
	display: flex;
	width: 45px;
	height: 45px;
	align-items: center;
	justify-content: center;
`;

export const ButtonClose = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	elevation: 3;
	padding: 15px;
	border-radius: 50px;
	background-color: #000;
`;

export const NotificationContainer = styled.View`
	position: absolute;
	align-items: center;
	justify-content: center;
	elevation: 3;
	bottom: 20px;
	width: 100%;
`;

export const Notification = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 85%;
	padding: 5px;
	border-radius: 25px;
	background-color: #000;
`;

export const TextNotification = styled.Text`
	margin-left: 5px;
	font-weight: bold;
	color: ${({theme}) => theme.colors.text["primary-v2"]};
`;
