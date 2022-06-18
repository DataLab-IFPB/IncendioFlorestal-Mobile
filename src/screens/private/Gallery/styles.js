import styled from "styled-components/native";
import VideoPlayer from "react-native-video";

export const RootContainer = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	padding: 20px;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	${({isEmptyMedias}) => !isEmptyMedias && `
		justify-content: flex-start;
	`}
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

export const Title = styled.Text`
	font-weight: bold;
	font-size: 18px;
	letter-spacing: 3px;
	text-align: center;

	${({isEmptyMedias}) => !isEmptyMedias && `
		width: 90%;
	`}
`;

export const Label = styled.Text`
	font-size: 16px;
	height: 10%;
	text-align: center;
`;

export const TitleLabel = styled(Label)`
	font-weight: bold;
`;

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
		border: 3px solid ${theme.colors.main.primary};
	`};
`;

export const ImageSlider = styled.Image`
	width: 80px;
	height: 80px;
	border-radius: 15px;
`;

