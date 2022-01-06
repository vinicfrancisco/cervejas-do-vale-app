import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';
import { PickerItem } from '../..';
import {
  Modal,
  Container,
  Header,
  Title,
  OptionButton,
  OptionLabel,
  Separator,
  CloseButton,
} from './styles';

interface PickerModalProps {
  visible: boolean;
  label: string;
  options: PickerItem[];
  onConfirm: (value: PickerItem) => void;
  onDismiss: () => void;
}

const PickerModal: React.FC<PickerModalProps> = ({
  visible,
  label,
  options,
  onConfirm,
  onDismiss,
}) => {
  const { colors } = useTheme();

  const renderItem = useCallback(
    ({ item: option }: ListRenderItemInfo<PickerItem>) => (
      <OptionButton onPress={() => onConfirm(option)}>
        <OptionLabel>{option.label}</OptionLabel>

        <Icon name="chevron-right" color={colors.primary} size={24} />
      </OptionButton>
    ),
    [colors.primary, onConfirm],
  );

  return (
    <Modal visible={visible} propagateSwipe onDismiss={onDismiss}>
      <Container>
        <Header>
          <Title>{label}</Title>

          <CloseButton onPress={onDismiss}>
            <Icon name="x" size={24} color={colors.gray} />
          </CloseButton>
        </Header>

        <FlatList
          data={options}
          contentContainerStyle={{
            paddingTop: 8,
            flexGrow: 1,
          }}
          keyExtractor={(_, index) => String(index)}
          ItemSeparatorComponent={() => <Separator />}
          renderItem={renderItem}
        />
      </Container>
    </Modal>
  );
};

export default PickerModal;
