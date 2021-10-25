import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Container, IconButton, Stack } from '@chakra-ui/react';
import React from 'react';
import SurveyForm from '../../components/survey/SurveyForm';
import defaultQuestions from './defaultQuestions';

const SurveyPage: React.FC = () => {
  const [surveyResponses, setSurveyResponses] = React.useState<any>();
  return (
    <Container maxW="3xl" marginY="4">
      <Stack direction={{ base: 'column', md: 'row' }} justify="left">
        <IconButton
          marginTop="10"
          color="gray.600"
          backgroundColor="white"
          borderRadius="50%"
          aria-label="Go back"
          w="max-content"
          icon={<ArrowBackIcon w="8" h="8" />}
        />

        <Box w="full">
          <SurveyForm
            setSurveyResponses={setSurveyResponses}
            youthName="Nash Ville"
            questions={defaultQuestions}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default SurveyPage;
