import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputForm from '~/components/Form/InputForm';
import { Container, Content, BeerLogo, Title } from './styles';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Informe o e-mail'),
  password: yup.string().required('Informa a senha'),
});

const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [loading, setLoading] = useState<boolean>(false);

  const passwordInputRef = useRef<TextInput | null>(null);

  const onSubmit = (data: FormData) => {
    try {
      setLoading(true);

      console.log(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Content>
        <BeerLogo width={200} height={200} />

        <Title>TESTE</Title>

        <InputForm
          label="E-mail"
          name="email"
          editable={!loading}
          control={control}
          error={errors.email?.message}
          onSubmitEditing={() => passwordInputRef.current?.focus()}
        />

        <InputForm
          ref={passwordInputRef}
          secureTextEntry
          editable={!loading}
          label="Senha"
          name="password"
          control={control}
          error={errors.password?.message}
          onSubmitEditing={handleSubmit(onSubmit)}
        />
      </Content>
    </Container>
  );
};

export default Login;
