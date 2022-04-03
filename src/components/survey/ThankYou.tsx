import React from 'react';
import { Box, VStack } from '@chakra-ui/react';

const ThankYou: React.FC = () => (
  <VStack justify="center" height="full">
    <Box padding="16" maxW="3xl" lineHeight="200%">
      <b>Thank you for completing our survey(s)!</b>
      <br />
      We appreciate your time. You may now close this tab.
    </Box>
  </VStack>
);

export default ThankYou;
