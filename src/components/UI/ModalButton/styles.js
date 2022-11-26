import styled from "styled-components/native";

export const Touchable = styled.TouchableOpacity`
	margin: 5px 0;
	padding: 8px 0;
	width: 90%;
	border-radius: 50px;
	align-items: center;
	justify-content: center;
	background-color: ${({theme, isHighlighted}) => (
		isHighlighted ? theme.colors.main["primary-v1"] : theme.colors.main["primary-v3"]
	)};
`;

export const Label = styled.Text`
  text-transform: uppercase;
	font-size: 12px;
	font-weight: bold;
  color: ${({theme}) => theme.colors.text["primary-v2"]};
`;
