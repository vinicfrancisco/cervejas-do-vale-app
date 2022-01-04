import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultHeaderProps } from '~/components/Header';
import BackButton from '~/components/Header/BackButton';
import EditProfile from '~/scenes/EditProfile';
import Profile from '~/scenes/Profile';
import { ProfileStackParamsList } from '~/@types/navigation';

const ProfileStack = createNativeStackNavigator<ProfileStackParamsList>();

const ProfileNavigation: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        ...defaultHeaderProps,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <ProfileStack.Screen
        name="MyProfile"
        component={Profile}
        options={{
          title: 'Perfil',
        }}
      />

      <ProfileStack.Screen
        name="Edit"
        component={EditProfile}
        options={{
          title: 'Editar perfil',
          headerLeft: () => (
            <BackButton
              onPress={() =>
                navigate('Main', {
                  screen: 'Profile',
                  params: { screen: 'MyProfile' },
                })
              }
            />
          ),
        }}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigation;
