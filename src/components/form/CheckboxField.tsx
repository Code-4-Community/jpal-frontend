import React from 'react';
import { Field, FieldProps } from 'formik';
import { Checkbox, FormControl, FormErrorMessage, FormLabel, Text, Stack } from '@chakra-ui/react';

interface CheckboxOption {
  label: string;
  value: string;
}

interface CheckboxFieldProps {
  fieldName: string;
  displayName: string;
  isRequired: boolean;
  options: CheckboxOption[];
  defaultValue?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  fieldName,
  displayName,
  isRequired,
  options,
  defaultValue,
}) => (
  <Field
    name={fieldName}
    validate={isRequired && ((value: any) => (value ? undefined : 'Required'))}
  >
    {({ field, form }: FieldProps<string>) => (
      <FormControl
        isInvalid={Boolean(
          form.errors[fieldName] && (form.touched[fieldName] || form.submitCount > 0),
        )}
      >
        <FormLabel htmlFor={fieldName} aria-label={displayName || fieldName}>
          {displayName || fieldName}
        </FormLabel>

        <Stack direction="column" spacing={2}>
          {options.map(({ label, value }) => (
            <Checkbox
              key={value}
              isChecked={field.value === value}
              onChange={() => {
                form.setFieldValue(fieldName, field.value === value ? '' : value);
              }}
              data-testid={`${fieldName}-${value}`}
            >
              <Text fontSize={{ base: 'xs', sm: 'xs', md: 'sm' }}>{label}</Text>
            </Checkbox>
          ))}
        </Stack>

        <FormErrorMessage>{form.errors[fieldName]}</FormErrorMessage>
      </FormControl>
    )}
  </Field>
);

export default CheckboxField;
