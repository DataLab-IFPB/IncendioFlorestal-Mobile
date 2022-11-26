import styled from "styled-components/native";

export const RootContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.View`
	width: 70%;
	padding: 10px;
	align-items: center;
	justify-content: center;
	border-radius: 15px;
	${({theme}) => `
		border: 1px solid ${theme.colors.main["primary-v1"]};
    background-color: ${theme.colors.main["primary-v3"]};
	`};
`;

export const Label = styled.Text`
	text-align: center;
	font-size: 16px;
	font-weight: bold;
	color: ${({theme}) => theme.colors.text["primary-v2"]};
`;

export const Touchable = styled.TouchableOpacity`
	margin: 20px 10px 10px 10px;
	padding: 5px 50px;
	border-radius: 15px;
	background-color: #fff;
`;

export const LabelButton = styled.Text`
  font-weight: bold;
`;
