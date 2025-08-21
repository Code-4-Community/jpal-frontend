import React from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import ContactInfoCollect from './ContactInfoCollect';

interface CollectContactPageProps {
  confirm: () => void;
  reviewerUUID: string;
}

const CollectContactPage: React.FC<CollectContactPageProps> = ({ confirm, reviewerUUID }) => (
  <Center mt={20}>
    <VStack justify="center" height="full">
      <Box padding="4" w="md">
        <Text fontWeight={600} mb={6}>
          Please provide additional contact information if you desire
        </Text>
        <ContactInfoCollect onSubmit={confirm} reviewerUUID={reviewerUUID} />
      </Box>
    </VStack>
  </Center>
);

export default CollectContactPage;
