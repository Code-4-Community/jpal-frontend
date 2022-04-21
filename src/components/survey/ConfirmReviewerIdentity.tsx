import React from 'react';
import { Box, Button, Center, HStack, Text, VStack } from '@chakra-ui/react';

interface ConfirmReviewerIdentityProps {
  name: string;
  email: string;
  confirm: () => void;
  thisIsntMe: () => void;
}

const ConfirmReviewerIdentity: React.FC<ConfirmReviewerIdentityProps> = ({
  name,
  email,
  confirm,
  thisIsntMe,
}) => (
  <Center mt={20}>
    <HStack spacing={12}>
      <VStack justify="center" height="full">
        <Box padding="16" maxW="md">
          <Text fontSize="lg" mb={6}>
            Welcome to JPAL&apos;s Letter of Recommendation System!
          </Text>
          <Text mb={6}>
            Thanks you for taking the time to create letters of recommendation for workers that you
            have supervised.
          </Text>
          <Text>
            This LoR system will ask you questions about people you have supervised. For each
            worker, your responses will be used to generate a letter of recommendation. You will
            have the opportunity to view this letter, make changes to you answer, and send the
            letter to the worker. We really appreciate your time!
          </Text>
        </Box>
      </VStack>
      <VStack justify="center" height="full">
        <Box padding="4" W="md">
          <Text fontWeight={600} mb={6}>
            Please confirm your name and email
          </Text>
          <Text mb={6}> {name} </Text>
          <Text mb={8}> {email} </Text>
          <HStack spacing={4}>
            <Button colorScheme="gray" variant="link" onClick={thisIsntMe}>
              <Text fontSize="m" as="cite">
                This isn&apos;t me.
              </Text>
            </Button>
            <Button colorScheme="teal" variant="solid" onClick={confirm}>
              Confirm
            </Button>
          </HStack>
        </Box>
      </VStack>
    </HStack>
  </Center>
);

export default ConfirmReviewerIdentity;
