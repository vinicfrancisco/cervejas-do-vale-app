import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from 'styled-components';
import { Container, Label } from './styles';

interface RadioProps {
  selected: boolean;
  label: string;
  onSelect: () => void;
}

const Radio: React.VFC<RadioProps> = ({ label, selected, onSelect }) => {
  const { colors } = useTheme();

  return (
    <Container onPress={onSelect}>
      <Label>{label}</Label>

      <Icon
        name={selected ? 'radio-button-on' : 'radio-button-off'}
        size={24}
        color={colors.primary}
      />
    </Container>
  );
};

export default Radio;
