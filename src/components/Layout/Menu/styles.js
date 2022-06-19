import styled from "styled-components/native";

export const Container = styled.View`
    position: absolute;
    z-index: 2;
    margin: 15px;
`;

export const SubMenu = styled.View`
	display: ${({isVisible}) => isVisible ? "flex" : "none"};
`;

export const SubMenuOption = styled.View`
	flex-direction: row;
	align-items: flex-start;
`;

export const SubMenuLabel = styled.Text`
	background-color: #FFF;
	padding: 5px 10px;
	border-radius: 5px;
	margin-top: 5px;
	margin-left: 15px;
	elevation: 5;
`;
