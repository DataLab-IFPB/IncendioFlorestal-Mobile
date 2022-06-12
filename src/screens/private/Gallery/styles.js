import styled from "styled-components/native";
import VideoPlayer from "react-native-video";

export const RootContainer = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	padding: 20px;
	flex-direction: row;
	justify-content: space-between;
`;

export const ContainerMedia = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const ContainerIconPlayer = styled.View`
	height: 100%;
	width: 100%;
	z-index: 999;
	position: absolute;
	align-items: center;
	justify-content: center;
`;

export const Label = styled.Text``;

export const Image = styled.Image`
	width: 320px;
	height: 450px;
	border-radius: 15px;
`;

export const Video = styled(VideoPlayer)`
	width: 320px;
	height: 450px;
	border-radius: 15px;
`;

export const Slider = styled.View`
	width: 100%;
	margin-bottom: 15px;
	padding-left: 20px;
	align-items: center;
	justify-content: space-around;
`;

export const ItemSlider = styled.TouchableOpacity`
	margin: 10px;
	${({isSelected, theme}) => isSelected && `
		border-radius: 18px;
		border: 3px solid ${theme.main.primary};
	`};
`;

export const ImageSlider = styled.Image`
	width: 80px;
	height: 80px;
	border-radius: 15px;
`;

