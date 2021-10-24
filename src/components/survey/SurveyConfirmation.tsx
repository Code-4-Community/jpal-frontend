/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Box, Button, VStack} from "@chakra-ui/react"

const SurveyConfirmation: React.FC = () => (
  // eslint-disable-next-line no-alert
        <VStack justify="center" height="full">
        <Box padding="4" maxW="3xl">
          <b>Thank you for completing our survey(s)!</b>
          <br/>
          <br/>
          We appreciate your time.
          <br/>
          <br/>
          <br/>
          <Button colorScheme="teal" size="md">
            Exit
          </Button>
        </Box>
        </VStack>
);

export default SurveyConfirmation;
