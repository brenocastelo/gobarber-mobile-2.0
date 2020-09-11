import { TextInput as TextInputBase } from 'react-native';
import styled, { css } from 'styled-components/native';
import FeatherIcons from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  hasError: boolean;
}

interface IconProps {
  isFilled: boolean;
  isFocused: boolean;
}

export const Container = styled.View<ContainerProps>`
  background: #232129;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #232129;
  margin-bottom: 8px;
  padding: 0 16px;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #ff9000;
    `}

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

export const Icon = styled(FeatherIcons)<IconProps>`
  margin-right: 16px;
  color: ${({ isFilled, isFocused }) =>
    isFilled || isFocused ? '#ff9000' : '#667360'};
`;
