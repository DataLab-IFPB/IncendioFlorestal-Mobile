import styled from 'styled-components';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const RootContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.View`
  width: ${Math.floor(width / 1.5) + 'px'};
  align-items: center;
  justify-content: center;
  background-color: #FFF;
  border-radius: 15px;
  elevation: 5;
  padding: 10px 5px 15px 5px;
`;

export const ContainerSlider = styled.View`
  align-items: center;
  width: 80%;
  margin-bottom: 15px;
`;

export const ContainerOptions = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Label = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  margin: 5px 10px 5px 10px;
`;

export const LabelSlider = styled.Text`
    margin-top: 10px;
    font-size: 14px;
`;