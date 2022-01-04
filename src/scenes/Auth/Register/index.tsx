import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import Button from '~/components/Button';
import useAlert from '~/hooks/useAlert';
import useAuth from '~/hooks/useAuth';
import {
  Container,
  Content,
  BeerLogo,
  Title,
  AuthInput,
  RegisterContainer,
  RegisterButton,
  RegisterText,
} from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail obrigatório'),
  password: yup.string().min(6, 'No mínimo 6 digitos').required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required(),
});

const Register: React.FC = () => {
  const { navigate, reset } = useNavigation();
  const { register } = useAuth();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState<boolean>(false);

  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);
  const confirmPasswordInputRef = useRef<TextInput | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      Keyboard.dismiss();

      setLoading(true);

      const { name, email, password } = data;

      await register({ name, email, password });

      reset({
        index: 0,
        routes: [
          {
            name: 'Home',
          },
        ],
      });
    } catch {
      showAlert({
        show: true,
        title: 'Falha ao realizar cadastro',
        description: 'Verifique os dados informados e tente novamente',
        buttonLabel: 'Ok, entendi',
      });
    } finally {
      setLoading(false);
    }
  };

  const onInvalid = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container keyboardShouldPersistTaps="handled">
        <Content>
          <BeerLogo width={200} height={200} />

          <Title>Cervejas do Vale</Title>

          <AuthInput
            name="name"
            placeholder="Nome"
            icon="user"
            editable={!loading}
            control={control}
            error={errors.name?.message}
            onSubmitEditing={() => emailInputRef.current?.focus()}
          />

          <AuthInput
            ref={emailInputRef}
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
            placeholder="E-mail"
            editable={!loading}
            control={control}
            error={errors.email?.message}
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <AuthInput
            ref={passwordInputRef}
            secureTextEntry
            editable={!loading}
            name="password"
            placeholder="Senha"
            control={control}
            error={errors.password?.message}
            blurOnSubmit={false}
            textContentType="oneTimeCode"
            onSubmitEditing={() => confirmPasswordInputRef.current?.focus()}
          />

          <AuthInput
            ref={confirmPasswordInputRef}
            secureTextEntry
            editable={!loading}
            name="passwordConfirmation"
            placeholder="Confirmar senha"
            control={control}
            error={errors.passwordConfirmation?.message}
            blurOnSubmit={false}
            textContentType="oneTimeCode"
            onSubmitEditing={handleSubmit(onSubmit, onInvalid)}
          />

          <Button loading={loading} onPress={handleSubmit(onSubmit, onInvalid)}>
            Registrar
          </Button>

          <RegisterContainer>
            <RegisterText>{'Já tem conta? '}</RegisterText>

            <RegisterButton
              onPress={() => navigate('Auth', { screen: 'Login' })}
            >
              <RegisterText button>Faça login</RegisterText>
            </RegisterButton>
          </RegisterContainer>
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Register;
