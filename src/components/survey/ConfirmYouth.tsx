import { Box, Button, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { Youth } from '../../api/dtos/assignment.dto';

interface ConfirmYouthProps {
  youth: Youth;
  rejectYouth: () => void;
  confirmYouth: () => void;
}

const ConfirmYouth: React.FC<ConfirmYouthProps> = ({ youth, rejectYouth, confirmYouth }) => (
  <Container>
    <Box mt={24}>
      <Box mb={12}>
        <Text fontSize="2xl" fontWeight="bold">
          Next student:
        </Text>
        <Text fontSize="2xl">
          {youth.firstName} {youth.lastName}
        </Text>
      </Box>

      <HStack spacing={4}>
        <Button colorScheme="gray" variant="link" onClick={rejectYouth}>
          <Text color="gray.500" fontSize="md" as="cite" fontWeight={400}>
            I did not work with this youth.
          </Text>
        </Button>
        <Button colorScheme="teal" variant="solid" onClick={confirmYouth}>
          Complete their survey
        </Button>
      </HStack>
    </Box>
  </Container>
);

export default ConfirmYouth;
