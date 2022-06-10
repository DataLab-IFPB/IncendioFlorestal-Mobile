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

export const WindInfoLabel = styled.Text`
  text-align: center;
  font-size: 10px;
  margin-right: 6px;
  margin-bottom: -3px;
  color: ${({theme}) => theme.text.primary};
`;

export const NorthLabel = styled.Text`
  text-align: center;
  font-size: 10px;
  margin-right: 1px;
  margin-bottom: -3px;
  font-weight: bold;
  color: ${({theme}) => theme.text.primary};
`;

export const WindIcons = styled.View`
  align-items: center;
  flex-direction: column;
  margin-right: -2px;
`;

export const WindInfoContainer = styled.View`
  justify-content: center;
  flex-direction: row;
  width: 60px;
  height: 30px;
  border-width: 1.2px;
  border-radius: 10px;
  border-color: ${({theme}) => theme.text.primary};
`;