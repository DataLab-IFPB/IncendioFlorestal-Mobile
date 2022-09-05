import { Dimensions, StyleSheet } from "react-native";
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

export const ButtonClose = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	padding: 15px;
	background-color: #000;
	border-radius: 50px;
	elevation: 3;
`;

export const ContainerNotification = styled.View`
	width: 100%;
	align-items: center;
	justify-content: center;
	elevation: 3;
`;

export const Notification = styled.View`
	flex-direction: row;
	position: relative;
	bottom: 7%;
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

const { width } = Dimensions.get("window");
export default StyleSheet.create({
	containerMap: {
		flex: 1,
	},
	containerMapsAndButtons: {
		flex: 1,
	},
	containerInteration: {
		alignItems: "center",
		width: "100%",
		height: "20%",
	},
	containerIndexFire: {
		width: 100,
		height: 100,
	},
	containerIndicesNotFound: {
		width: 250,
		height: 100,
		backgroundColor: "#000",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		elevation: 10,
		zIndex: 2,
		borderRadius: 30,
		top: "40%",
		left: "20%",
	},
	labelIndiceNotFound: {
		textAlign: "center",
		fontSize: width * 0.05,
		fontWeight: "bold",
		color: "#FFF",
	},
	btnOkIndiceNotFound: {
		backgroundColor: "#fff",
		width: 80,
		height: 20,
		alignItems: "center",
		borderRadius: 15,
	},
	labelButtonOk: {
		fontSize: width * 0.04,
		fontWeight: "bold",
		color: "#000",
	},
	containerIconLocation: {
		position: "absolute",
		zIndex: 2,
		marginLeft: "3.8%",
		top: "5%",
		backgroundColor: "#000",
		borderRadius: 30,
		height: width * 0.1,
		width: width * 0.07,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderColor: "#000",
	},

	styleIcon: {
		fontSize: width * 0.07,
		color: "#FFF",
	},
	iconFilter: {
		fontSize: width * 0.05,
		color: "#FFF",
	},
	containerFilter: {
		top: "14%",
	},
});
