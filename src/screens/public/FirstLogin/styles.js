import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 15px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

export const Info = styled.Text`
  margin: 10px;
	font-size: 14px;
  text-align: center;
  ${({ theme }) => `
		color: ${theme.colors.text["primary-v1"]};
	`};
`;
