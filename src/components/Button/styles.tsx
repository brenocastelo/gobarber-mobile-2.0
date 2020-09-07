import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  background: #ff9000;
  width: 100%;
  height: 60px;
  border-radius: 10px;

  margin-top: 8px;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
`;
