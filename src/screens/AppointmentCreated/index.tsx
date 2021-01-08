import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Title, Description, Button, ButtonText } from './styles';

interface RouteParams {
  date: number;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleConfirm = useCallback(() => {
    reset({ routes: [{ name: 'Dashboard' }], index: 0 });
  }, [reset]);

  const formattedDate = useMemo(() => {
    const date = format(
      routeParams.date,
      "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
      { locale: ptBR },
    );

    return date;
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check" size={80} color="#04D361" />

      <Title>Agendamento concluído</Title>
      <Description>{formattedDate}</Description>

      <Button onPress={handleConfirm}>
        <ButtonText>Ok</ButtonText>
      </Button>
    </Container>
  );
};

export default AppointmentCreated;
