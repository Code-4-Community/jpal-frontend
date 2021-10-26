/* eslint-disable react/jsx-props-no-spreading */
import {
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Field, FieldProps } from 'formik';
import React from 'react';
import { GenericFormFieldProps } from './types';

interface MultipleChoiceFieldProps extends GenericFormFieldProps {
  options: Choice[];
}
type Choice = { label: string; value: string };

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({
  fieldName,
  idPrefix,
  displayName,
  isRequired,
  options,
}) => (
  <Field
    name={fieldName}
    validate={isRequired && ((value: string) => (value ? undefined : 'Required'))}
  >
    {({ field, form }: FieldProps) => (
      <FormControl
        // isRequired={isRequired}
        isInvalid={Boolean(
          form.errors[fieldName] && (form.touched[fieldName] || form.submitCount > 0),
        )}
      >
        <FormLabel htmlFor={fieldName} aria-label={displayName ?? fieldName}>
          {displayName ?? fieldName}
        </FormLabel>

        <Divider marginBottom="4" />

        <RadioGroup
          {...field}
          id={`${idPrefix ?? ''}${fieldName}`}
          onChange={(val) => form.setFieldValue(fieldName, val)}
          aria-required
        >
          <Stack direction="row" justify="space-between" wrap="wrap">
            {options.map(({ label, value }) => (
              <Radio
                key={value}
                value={value}
                data-testid={`${fieldName}-${value}`}
                data-cy={`${fieldName}-${value}`}
              >
                <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}>{label}</Text>
              </Radio>
            ))}
          </Stack>
        </RadioGroup>

        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default MultipleChoiceField;
