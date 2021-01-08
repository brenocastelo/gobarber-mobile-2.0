import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { Provider } from './index';

interface ProviderProps {
  isSelected: boolean;
}

interface HourProps extends ProviderProps {
  isAvailable: boolean;
}

interface HourTexProps {
  isSelected: boolean;
}

export const Content = styled.ScrollView``;

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #28262e;

  padding: 24px;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  color: #f4ede8;
`;

export const Avatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const ProvidersListContainer = styled.View`
  height: 112px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 32px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderProps>`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
  padding: 12px;
  border-radius: 10px;
  background: ${props => (props.isSelected ? '#ff9000' : '#423f4d')};
`;

export const ProviderName = styled.Text<ProviderProps>`
  font-size: 18px;
  font-family: 'RobotoSlab-Medium';
  color: ${props => (props.isSelected ? '#423f4d' : '#f4ede8')};
`;

export const ProviderAvatar = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 16px;
  margin-right: 10px;
`;

export const Calendar = styled.View``;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 24px;
  color: #f4ede8;
  margin: 24px 16px; ;
`;

export const ToggleDatePickerButton = styled(RectButton)`
  height: 46px;
  background: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 16px;
`;

export const ToggleDatePickerButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #423f4d;
`;

export const Schedule = styled.View`
  margin-top: 40px;
`;

export const Section = styled.View`
  margin-bottom: 24px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const SectionTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #999591;
  margin: 0 24px 12px;
`;

export const Hour = styled(RectButton)<HourProps>`
  background: ${({ isSelected }) => (isSelected ? '#ff9000' : '#3e3b47')};
  opacity: ${({ isAvailable }) => (isAvailable ? 1 : 0.3)};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
  height: 40px;
  padding: 14px;
`;

export const HourText = styled.Text<HourTexProps>`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: ${({ isSelected }) => (isSelected ? '#232129' : '#f4ede8')};
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 50px;
  background: #ff9000;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 0 16px;
`;

export const CreateAppointmentButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #423f4d;
`;
