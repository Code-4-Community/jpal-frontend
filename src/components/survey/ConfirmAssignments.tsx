import {
  Box,
  Button,
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
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
  const handleChange = (selectedIndices: string[]) => {
    setSelected(selectedIndices.map((index) => youth[parseInt(index, 10)]));
  };

  return (
    <Container>
      <Text fontWeight={600} fontSize="lg">
        Please confirm the youth you have supervised.
      </Text>
      <Text>Uncheck any youth you have not supervised.</Text>
      <Box mx={6} my={8}>
        <CheckboxGroup colorScheme="teal" defaultValue={youthIdentifiers} onChange={handleChange}>
          <Stack>
            {youth.map(({ firstName, lastName, assignmentUuid }, index) => (
              <Checkbox value={`${index}`} data-testid={`${index}`} key={`${assignmentUuid}`}>
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
    </Container>
  );
};

export default ConfirmAssignments;
