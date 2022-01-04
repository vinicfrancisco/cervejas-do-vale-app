import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import Button from '~/components/Button';
import ProfileImage from '~/components/ProfileImage';
import useAlert from '~/hooks/useAlert';
import useUser from '~/hooks/useUser';
import {
  Container,
  Content,
  ChangeProfileImageButton,
  ChangeProfileImageText,
  ProfileInput,
} from './styles';

interface FormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

const schema = yup.object().shape(
  {
    name: yup.string().required('Nome obrigatório'),
    email: yup
      .string()
      .email('Digite um e-mail válido')
      .required('E-mail obrigatório'),
    oldPassword: yup
      .string()
      .ensure()
      .when('newPassword', {
        is: (val: string) => !!val,
        then: yup.string().required(),
      }),
    newPassword: yup.string().when('oldPassword', {
      is: (val: string) => !!val,
      then: yup.string().required(),
    }),
  },
  [['oldPassword', 'newPassword']],
);

const EditProfile: React.FC = () => {
  const { navigate } = useNavigation();
  const { user, updateUserProfile, updateProfileImage } = useUser();
  const { showAlert } = useAlert();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const emailInputRef = useRef<TextInput | null>(null);
  const oldPasswordRef = useRef<TextInput | null>(null);
  const newPasswordRef = useRef<TextInput | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      Keyboard.dismiss();

      setLoading(true);

      const { name, email, oldPassword, newPassword } = data;

      await updateUserProfile({
        name,
        email,
        oldPassword,
        newPassword,
      });

      navigate('Main', {
        screen: 'Profile',
        params: { screen: 'MyProfile' },
      });
    } catch {
      showAlert({
        show: true,
        title: 'Erro ao atualizar perfil',
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

  const selectProfileImage = async () => {
    try {
      const { assets } = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (!!assets && assets?.length > 0 && !!assets[0]?.uri) {
        setImageLoading(true);

        await updateProfileImage(assets[0].uri);

        setImageLoading(false);
      }
    } catch {
      showAlert({
        show: true,
        title: 'Erro ao atualizar imagem de perfil',
        description: 'Tente refazer o processo',
        buttonLabel: 'Ok, entendi',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Container keyboardShouldPersistTaps="handled">
        <Content>
          <ProfileImage loading={imageLoading} />

          <ChangeProfileImageButton onPress={selectProfileImage}>
            <ChangeProfileImageText>
              Alterar imagem de perfil
            </ChangeProfileImageText>
          </ChangeProfileImageButton>

          <ProfileInput
            name="name"
            placeholder="Nome"
            icon="user"
            editable={!loading}
            control={control}
            error={errors.name?.message}
            onSubmitEditing={() => emailInputRef.current?.focus()}
          />

          <ProfileInput
            ref={emailInputRef}
            name="email"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail"
            placeholder="E-mail"
            editable={!loading}
            control={control}
            error={errors.email?.message}
            onSubmitEditing={() => oldPasswordRef.current?.focus()}
          />

          <ProfileInput
            ref={oldPasswordRef}
            secureTextEntry
            editable={!loading}
            name="oldPassword"
            placeholder="Senha antiga"
            control={control}
            error={errors.oldPassword?.message}
            blurOnSubmit={false}
            textContentType="oneTimeCode"
            onSubmitEditing={() => newPasswordRef.current?.focus()}
          />

          <ProfileInput
            ref={newPasswordRef}
            secureTextEntry
            editable={!loading}
            name="newPassword"
            placeholder="Nova senha"
            control={control}
            error={errors.newPassword?.message}
            blurOnSubmit={false}
            textContentType="oneTimeCode"
            onSubmitEditing={handleSubmit(onSubmit, onInvalid)}
          />

          <Button loading={loading} onPress={handleSubmit(onSubmit, onInvalid)}>
            Salvar
          </Button>
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
