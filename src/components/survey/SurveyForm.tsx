import { Box, Divider, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import Form from '../form/Form';
import MultipleChoiceField from '../form/MultipleChoiceField';

export interface SurveyFormProps {
  setSurveyResponses: (responses: any) => void;
  questions: Question[];
  youthName: string;
}

export type Question = {
  fieldName: string;
  question: string;
};

const FIVE_SENTIMENT_OPTIONS = [
  { value: 'Never', label: 'Never' },
  { value: 'Rarely', label: 'Rarely' },
  { value: 'Somewhat', label: 'Somewhat' },
  { value: 'Often', label: 'Often' },
  { value: 'Always', label: 'Always' },
];

const SurveyForm: React.FC<SurveyFormProps> = ({ setSurveyResponses, questions, youthName }) => (
  <Form
    onSubmit={async (values) => {
      console.log(values);
      setSurveyResponses(values);
    }}
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
            displayName={question.question}
            fieldName={question.fieldName}
            options={FIVE_SENTIMENT_OPTIONS}
          />
        </Box>
      ))}
    </VStack>
  </Form>
);

export default SurveyForm;
