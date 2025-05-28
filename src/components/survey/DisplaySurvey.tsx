import React from 'react';
import { Box, Divider, FormLabel, Radio, Stack, Text } from '@chakra-ui/react';
import pupa from 'pupa-browser';
import { ResponseInfo } from '../../api/dtos/survey-assignment.dto';

interface DisplaySurveyProps {
  responseInfo: ResponseInfo;
}

const DisplaySurvey: React.FC<DisplaySurveyProps> = ({ responseInfo }) => (
  <>
    {responseInfo.responses.map((response) => (
      <Box
        borderWidth="1px"
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="sm"
        padding="8"
        width="full"
        key={response.question.question}
      >
        <FormLabel>
          {pupa(response.question.question, { subject: responseInfo.youth.firstName })}
        </FormLabel>
        <Divider marginBottom={4} />
        <Stack
          direction="row"
          justify="space-evenly"
          wrap="wrap"
          sx={{
            '.chakra-radio__label': {
              marginLeft: 0,
              marginTop: 1,
            },
          }}
        >
          {response.question.options.map((option) => (
            <Radio
              key={option}
              value={option}
              display="flex"
              flexDirection="column"
              margin={0}
              disabled
              defaultChecked={option === response.option}
            >
              <Text margin={0} fontSize={{ base: 'xs', sm: 'xs', md: 'sm' }}>
                {option}
              </Text>
            </Radio>
          ))}
        </Stack>
      </Box>
    ))}
  </>
);

export default DisplaySurvey;
