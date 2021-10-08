import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberInput,
  NumberInputField as ChakraNumberInputField,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { GenericFieldProps } from './types';

type NumberFieldProps = GenericFieldProps<number>;

const NumberInputField: React.FC<NumberFieldProps> = ({
  validate,
  fieldName,
  placeholder,
  idPrefix,
  displayName,
}) => (
  <Field name={fieldName} validate={validate}>
    {({ field, form }: FieldProps) => (
      <FormControl isInvalid={Boolean(form.errors.userId && form.touched)}>
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <NumberInput {...field} onChange={(val) => form.setFieldValue(field.name, Number(val))}>
          <ChakraNumberInputField id={`${idPrefix ?? ''}${fieldName}`} placeholder={placeholder} />
        </NumberInput>
        <FormErrorMessage>{form.errors.userId}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default NumberInputField;
