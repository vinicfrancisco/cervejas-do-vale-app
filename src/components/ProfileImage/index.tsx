import React from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';
import useUser from '~/hooks/useUser';
import { Image, ImagePreview } from './styles';

interface ProfileImageProps {
  loading?: boolean;
}

const ProfileImage: React.VFC<ProfileImageProps> = ({ loading }) => {
  const { user } = useUser();
  const { colors } = useTheme();

  if (loading) {
    return (
      <ImagePreview>
        <ActivityIndicator size="small" color={colors.primary} />
      </ImagePreview>
    );
  }

  return user?.avatar_url ? (
    <Image source={{ uri: user.avatar_url }} />
  ) : (
    <ImagePreview>
      <Icon name="user" size={60} color={colors.gray} />
    </ImagePreview>
  );
};

export default ProfileImage;
