import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 30px 150px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin: 64px 0 24px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #f4ede8;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px 0 16px;
`;

export const CreateAccountButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #ff9000;

  margin-left: 14px;
`;
