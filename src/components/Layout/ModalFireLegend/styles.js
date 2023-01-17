import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const Container = styled.View`
  width: ${Math.floor(width / 1.5) + "px"};
  padding: 10px 10px 15px 10px;
  elevation: 20;
  align-items: center;
  justify-content: flex-start;
  border-radius: 15px;
  border: 2px solid ${({theme}) => theme.colors.main["primary-v1"]};
  background-color: ${({theme}) => theme.colors.main["primary-v3"]};
`;

export const Legend = styled.View`
  align-items: center;
  margin-top: 10px;
  flex-direction: row;
`;

export const LegendContainer = styled.View`
  align-items: flex-start;
  margin-top: 10px;
  flex-direction: column;
`;

export const Label = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  margin: 5px 10px 5px 10px;
  color: ${({theme}) => theme.colors.text["primary-v2"]};
`;

