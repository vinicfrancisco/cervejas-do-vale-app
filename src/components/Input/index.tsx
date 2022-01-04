import React, { forwardRef, useMemo, useState } from 'react';
import { TextInputProps, TextInput as TextInputRN } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Container, TextInput, Icon, PasswordButton } from './styles';

export interface InputProps extends TextInputProps {
  error?: string;
  icon?: string;
}

const Input = forwardRef<TextInputRN, InputProps>(
  ({ icon, error, style, ...props }, ref) => {
    const { colors } = useTheme();

    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [hasFocused, setHasFocused] = useState<boolean>(false);
    const [isFilled, setIsFilled] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const inputIconName = useMemo(() => {
      if (props.secureTextEntry) {
        return showPassword ? 'eye-off' : 'eye';
      }

      return icon || '';
    }, [icon, props.secureTextEntry, showPassword]);

    const handleInputFocus = () => {
      setIsFocused(true);
      setHasFocused(true);
    };

    const handleInputBlur = () => {
      setIsFocused(false);
      setIsFilled(!!props.value);
    };

    const handlePressPasswordButton = () => {
      if (props.secureTextEntry) {
        setShowPassword(state => !state);
      }
    };

    return (
      <Container isFocused={isFocused} isErrored={!!error} style={style}>
        <TextInput
          {...props}
          ref={ref}
          keyboardAppearance="dark"
          placeholderTextColor={colors.gray}
          secureTextEntry={props.secureTextEntry && !showPassword && hasFocused}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        {(icon || props.secureTextEntry) && (
          <PasswordButton
            activeOpacity={props.secureTextEntry ? 0.3 : 1}
            onPress={handlePressPasswordButton}
          >
            <Icon
              name={inputIconName}
              size={20}
              color={isFocused || isFilled ? colors.primary : colors.gray}
            />
          </PasswordButton>
        )}
      </Container>
    );
  },
);

export default Input;
