import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const RootContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.View`
  width: ${Math.floor(width / 1.5) + "px"};
  padding: 10px 10px 15px 10px;
  elevation: 5;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #FFF;
`;

export const ContainerOptions = styled.View`
  width: 100%;
  align-items: center;
`;

export const ContainerInput = styled.View`
	padding: 0 10px;
	margin-top: -15px;
	width: 100%;
`;

export const Label = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  margin-top: 5px;
`;


