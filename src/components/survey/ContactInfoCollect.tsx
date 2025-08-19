/* eslint-disable react/jsx-props-no-spreading */
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import apiClient from '../../api/apiClient';

export interface ContactFormValues {
  email: string;
  phoneNumber: string;
}

interface ContactFormProps {
  onSubmit: () => void;
  reviewerUUID: string;
}

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

const ContactInfoCollect: React.FC<ContactFormProps> = ({ onSubmit, reviewerUUID }) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const toast = useToast();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPhoneNumber(event.target.value);

  const submitAndSaveValues: () => Promise<void> = async () => {
    const emailError = validateEmail(email);
    const phoneError = validatePhoneNumber(phoneNumber);
    if (email && phoneNumber && emailError && phoneError) {
      toast({
        title: 'Invalid email address and phone number',
      });
      return;
    }
    if (phoneNumber && phoneError) {
      toast({
        title: 'Invalid phone number',
      });
      return;
    }
    if (email && emailError) {
      toast({
        title: 'Invalid email address',
      });
      return;
    }
    // TODO: Send email and phone number to the backend

    apiClient.updateReviewerContact(reviewerUUID, email, phoneNumber)

    onSubmit();
  };

  // eslint-disable-next-line no-alert
  return (
    <Center>
      <VStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="email"
            placeholder="Preferred email"
            value={email}
            onChange={handleEmailChange}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="tel"
            placeholder="Phone number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </InputGroup>
        <Button onClick={submitAndSaveValues} mt={4} colorScheme="teal" type="submit">
          Next
        </Button>
      </VStack>
    </Center>
  );
};

export default ContactInfoCollect;
