import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';

import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Content,
  Header,
  HeaderTitle,
  BackButton,
  Avatar,
  ProvidersListContainer,
  ProvidersList,
  ProviderContainer,
  ProviderName,
  ProviderAvatar,
  Calendar,
  Title,
  ToggleDatePickerButton,
  ToggleDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import api from '../../services/api';
import { Alert, Platform } from 'react-native';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface DayAvailability {
  hour: number;
  isAvailable: boolean;
}

const CreateAppointment: React.FC = () => {
  const routes = useRoute();
  const routeParams = routes.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedProviderId, setSelectedProviderId] = useState(
    routeParams.providerId,
  );
  const [selectedHour, setSelectedHour] = useState(0);

  const { goBack, navigate } = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    api.get('/providers').then(response => setProviders(response.data));
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProviderId}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => setDayAvailability(response.data));
  }, [selectedDate, selectedProviderId]);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProviderId(providerId);
  }, []);

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(showDatePickerState => !showDatePickerState);
  }, []);

  const handleDateChange = useCallback((event: unknown, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }
  }, []);

  const handleSelectHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(() => {
    try {
      const date = new Date(selectedDate);
      date.setHours(selectedHour);
      date.setMinutes(0);

      api.post('/appointments', { provider_id: selectedProviderId, date });

      navigate('AppointmentCreated', { date: date.getTime() });
    } catch (error) {
      Alert.alert(
        'Ocorreu um erro ao criar agendamento.',
        'Por favor, tente novamente.',
      );
    }
  }, [navigate, selectedDate, selectedHour, selectedProviderId]);

  const morningSchedules = useMemo(() => {
    const schedules = dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, isAvailable }) => ({
        isAvailable,
        hour,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));

    return schedules;
  }, [dayAvailability]);

  const afternoonSchedules = useMemo(() => {
    const schedules = dayAvailability
      .filter(({ hour }) => hour > 12)
      .map(({ hour, isAvailable }) => ({
        isAvailable,
        hour,
        formattedHour: format(new Date().setHours(hour), 'HH:00'),
      }));

    return schedules;
  }, [dayAvailability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={goBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Agendamento</HeaderTitle>
        <Avatar source={{ uri: user.avatar_url }} />
      </Header>
      <Content>
        <ProvidersListContainer>
          <ProvidersList
            data={providers}
            keyExtractor={provider => provider.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                isSelected={selectedProviderId === provider.id}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName isSelected={selectedProviderId === provider.id}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <ToggleDatePickerButton onPress={handleToggleDatePicker}>
            <ToggleDatePickerButtonText>
              Selecionar uma data
            </ToggleDatePickerButtonText>
          </ToggleDatePickerButton>

          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display="calendar"
              value={selectedDate}
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>
            <SectionContent>
              {morningSchedules.map(({ formattedHour, hour, isAvailable }) => (
                <Hour
                  enabled={isAvailable}
                  isAvailable={isAvailable}
                  isSelected={hour === selectedHour}
                  key={formattedHour}
                  onPress={() => handleSelectHour(hour)}
                >
                  <HourText isSelected={hour === selectedHour}>
                    {formattedHour}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>
            <SectionContent>
              {afternoonSchedules.map(
                ({ formattedHour, hour, isAvailable }) => (
                  <Hour
                    enabled={isAvailable}
                    isAvailable={isAvailable}
                    isSelected={hour === selectedHour}
                    key={formattedHour}
                    onPress={() => handleSelectHour(hour)}
                  >
                    <HourText isSelected={hour === selectedHour}>
                      {formattedHour}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>
    </Container>
  );
};

export default CreateAppointment;
