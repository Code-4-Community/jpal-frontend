import React from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import ContactInfoCollect from './ContactInfoCollect';

interface CollectContactPageProps {
  confirm: () => void;
}

const CollectContactPage: React.FC<CollectContactPageProps> = ({ confirm }) => (
  <Center mt={20}>
    <VStack justify="center" height="full">
      <Box padding="4" W="md">
        <Text fontWeight={600} mb={6}>
          Please provide additional contact information if you desire
        </Text>
        <ContactInfoCollect onSubmit={confirm} />
      </Box>
    </VStack>
  </Center>
);

export default CollectContactPage;
