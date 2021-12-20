import React from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';

const ThankYou: React.FC = () => (
  <VStack justify="center" height="full">
    <Box padding="4" maxW="3xl" lineHeight="200%">
      <b>Thank you for completing our survey(s)!</b>
      <br />
      We appreciate your time.
      <br />
      <br />
      <Button colorScheme="teal" size="md">
        Exit
      </Button>
    </Box>
  </VStack>
);

export default ThankYou;
