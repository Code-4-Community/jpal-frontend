import { Box, Container, Grid, Heading } from '@chakra-ui/react';
import * as React from 'react';
import ColorModeSwitcher from '../components/ColorModeSwitcher';
import ExampleForm from '../components/ExampleForm';

const ExampleFormPage: React.FC = () => (
  <Box>
    <Grid minH="100vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <Container maxW="xl">
        <Heading size="md" textAlign="left">
          Example Form
        </Heading>
        <ExampleForm />
      </Container>
    </Grid>
  </Box>
);

export default ExampleFormPage;
