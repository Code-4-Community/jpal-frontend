import { Box, Button, HStack, Input, InputLeftElement, Text } from '@chakra-ui/react';
import React from 'react';
import { Question } from '../../../api/dtos/survey-assignment.dto';

interface SurveyNameProps {
  onSubmit: (surveyName: string) => void;
  question: Question;
}
const CreateSurveyQuestion: React.FC<SurveyNameProps> = (props) => {
  const { onSubmit, question } = props;
  return (
    <Box padding={20}>
      <Box
        backgroundColor="#417671"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="sm"
        padding={8}
        width="full"
      >
        <Text fontSize="4xl">{question.question}</Text>

        <HStack spacing="24px">
          {question.options.map((option) => (
            <>{option}</>
          ))}
        </HStack>
      </Box>
    </Box>
  );
};

export default CreateSurveyQuestion;
