import { Box, Button, Center, Checkbox, CheckboxGroup, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Youth } from '../../api/dtos/assignment.dto';

export interface SurveyConfirmAssignmentsProps {
  youth: Youth[];
  confirm: (selectedYouth: Youth[]) => void;
}

const SurveyConfirmAssignments: React.FC<SurveyConfirmAssignmentsProps> = ({ youth, confirm }) => {
  const youthIdentifiers = youth.map((_, index) => `${index}`);
  const [selected, setSelected] = React.useState<Youth[]>(youth);
  const handleChange = (selectedIndices: string[]) => {
    setSelected(selectedIndices.map((index) => youth[parseInt(index, 10)]));
  };

  return (
    <>
      <Text fontWeight={600} fontSize="lg">
        Please confirm the youth you have supervised.
      </Text>
      <Text>Uncheck any youth you have not supervised.</Text>
      <Box mx={6} my={8}>
        <CheckboxGroup colorScheme="teal" defaultValue={youthIdentifiers} onChange={handleChange}>
          <Stack>
            {youth.map(({ firstName, lastName }, index) => (
              <Checkbox value={`${index}`} data-testid={`${index}`}>
                {firstName} {lastName}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
      <Center>
        <Button onClick={() => confirm(selected)} colorScheme="teal">
          Confirm
        </Button>
      </Center>
    </>
  );
};

export default SurveyConfirmAssignments;
