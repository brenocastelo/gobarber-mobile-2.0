import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

import { Provider } from './index';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  background: #28262e;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 24px;
`;

export const Title = styled.Text`
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff9000;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  line-height: 28px;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const ProfileImage = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px 16px;
`;

export const ProviderContainer = styled(RectButton)`
  background: #3e3b47;
  padding: 18px 16px;
  margin-bottom: 16px;
  border-radius: 10px;

  flex-direction: row;
  align-items: center;
`;
export const ProviderAvatar = styled.Image`
  height: 72px;
  width: 72px;
  border-radius: 32px;
`;

export const ProviderInfos = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const ProviderName = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  margin-bottom: 12px;
`;

export const ProviderSchedule = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const ProviderScheduleText = styled.Text`
  margin-left: 10px;
  color: #999591;
  font-size: 14px;
  font-family: 'RobotoSlab-Regular';
`;

export const ProvidersListHeader = styled.Text`
  color: #f4ede8;
  font-size: 25px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 24px;
`;
