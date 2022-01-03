import { TextInput as RNTextInput } from 'react-native';
import styled from 'styled-components/native';

interface InputContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  disabled?: boolean;
}

export const Container = styled.View``;

export const InputContainer = styled.View<InputContainerProps>``;

export const InputLabel = styled.Text``;

export const TextInput = styled(RNTextInput)``;

export const ShowPasswordButton = styled.TouchableOpacity``;

export const ErrorLabel = styled.Text<{ hidden: boolean }>``;
