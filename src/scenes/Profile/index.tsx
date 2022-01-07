import React, { useCallback, useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import ProfileImage from '~/components/ProfileImage';
import useAuth from '~/hooks/useAuth';
import useUser from '~/hooks/useUser';
import {
  Container,
  Username,
  Email,
  LogoutButton,
  LogoutButtonText,
  Separator,
  AlexaCodeLabel,
  AlexaCode,
  EditProfileButton,
} from './styles';

const Profile: React.FC = () => {
  const { setOptions, navigate } = useNavigation();
  const { user } = useUser();
  const { logout } = useAuth();
  const { colors } = useTheme();

  const renderHeaderRightButton = useCallback(
    () => (
      <EditProfileButton
        onPress={() =>
          navigate('Main', {
            screen: 'Profile',
            params: {
              screen: 'Edit',
            },
          })
        }
      >
        <Icon name="edit" size={22} color={colors.primary} />
      </EditProfileButton>
    ),
    [colors.primary, navigate],
  );

  useLayoutEffect(() => {
    setOptions({
      headerRight: renderHeaderRightButton,
    });
  }, [setOptions, renderHeaderRightButton]);

  return (
    <Container>
      {user && (
        <>
          <ProfileImage />

          <Username>{user.name}</Username>

          <Email>{user.email}</Email>

          <LogoutButton onPress={logout}>
            <LogoutButtonText>Encerrar sessão</LogoutButtonText>
          </LogoutButton>

          <Separator />

          <AlexaCodeLabel>Seu código Alexa é:</AlexaCodeLabel>

          <AlexaCode>{user.code.code}</AlexaCode>
        </>
      )}
    </Container>
  );
};

export default Profile;
