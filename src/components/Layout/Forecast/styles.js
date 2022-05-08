import styled from 'styled-components';

export const Container = styled.View`
  top: 1%;
  z-index: 2;
  elevation: 5;
  margin-left: 43%;
  padding: 5px 15px;
  flex-direction: row;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.main.primary};
  border-radius: 15px;
  background-color: ${({theme}) => theme.main.secondary};
`;

export const ContainerInfo = styled.View`
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const Label = styled.Text`
  font-size: 13px;
  color: ${({theme}) => theme.text.primary};
`;