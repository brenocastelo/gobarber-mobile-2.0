import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  BackToLoginButton,
  BackToLoginButtonText,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <Image source={logo} />

          <Title>Crie sua conta</Title>

          <Input name="name" icon="user" placeholder="Nome" />
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button>Cadastrar</Button>
        </Container>

        <BackToLoginButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#F4EDE8" />
          <BackToLoginButtonText>Voltar para login</BackToLoginButtonText>
        </BackToLoginButton>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
