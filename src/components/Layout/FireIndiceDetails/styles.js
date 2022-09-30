import styled from "styled-components/native";

export const RootContainer = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const Container = styled.View`
	width: 80%;
	padding: 10px 10px 20px 10px;
	elevation: 5;
	border-radius: 15px;
	background-color: #fff;
`;

export const ContainerIcon = styled.View`
	width: 100%;
	align-items: center;
	margin-bottom: 15px;
`;

export const ContainerWeather = styled.View`
	padding: 5px 5px 20px 5px;
	margin-top: 20px;
	elevation: 7;
	border-radius: 5px;
	background-color: #fff;
`;

export const ContainerStepIndicador = styled.View`
	margin-top: 20px;
`;

export const ContainerDataWeather = styled.View`
	flex-direction: row;
	width: 100%;
	margin-top: 15px;
	justify-content: space-around;
`;

export const ContainerInfoWeather = styled.View`
	align-items: center;
	justify-content: center;
`;

export const ContainerOptions = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: center;
	margin-top: 20px;
`;

export const Label = styled.Text`
	text-align: center;
	font-weight: ${({isBold}) => isBold ? "bold" : "normal"};
`;

export const Space = styled.View`
	margin: ${({size}) => size + "px"};
`;

export const Button = styled.TouchableOpacity`
	border-radius: 5px;
	padding: 5px;
	width: 25%;
	justify-content: center;
	align-items: center;
	background-color: ${({theme}) => theme.colors.main.primary};
	margin: 0 5px;
	elevation: 4;
`;

export const LabelButton = styled.Text`
	color: #fff;
	font-weight: bold;
`;

export const statusIndicador = {
	separatorStrokeWidth: 2,
	currentStepStrokeWidth: 5,
	stepStrokeCurrentColor: "#C00000",
	stepStrokeWidth: 3,
	stepStrokeFinishedColor: "#C00000",
	stepStrokeUnFinishedColor: "#aaaaaa",
	separatorFinishedColor: "#C00000",
	separatorUnFinishedColor: "#aaaaaa",
	stepIndicatorFinishedColor: "#C00000",
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorLabelCurrentColor: "#C00000",
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#aaaaaa",
	labelColor: "#999999",
	labelSize: 12,
	currentStepLabelColor: "#C00000"
};
