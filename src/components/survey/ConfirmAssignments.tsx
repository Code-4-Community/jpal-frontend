import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  Divider,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { Youth } from '../../api/dtos/survey-assignment.dto';

export interface ConfirmAssignmentsProps {
  youth: Youth[];
  confirm: (selectedYouth: Youth[]) => void;
}

const ConfirmAssignments: React.FC<ConfirmAssignmentsProps> = ({ youth, confirm }) => {
  const youthIdentifiers = youth.map((_, index) => `${index}`);
  const [selected, setSelected] = React.useState<Youth[]>(youth);
  const [didNotPassThreshold, setDidNotPassThreshold] = React.useState<Youth[]>([]);
  const handleCheckboxChange = (selectedIndices: string[]) => {
    setSelected(selectedIndices.map((index) => youth[parseInt(index, 10)]));
  };
  const handleRadioChange = (nextValue: string, youthIndex: number) => {
    if (parseInt(nextValue, 10) < 3) {
      setDidNotPassThreshold(didNotPassThreshold.concat([youth[youthIndex]]));
    }
  };
  const options = ['0', '1', '2', '3', '4', '5'];

  return (
    <Container marginTop={16}>
      <Text fontWeight={600} fontSize="lg">
        Please confirm and score the workers you have supervised.
      </Text>
      <Text>
        Please provide an overall score for the workers you have supervised, and uncheck any workers
        you have not supervised
      </Text>
      <Box mx={6} my={8}>
        <CheckboxGroup
          colorScheme="teal"
          defaultValue={youthIdentifiers}
          onChange={handleCheckboxChange}
        >
          <Stack>
            {youth.map((y, index) => (
              <Box
                borderWidth="1px"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="sm"
                padding="8"
                width="full"
              >
                <Checkbox
                  value={`${index}`}
                  data-testid={`${index}`}
                  key={`${y.assignmentUuid}`}
                  mb="5"
                >
                  <Text fontWeight="bold">
                    {y.firstName} {y.lastName}
                  </Text>
                </Checkbox>
                <Text>Please provide an overall score for this worker.</Text>
                <RadioGroup
                  id="overallScore"
                  onChange={(nextValue) => handleRadioChange(nextValue, index)}
                  aria-required
                  isDisabled={!selected.includes(y)}
                  mt="2"
                >
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
                    {options.map((value) => (
                      <Radio
                        key={value}
                        value={value}
                        data-testid={`overallScore-${value}`}
                        data-cy={`overallScore-${value}`}
                        display="flex"
                        flexDirection="column"
                        margin={0}
                      >
                        <Text margin="0" fontSize={{ base: 'xs', sm: 'xs', md: 'sm' }}>
                          {value}
                        </Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
      <Center>
        <Button
          onClick={() => confirm(selected.filter((y) => !didNotPassThreshold.includes(y)))}
          colorScheme="teal"
        >
          Confirm
        </Button>
      </Center>
    </Container>
  );
};

export default ConfirmAssignments;
