import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { GenericFieldProps } from './types';

type InputFieldProps = GenericFieldProps<string>;

/**
 * A form input field for short text input to be composed with Form.
 */
const InputField: React.FC<InputFieldProps> = ({
  validate,
  fieldName,
  idPrefix,
  placeholder,
  displayName,
  isRequired,
}) => (
  <Field
    name={fieldName}
    validate={(val: string) => (!val ? `${displayName ?? fieldName} is required.` : validate(val))}
  >
    {({ field, form }: FieldProps) => (
      <FormControl
        isRequired={isRequired}
        isInvalid={Boolean(form.errors[fieldName] && form.touched)}
      >
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Input {...field} id={`${idPrefix ?? ''}${fieldName}`} placeholder={placeholder} />
        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default InputField;
