import { RectButton } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: 'RobotoSlab-Medium';
  text-align: center;
  color: #f4ede8;
  margin: 16px 0;
`;

export const Description = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
  color: #999591;
  margin-bottom: 60px; ;
`;

export const Button = styled(RectButton)`
  background: #ff9000;
  padding: 17px 40px;
  border-radius: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  color: #312e38;
`;
