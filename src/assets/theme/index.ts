import { RFValue } from 'react-native-responsive-fontsize';

const theme = {
  colors: {
    primary: '#F9A826',

    black: '#28262e',
    white: '#F7F7FF',

    softBlack: '#312e38',
    darkGray: '#3e3b47',
    gray: '#8B8C89',

    red: '#FF6584',
    green: '#56E39F',
  },
  fonts: {
    regular: 'Roboto-Regular',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  fontSize: {
    small: `${RFValue(12)}px`,
    medium: `${RFValue(16)}px`,
    large: `${RFValue(20)}px`,
    extraLarge: `${RFValue(32)}px`,
  },
};

export default theme;
