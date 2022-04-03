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
          <Text mb={6}> Thanks you for taking the time to _____.</Text>
          <Text>
            This LoR system will Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{' '}
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
