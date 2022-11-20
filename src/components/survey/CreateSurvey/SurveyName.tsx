import { Box, Button, Input, InputLeftElement } from '@chakra-ui/react';
import React from 'react';

interface SurveyNameProps {
  onSubmit: (surveyName: string) => void;
}
const SurveyName: React.FC<SurveyNameProps> = (props) => {
  const { onSubmit } = props;
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
        <Input
          variant="flushed"
          placeholder="Survey Name"
          textColor="white"
          fontWeight={400}
          fontSize={36}
        />
        <Button backgroundColor="white" textColor="grey" margin="3" variant="solid">
          Button
        </Button>
      </Box>
    </Box>
  );
};

export default SurveyName;
