/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField as ChakraNumberInputField,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { GenericInputFieldProps } from './types';

type NumberFieldProps = GenericInputFieldProps<number>;

const NumberInputField: React.FC<NumberFieldProps> = ({
  validate,
  fieldName,
  placeholder,
  idPrefix,
  displayName,
  isRequired,
}) => (
  <Field name={fieldName} validate={(val: string) => validate(Number(val))}>
    {({ field, form }: FieldProps) => (
      <FormControl
        isRequired={isRequired}
        isInvalid={Boolean(form.errors[fieldName] && form.touched)}
      >
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        <NumberInput
          {...field}
          onChange={(val) => {
            form.setFieldValue(fieldName, val);
          }}
        >
          <ChakraNumberInputField id={`${idPrefix ?? ''}${fieldName}`} placeholder={placeholder} />
        </NumberInput>
        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default NumberInputField;
