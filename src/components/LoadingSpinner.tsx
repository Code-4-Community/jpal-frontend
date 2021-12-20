import { Center, Spinner } from '@chakra-ui/react';
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <Center>
    <Spinner color="teal.500" size="xl" thickness="4px" />
  </Center>
);

export default LoadingSpinner;
