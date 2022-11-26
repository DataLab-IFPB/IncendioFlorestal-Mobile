import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
  justify-content: center;
`;

export const FormContainer = styled(Container)`
  width: 100%;
  padding: 0;
`;

export const Version = styled.View`
  justify-content: flex-end;
`;

export const Form = styled.View`
  width: 100%;
  margin: 20px 0 5px 0;
`;

export const LabelVersion = styled.Text`
	font-size: 12px;
  ${({theme}) => `
		color: ${theme.colors.text["primary-v1"]};
	`};
`;

