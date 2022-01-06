import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type ProfileStackParamsList = {
  MyProfile: undefined;
  Edit: undefined;
};

export type HomeStackParamsList = {
  BeersList: undefined;
  Filters: undefined;
  BeerDetail: {
    beerId: string;
    beerName: string;
  };
};

export type TabNavigationParamList = {
  Home: NavigatorScreenParams<HomeStackParamsList>;
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
