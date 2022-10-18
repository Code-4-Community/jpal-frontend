/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Form, { FormValues } from './Form';
import InputField from './InputField';
import NumberInputField from './NumberInputField';

interface ContactFormValues {
  email: string;
  phoneNumber: string;
}

interface ContactFormProps {
  onSubmit?: (values: Partial<ContactFormValues>) => Promise<void>;
}

const alertOnSubmit = async (values: FormValues) => {
  // import and call method on api
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values, null, 2));
};

const validateFavoriteColor = (value: string) => {
  let error: string | undefined;
  if (value.toLowerCase() === 'brown') {
    error = 'Thats a bad opinion. Choose something else.';
  }
  return error;
};

const ContactInfoCollect: React.FC<ContactFormProps> = ({ onSubmit }) => (
    // eslint-disable-next-line no-alert
    <Form onSubmit={onSubmit ?? alertOnSubmit} initialValues={{ favoriteColor: 'Purple' }}>
      <InputField
          isRequired
          displayName="Favorite Color"
          fieldName="favoriteColor"
          validate={validateFavoriteColor}
      />
      <NumberInputField
          displayName="Favorite Number"
          fieldName="favoriteNumber"
          validate={(value) => (Number(value) < 0 ? 'Must be positive' : undefined)}
      />
    </Form>
);

export default ContactInfoCollect;
