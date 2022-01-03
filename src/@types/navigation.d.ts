import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AppStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Home: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
