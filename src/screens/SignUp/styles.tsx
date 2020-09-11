import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;

  justify-content: center;
  align-items: center;

  padding: 0 30px 150px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;

  margin: 64px 0 24px;
`;

export const BackToLoginButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  background: #312e38;

  border-top-width: 1px;
  border-color: #232129;

  padding: 16px 0;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToLoginButtonText = styled.Text`
  font-size: 16px;
  font-family: 'RobotoSlabn-Regular';
  color: #f4ede8;

  margin-left: 18px;
`;
