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
          Thank you for filling out the survey! Next, we have some additional youth that are
          currently not eligible to receive letters, but we would appreciate if you could take the
          time to fill out their surveys as well. These students are in the control group of our
          study.
        </Text>
      </Box>

      <Button colorScheme="teal" variant="solid" onClick={continueWithControl}>
        Confirm
      </Button>
    </Box>
  </Container>
);

export default ControlExplanation;
