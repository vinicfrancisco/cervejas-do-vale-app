import { RFValue } from 'react-native-responsive-fontsize';

const theme = {
  colors: {
    primary: '#F9A826',
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
  },
};

export default theme;
