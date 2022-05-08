import styled from 'styled-components';

export const ContainerRoot = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const Title = styled.Text`
  margin-top: 15px;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
`;

export const Info = styled.Text`
  margin: 10px;
  font-size: 14px;
  text-align: center;
  color: ${({ theme }) => theme.secondary.label};
`;