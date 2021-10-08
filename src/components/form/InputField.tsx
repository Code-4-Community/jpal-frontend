import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';

interface InputFieldProps {
  /**
   * Given the value of the input field, determines if the field is valid or not,
   * and if it is not valid returns a string to be displayed as an error message.
   * Otherwise if valid, returns undefined.
   */
  validate: (value: string) => string | undefined;

  /**
   * The label for the input field. By default this is also the id of the input field.
   */
  fieldName: string;

  /**
   * The prettified field name to be shown to the user.
   * For example, if the field name is "favoriteColor", the prettified name might be "Favorite Color".
   */
  displayName?: string;

  /**
   * A string to prefix the field name in the id attribute of the input field.
   * This is primarily used to ensure that the input field is unique.
   */
  idPrefix?: string;

  /**
   * The placeholder text for the input field.
   */
  placeholder?: string;
}

/**
 * A form input field for short text input to be composed with Form.
 */
const InputField: React.FC<InputFieldProps> = ({
  validate,
  fieldName,
  idPrefix,
  placeholder,
  displayName,
}) => (
  <Field name={fieldName} validate={validate}>
    {({ field, form }: FieldProps) => (
      <FormControl isInvalid={Boolean(form.errors[fieldName] && form.touched)}>
        <FormLabel htmlFor={fieldName}>{displayName ?? fieldName}</FormLabel>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Input {...field} id={`${idPrefix ?? ''}${fieldName}`} placeholder={placeholder} />
        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default InputField;
