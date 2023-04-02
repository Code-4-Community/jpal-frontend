import React from 'react';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import ContactInfoCollect from './ContactInfoCollect';
import { Reviewer } from '../../api/dtos/survey-assignment.dto';

interface CollectContactPageProps {
  confirm: () => void;
  reviewer: Reviewer
  updateContact: (reviewerUpdate : Reviewer) => Promise<Reviewer>
}

const CollectContactPage: React.FC<CollectContactPageProps> = ({ updateContact, reviewer }) => (
  <Center mt={20}>
    <VStack justify="center" height="full">
      <Box padding="4" W="md">
        <Text fontWeight={600} mb={6}>
          Please provide additional contact information if you desire
        </Text>
        <ContactInfoCollect 
        updateContact={updateContact} 
        reviewer={reviewer}
        />
      </Box>
    </VStack>
  </Center>
);

export default CollectContactPage;
