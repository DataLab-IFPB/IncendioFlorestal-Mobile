import styled from "styled-components/native";
import VideoPlayer from "react-native-video";

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 20px;

	${({isEmptyMedias}) => !isEmptyMedias && `
		justify-content: flex-start;
	`}
`;

export const Media = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
`;

export const IconPlayer = styled.View`
	height: 100%;
	width: 100%;
	z-index: 999;
	position: absolute;
	align-items: center;
	justify-content: center;
`;

export const Title = styled.Text`
	font-size: 18px;
	font-weight: bold;
	text-align: center;
	letter-spacing: 3px;

	${({isEmptyMedias}) => !isEmptyMedias && `
		width: 90%;
	`}
`;

export const Label = styled.Text`
	height: 10%;
	font-size: 16px;
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
	justify-content: space-around;
	align-items: center;
	margin-bottom: 15px;
	padding-left: 20px;
`;

export const ItemSlider = styled.TouchableOpacity`
	margin: 10px;
	${({isSelected, theme}) => isSelected && `
		border-radius: 18px;
		border: 3px solid ${theme.colors.main["primary-v1"]};
	`};
`;

export const ImageSlider = styled.Image`
	width: 80px;
	height: 80px;
	border-radius: 15px;
`;

