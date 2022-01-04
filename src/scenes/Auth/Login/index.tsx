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
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Informe o e-mail'),
  password: yup.string().required('Informa a senha'),
});

const Login: React.FC = () => {
  const { navigate } = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput | null>(null);

  const onSubmit = (data: FormData) => {
    try {
      Keyboard.dismiss();

      setLoading(true);

      console.log(data);
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
            onSubmitEditing={handleSubmit(onSubmit, onInvalid)}
          />

          <Button onPress={handleSubmit(onSubmit, onInvalid)}>Acessar</Button>

          <RegisterContainer>
            <RegisterText>{'Não possui conta? '}</RegisterText>

            <RegisterButton
              onPress={() => navigate('Auth', { screen: 'Register' })}
            >
              <RegisterText button>Registre-se</RegisterText>
            </RegisterButton>
          </RegisterContainer>
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Login;
