import styled from 'styled-components';

export const Container = styled.View`
  top: 2%;
  right: 2%;
  z-index: 2;
  height: 8%;
  width: 60%;
  elevation: 5;
  padding: 5px 15px;
  flex-direction: row;
  position: absolute;
  align-items: center;
  border-radius: 15px;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.main.primary};
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