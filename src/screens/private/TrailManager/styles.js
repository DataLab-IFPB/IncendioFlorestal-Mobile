import styled from "styled-components/native";

export const RootContainer = styled.View`
	flex: 1;
	padding: 15px;
`;

export const ContainerOptions = styled.View`
	position: absolute;
	bottom: 10px;
	width: 100%;
	margin: 10px 10px 10px 15px;
`;

export const ContainerTrails = styled.View`
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	height: 78%;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const ContainerWarning = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const Label = styled.Text`
	font-size: 16px;
	width: 100%;
`;

export const Title = styled.Text`
	font-weight: bold;
	font-size: 18px;
	letter-spacing: 3px;
	text-align: center;
	width: 85%;
`;

export const Card = styled.View`
	flex-direction: row;
	padding: 10px;
	margin-bottom: 15px;
	border: 1px solid #EAEAEA;
	border-radius: 5px;
	width: 100%;
	background-color: #FFF;
	elevation: 2;
`;

export const ContainerInfo = styled.View`
	flex-direction: column;
	justify-content: flex-start;
	flex: 1;
`;

export const Content = styled.View`
	flex-direction: row;
	align-items: center;
	margin: 5px 0;
`;

export const Touchable = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	padding: 5px;
`;

export const LineVertical = styled.View`
	border: 1px solid #D7D7D7;
	border-radius: 10px;
	margin: 0 5px;
	height: 100%;
`;

export const LineHorizontal = styled(LineVertical)`
	width: 100%;
	height: auto;
	margin: 10px 0;
`;
