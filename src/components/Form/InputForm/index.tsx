import React, { forwardRef } from 'react';
import { Controller, Control } from 'react-hook-form';
import { TextInput } from 'react-native';
import Input, { InputProps } from '~/components/Input';

interface InputFormProps extends Omit<InputProps, 'value'> {
  name: string;
  control: Control<any, any>;
}

const InputForm = forwardRef<TextInput, InputFormProps>(
  ({ name, control, ...rest }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input {...rest} {...field} ref={ref} onChangeText={field.onChange} />
        )}
      />
    );
  },
);

export default InputForm;
