import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Divider, IconButton, Stack, Text, VStack } from '@chakra-ui/react';
import pupa from 'pupa';
import React from 'react';
import { Question, Response } from '../../api/dtos/survey-assignment.dto';
import Form, { FormValues } from '../form/Form';
import MultipleChoiceField from '../form/MultipleChoiceField';

export interface SurveyFormProps {
  youthName: string;
  questions: Question[];
  continueAndSaveResponses: (responses: Response[]) => void;
  goBack: () => void;
  savedResponses?: Response[];
}

function invalidResponses(
  questions: Question[],
  responses: { question: string; selectedOption: string }[],
) {
  return questions.some(
    (q) =>
      responses.find((r) => r.question === q.question && q.options.includes(r.selectedOption)) ===
      undefined,
  );
}

function formValuesToResponses(questions: Question[], values: FormValues): Response[] {
  const responses = Object.entries(values).map(([question, selectedOption]) => {
    if (selectedOption === undefined) {
      throw new Error(`No option selected for question ${question}`);
    }
    return {
      question,
      selectedOption,
    };
  });

  if (invalidResponses(questions, responses)) {
    throw new Error(
      'Not all questions have been answered or a selected option is not one of the options given',
    );
  }

  return responses;
}

function responsesToFormValues(responses: Response[]): FormValues {
  return Object.fromEntries(responses.map((r) => [r.question, r.selectedOption]));
}

const SurveyForm: React.FC<SurveyFormProps> = ({
  youthName,
  questions,
  continueAndSaveResponses,
  goBack,
  savedResponses,
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
        onSubmit={async (values: FormValues) => {
          continueAndSaveResponses(formValuesToResponses(questions, values));
        }}
        submitText="Continue"
        initialValues={savedResponses && responsesToFormValues(savedResponses)}
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
              key={question.question}
            >
              <MultipleChoiceField
                displayName={pupa(question.question, { subject: youthName.split(' ')[0] })}
                fieldName={question.question}
                options={question.options.map((option) => ({ label: option, value: option }))}
                isRequired
                defaultValue={
                  savedResponses &&
                  savedResponses.find((r) => r.question === question.question)?.selectedOption
                }
              />
            </Box>
          ))}
        </VStack>
      </Form>
    </Box>
  </Stack>
);

export default SurveyForm;
