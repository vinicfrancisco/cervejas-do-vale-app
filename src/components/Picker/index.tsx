import React, { useCallback, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';
import PickerModal from './components/PickerModal';
import { Container, Label, PickerButtonText, ValueContainer } from './styles';

export interface PickerItem {
  label: string;
  value: string;
}

export interface PickerProps {
  label: string;
  options: PickerItem[];
  value?: string;
  onSelect: (item: string) => void;
}

const Picker: React.FC<PickerProps> = ({ label, options, value, onSelect }) => {
  const { colors } = useTheme();

  const [showPicker, setShowPicker] = useState<boolean>(false);

  const currentItemLabel = useMemo(() => {
    return options.find(option => option.value === value)?.label;
  }, [options, value]);

  const handleSelect = useCallback(
    (item: PickerItem) => {
      onSelect(item.value);

      setShowPicker(false);
    },
    [onSelect],
  );

  return (
    <>
      <PickerModal
        visible={showPicker}
        label={label}
        options={options}
        onDismiss={() => setShowPicker(false)}
        onConfirm={handleSelect}
      />

      <Container onPress={() => setShowPicker(true)}>
        <Label>{label}</Label>

        <ValueContainer>
          <PickerButtonText>{currentItemLabel}</PickerButtonText>
          <Icon name="chevron-down" size={24} color={colors.primary} />
        </ValueContainer>
      </Container>
    </>
  );
};

export default Picker;
