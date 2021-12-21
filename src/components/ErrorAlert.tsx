import { Alert, AlertIcon } from '@chakra-ui/react';
import React from 'react';

const ErrorAlert: React.FC = () => (
  <Alert status="error">
    <AlertIcon />
    There was an error processing your request. Please try again later.
  </Alert>
);
export default ErrorAlert;
