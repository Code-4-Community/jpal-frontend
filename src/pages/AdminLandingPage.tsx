import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Container,
} from '@chakra-ui/react';
import * as React from 'react';
import SurveyTable from '../components/adminLandingPage/SurveyTable';

// TODO : get this from an API call :)
const data = [
  { surveyName: 'Survey #1', date: new Date() },
  { surveyName: 'Survey #2', date: new Date() },
  { surveyName: 'Survey #3', date: new Date() },
];

const AdminLandingPage: React.FC = () => (
  <Container maxW="7xl" mt={12}>
    <Flex>
      <Box>
        <Button leftIcon={<AddIcon />} colorScheme="teal">
          Create Survey
        </Button>
      </Box>
      <Spacer />
      <Box>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input width="200px" placeholder="Search..." />
        </InputGroup>
      </Box>
    </Flex>
    <SurveyTable data={data} />
  </Container>
);

export default AdminLandingPage;
