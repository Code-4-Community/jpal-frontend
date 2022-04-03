import { Box, Button, Container, Text } from '@chakra-ui/react';
import React from 'react';

interface ControlExplanationProps {
  continueWithControl: () => void;
}

/**
 * This component contains text that explains that the user will have to repeat the entire survey flow again but for the control group.
 */
const ControlExplanation: React.FC<ControlExplanationProps> = ({ continueWithControl }) => (
  <Container>
    <Box mt={16}>
      <Box mb={12}>
        <Text fontSize="lg" fontWeight="bold">
          Please continue to review additional youth
        </Text>
      </Box>

      <Box mb={12}>
        <Text color="gray.600">
          Thanks for filling out the survey! We want to also do the same but for control youth.
        </Text>
      </Box>

      <Button colorScheme="teal" variant="solid" onClick={continueWithControl}>
        Confirm
      </Button>
    </Box>
  </Container>
);

export default ControlExplanation;
