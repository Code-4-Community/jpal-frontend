import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Divider, IconButton, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Form, { FormValues } from '../form/Form';
import MultipleChoiceField from '../form/MultipleChoiceField';

export interface SurveyFormProps {
  youthName: string;
  questions: Question[];
  continueAndSaveResponses: (values: FormValues) => void;
  goBack: () => void;
}

export type Question = {
  fieldName: string;
  text: string;
};

const FIVE_SENTIMENT_OPTIONS = [
  { value: 'Never', label: 'Never' },
  { value: 'Rarely', label: 'Rarely' },
  { value: 'Somewhat', label: 'Somewhat' },
  { value: 'Often', label: 'Often' },
  { value: 'Always', label: 'Always' },
];

const SurveyForm: React.FC<SurveyFormProps> = ({
  youthName,
  questions,
  continueAndSaveResponses,
  goBack,
}) => (
  <Stack direction={{ base: 'column', md: 'row' }} justify="left">
    <IconButton
      marginTop="10"
      color="gray.600"
      backgroundColor="white"
      borderRadius="50%"
      aria-label="Go back"
      w="max-content"
      icon={<ArrowBackIcon w="8" h="8" />}
      onClick={goBack}
      data-testid="go-back-button"
      data-cy="go-back-button"
    />

    <Box w="full">
      <Form
        onSubmit={async (values: FormValues) => continueAndSaveResponses(values)}
        submitText="Continue"
      >
        <VStack spacing="6">
          <Box
            backgroundColor="#417671"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="sm"
            padding="8"
            width="full"
          >
            <Text fontSize="3xl" color="white">
              Survey: {youthName}
            </Text>
            <Divider marginBottom="2" />
            <Text color="white">Please fill out all questions.</Text>
          </Box>

          {questions.map((question) => (
            <Box
              borderWidth="1px"
              borderRadius="2xl"
              overflow="hidden"
              boxShadow="sm"
              padding="8"
              width="full"
              key={question.fieldName}
            >
              <MultipleChoiceField
                displayName={question.text}
                fieldName={question.fieldName}
                options={FIVE_SENTIMENT_OPTIONS}
                isRequired
              />
            </Box>
          ))}
        </VStack>
      </Form>
    </Box>
  </Stack>
);

export default SurveyForm;
