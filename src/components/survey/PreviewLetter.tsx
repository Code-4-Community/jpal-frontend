import { Box, Button, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { generateLetter } from './generateLetter';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PreviewLetterProps {
  // savedSurveyResponses
  goBack: () => void;
  confirmAndSaveResponses: () => void;
}

const PreviewLetter: React.FC<PreviewLetterProps> = ({ goBack, confirmAndSaveResponses }) => {
  const letter: string = generateLetter();
  return (
    <Container>
      <Box mt={12}>
        <Box mb={12}>
          <Text fontSize="lg" fontWeight="bold">
            Please review the letter below.
          </Text>
        </Box>

        <Box mb={12}>
          <Text color="gray.600">{letter}</Text>
        </Box>

        <HStack spacing={6}>
          <Button colorScheme="gray" variant="link">
            <Text color="gray.500" fontSize="md" as="cite" fontWeight={400} onClick={goBack}>
              Go Back
            </Text>
          </Button>
          <Button colorScheme="teal" variant="solid" onClick={confirmAndSaveResponses}>
            Confirm
          </Button>
        </HStack>
      </Box>
    </Container>
  );
};

export default PreviewLetter;
