import React, { useCallback, useRef } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import ImagePicker from 'react-native-image-picker';

import api from '../../services/api';

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Title,
  ProfilePictureButton,
  ProfilePicture,
  HeaderButton,
  CameraIconContainer,
} from './styles';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { useAuth } from '../../context/AuthContext';

interface ProfileFormData {
  name: string;
  email: string;
  current_password: string;
  new_password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const { goBack, navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const currentPasswordInputRef = useRef<TextInput>(null);
  const newPasswordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('o campo e-mail é obrigatório')
            .email('Digite um email válido'),
          name: Yup.string().required('O campo nome é obrigatório'),
          current_password: Yup.string(),
          new_password: Yup.string().when('current_password', {
            is: value => !!value,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string().when('current_password', {
            is: value => !!value,
            then: Yup.string()
              .required('Campo obrigatório')
              .oneOf([Yup.ref('new_password')], 'Senhas não são iguais'),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          email,
          name,
          current_password,
          new_password,
          password_confirmation,
        } = data;

        const passwordFormData = {
          current_password,
          new_password,
          password_confirmation,
        };

        const formData = {
          email,
          name,
          ...(current_password ? passwordFormData : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        goBack();
      } catch (error) {
        console.log({ error });
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);

          formRef.current?.setErrors(errors);
        }

        Alert.alert(
          'Erro ao realizar a atualização de perfil!',
          'Por favor, tente novamente.',
        );
      }
    },
    [navigate],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Escolha uma foto',
        cancelButtonTitle: 'Cancelar',
        chooseFromLibraryButtonTitle: 'Escolher da galeria',
        chooseWhichLibraryTitle: 'Tirar foto',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Error ao atualizar seu avatar');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api
          .patch('/users/avatar', data)
          .then(response =>
            updateUser(response.data).catch(_error =>
              Alert.alert('Error ao atualizar seu avatar'),
            ),
          );
      },
    );
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
          <HeaderButton onPress={goBack}>
            <Icon name="chevron-left" size={24} color="#999591" />
          </HeaderButton>

          <ProfilePictureButton onPress={handleUpdateAvatar}>
            <ProfilePicture source={{ uri: user.avatar_url }} />

            <CameraIconContainer>
              <Icon name="camera" size={24} color="#312E38" />
            </CameraIconContainer>
          </ProfilePictureButton>

          <View>
            <Title>Meu perfil</Title>
          </View>

          <Form ref={formRef} onSubmit={handleSubmit} initialData={user}>
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

            <Input
              ref={currentPasswordInputRef}
              name="current_password"
              icon="lock"
              placeholder="Senha atual"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => {
                newPasswordInputRef.current?.focus();
              }}
              containerStyle={{ marginTop: 24 }}
            />
            <Input
              ref={newPasswordInputRef}
              name="new_password"
              icon="lock"
              placeholder="Nova senha"
              secureTextEntry
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordConfirmationInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordConfirmationInputRef}
              name="password_confirmation"
              icon="lock"
              placeholder="Confirmar senha"
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
              Confirmar mudanças
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
