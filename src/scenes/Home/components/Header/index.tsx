import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import {
  Container,
  HeaderContent,
  HeaderTitle,
  SearchInput,
  FiltersButton,
} from './styles';

interface HeaderProps {
  value: string;
  onChangeText: (value: string) => void;
}

const Header: React.VFC<HeaderProps> = ({ value, onChangeText }) => {
  const { navigate } = useNavigation();
  const { colors } = useTheme();

  return (
    <Container>
      <HeaderContent>
        <View style={{ width: 24 }} />

        <HeaderTitle>Cervejas do Vale</HeaderTitle>

        <FiltersButton
          onPress={() =>
            navigate('Main', { screen: 'Home', params: { screen: 'Filters' } })
          }
        >
          <Icon name="filter" size={20} color={colors.primary} />
        </FiltersButton>
      </HeaderContent>

      <SearchInput
        placeholder="Buscar cerveja"
        value={value}
        onChangeText={onChangeText}
      />
    </Container>
  );
};

export default Header;
