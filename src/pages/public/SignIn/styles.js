import styled from 'styled-components';

export const ContainerRoot = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const ContainerForm = styled(ContainerRoot)`
  width: 100%;
  padding: 0;
`;

export const ContainerVersion = styled.View`
  justify-content: flex-end;
`;

export const Form = styled.View`
  width: 100%;
  margin: 20px 0 5px 0;
`; 

export const LabelVersion = styled.Text`
  color: ${({theme}) => theme.text.secondary};
  font-size: 12px;
`;

