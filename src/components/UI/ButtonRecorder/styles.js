import styled from "styled-components/native";

export const Container = styled.View`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	z-index: 999;
	position: absolute;
	bottom: 30px;
	width: 100%;
`;

const TouchableBase = styled.TouchableOpacity`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({theme}) => theme.colors.main.tertiary};
	padding: 10px 30px;
	border-radius: 50px;
`;

export const TouchableStart = styled(TouchableBase)`
	padding-right: 20px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
`;

export const TouchableCancel = styled(TouchableBase)`
	margin-left: 3px;
	padding: 9px 15px;
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
`;

export const TouchableEnd = styled(TouchableBase)``;

export const Label =  styled.Text`
	color: #FFF;
	font-weight: bold;
`;
