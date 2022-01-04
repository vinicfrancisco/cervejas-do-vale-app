import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type ProfileStackParamsList = {
  MyProfile: undefined;
  Edit: undefined;
};

export type TabNavigationParamList = {
  Home: undefined;
  Favorites: undefined;
  Profile: NavigatorScreenParams<ProfileStackParamsList>;
};

export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<TabNavigationParamList>;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
