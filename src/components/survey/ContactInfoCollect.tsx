/* eslint-disable react/jsx-props-no-spreading */
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import { Button, Center, Input, InputGroup, InputLeftElement, VStack } from '@chakra-ui/react';
import React from 'react';

export interface ContactFormValues {
  email: string;
  phoneNumber: string;
}

interface ContactFormProps {
  onSubmit: () => void;
}

// const alertOnSubmit = async (values: FormValues) => {
//   // import and call method on api
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   // eslint-disable-next-line no-alert
//   alert(JSON.stringify(values, null, 2));
// };

const validateEmail = (value: string) => {
  let error: string | undefined;
  const emailRegex = '^[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:.[a-zA-Z0-9]+)*$';
  if (value.match(emailRegex) == null) {
    error = 'Invalid email address';
  }
  return error;
};

const validatePhoneNumber = (value: string) => {
  let error: string | undefined;
  const phoneNumberRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  if (value.match(phoneNumberRegex) == null) {
    error = 'Invalid phone number';
  }
  return error;
};

const ContactInfoCollect: React.FC<ContactFormProps> = ({ onSubmit }) => (
  // eslint-disable-next-line no-alert
  <Center>
    <VStack>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input type="email" placeholder="Preferred email" />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <PhoneIcon color="gray.300" />
        </InputLeftElement>
        <Input type="tel" placeholder="Phone number" />
      </InputGroup>
      <Button onClick={onSubmit} mt={4} colorScheme="teal" type="submit">
        Next
      </Button>
    </VStack>
  </Center>
);

export default ContactInfoCollect;
