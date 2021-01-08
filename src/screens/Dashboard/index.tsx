import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  UserName,
  ProfileButton,
  ProfileImage,
  ProvidersList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfos,
  ProviderName,
  ProviderSchedule,
  ProviderScheduleText,
  ProvidersListHeader,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data));
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId, providers });
  }, []);

  return (
    <Container>
      <Header>
        <Title>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </Title>

        <ProfileButton onPress={navigateToProfile}>
          <ProfileImage source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListHeader>Cabeleireiros</ProvidersListHeader>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar source={{ uri: provider.avatar_url }} />

            <ProviderInfos>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderSchedule>
                <Icon name="calendar" size={18} color="#ff9000" />
                <ProviderScheduleText>Segunda à sexta</ProviderScheduleText>
              </ProviderSchedule>

              <ProviderSchedule>
                <Icon name="clock" size={18} color="#ff9000" />
                <ProviderScheduleText>8h às 18h</ProviderScheduleText>
              </ProviderSchedule>
            </ProviderInfos>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
