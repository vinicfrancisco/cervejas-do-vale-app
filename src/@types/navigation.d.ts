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
  BeersList?: {
    brand?: string;
    type?: string;
  };
  Filters: undefined;
  BeerDetail: {
    beerId: string;
    beerName: string;
  };
};

export type FavoriteStackParamsList = {
  MyFavorites: undefined;
  BeerDetail: {
    beerId: string;
    beerName: string;
  };
};

export type TabNavigationParamList = {
  Home: NavigatorScreenParams<HomeStackParamsList>;
  Favorites: NavigatorScreenParams<FavoriteStackParamsList>;
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
