import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  BackToLoginButton,
  BackToLoginButtonText,
} from './styles';
import { getValidationErrors } from '../../utils/getValidationErrors';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Digite um email válido'),
        password: Yup.string().required('Senha é obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      console.log(error);
      const errors = getValidationErrors(error);

      formRef.current?.setErrors(errors);
    }
  }, []);

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
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="name"
              icon="user"
              placeholder="Nome"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              name="email"
              icon="mail"
              placeholder="E-mail"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Cadastrar
            </Button>
          </Form>
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
