import styled from "styled-components/native";

export const Container = styled.View`
	flex: 1;
	padding: 15px;
`;

export const Card = styled.View`
	flex-direction: row;
	width: 100%;
	elevation: 2;
	padding: 10px;
	margin-bottom: 15px;
	border-radius: 5px;
	border: 1px solid #EAEAEA;
	background-color: #FFF;
`;

export const List = styled.FlatList`
	flex: 1;
	width: 100%;
`;

export const ListContainer = styled.View`
	justify-content: center;
	align-items: center;
	margin-top: 30px;
	height: 78%;
`;

export const Label = styled.Text`
	width: 100%;
	font-size: 16px;
`;

export const Title = styled.Text`
	font-weight: bold;
	font-size: 18px;
	letter-spacing: 3px;
	text-align: center;
	width: 85%;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

export const Touchable = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	padding: 5px;
`;

export const Content = styled.View`
	flex-direction: row;
	align-items: center;
	margin: 5px 0;
`;

export const Warning = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

export const LineVertical = styled.View`
	height: 100%;
	margin: 0 5px;
	border-radius: 10px;
	border: 1px solid #D7D7D7;
`;

export const Info = styled.View`
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
