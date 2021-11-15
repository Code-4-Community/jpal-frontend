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
    <SurveyTable />
  </Container>
);

export default AdminLandingPage;
