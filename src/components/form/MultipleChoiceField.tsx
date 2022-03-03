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
  /**
   * If default value is provided, it must be set as an initial value in the parent Formik form.
   */
  defaultValue?: string;
}
type Choice = { label: string; value: string };

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({
  fieldName,
  idPrefix,
  displayName,
  isRequired,
  options,
  defaultValue,
}) => (
  <Field
    name={fieldName}
    validate={isRequired && ((value: string) => (value ? undefined : 'Required'))}
  >
    {({ field, form }: FieldProps) => (
      <FormControl
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
          onChange={(val) => {
            form.setFieldValue(fieldName, val);
          }}
          aria-required
          defaultValue={defaultValue}
        >
          <Stack
            direction="row"
            justify="space-evenly"
            wrap="wrap"
            sx={{
              '.chakra-radio__label': {
                marginLeft: 0,
                marginTop: 1,
              },
            }}
          >
            {options.map(({ label, value }) => (
              <Radio
                key={value}
                value={value}
                data-testid={`${fieldName}-${value}`}
                data-cy={`${fieldName}-${value}`}
                display="flex"
                flexDirection="column"
                margin={0}
              >
                <Text margin="0" fontSize={{ base: 'xs', sm: 'xs', md: 'sm' }}>
                  {label}
                </Text>
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
