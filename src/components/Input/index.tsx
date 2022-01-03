import React, { forwardRef, useState } from 'react';
import { TextInputProps, TextInput as TextInputRN } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  InputContainer,
  InputLabel,
  TextInput,
  ShowPasswordButton,
  ErrorLabel,
} from './styles';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  disabled?: boolean;
}

const Input = forwardRef<TextInputRN, InputProps>(
  ({ label, error, disabled, onChangeText, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleInputFocus = () => {
      setIsFocused(true);
    };

    const handleInputBlur = () => {
      setIsFocused(false);
    };

    return (
      <Container>
        {label && <InputLabel>{label}</InputLabel>}

        <InputContainer
          isFocused={isFocused}
          isErrored={!!error}
          disabled={disabled}
        >
          <TextInput
            {...props}
            ref={ref}
            editable={props.editable !== undefined ? props.editable : !disabled}
            //  placeholderTextColor={colors.tinGrey}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            secureTextEntry={props.secureTextEntry && !showPassword}
            onChangeText={onChangeText}
          />

          {props.secureTextEntry && (
            <ShowPasswordButton onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off' : 'eye'} />
            </ShowPasswordButton>
          )}
        </InputContainer>

        <ErrorLabel hidden={!error}>{error}</ErrorLabel>
      </Container>
    );
  },
);

export default Input;
