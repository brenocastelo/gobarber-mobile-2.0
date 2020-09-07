import { TextInput as TextInputBase } from 'react-native';
import styled from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  background: #232129;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  margin-bottom: 8px;
  padding: 0 16px;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TextInput = styled(TextInputBase)`
  flex: 1;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  color: #fff;
`;

export const Icon = styled(FeatherIcons)`
  margin-right: 16px;
`;
