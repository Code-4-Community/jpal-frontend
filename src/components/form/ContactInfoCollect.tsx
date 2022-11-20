/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Form, { FormValues } from './Form';
import InputField from './InputField';

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

const validateEmail = (value: string) => {
  let error: string | undefined;
  const emailRegex = "^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$";
  if(value.match(emailRegex) == null) {
    error = "Invalid email address";
  }
  return error;
};

const validatePhoneNumber = (value: string) => {
  let error: string | undefined;
  const phoneNumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  if(value.match(phoneNumberRegex) == null) {
    error = "Invalid phone number";
  }
  return error;
};

const ContactInfoCollect: React.FC<ContactFormProps> = ({ onSubmit }) => (
    // eslint-disable-next-line no-alert
    <Form onSubmit={onSubmit ?? alertOnSubmit}>
      <InputField
          isRequired
          displayName="Email"
          fieldName="email"
          validate={validateEmail}
      />
      <InputField
          isRequired
          displayName="Phone Number"
          fieldName="phoneNumber"
          validate={validatePhoneNumber}
      />
    </Form>
);

export default ContactInfoCollect;
