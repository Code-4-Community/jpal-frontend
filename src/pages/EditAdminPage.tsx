import { Grid, Box, Container, Heading, GridItem } from '@chakra-ui/react';
import * as React from 'react';
import {AddAdminForm} from '../components/AddAdminForm';

const EditAdminPage: React.FC = () => (
<Box>
<Grid minH="100vh" p={3}>
  <Container maxW="xl">
      <GridItem>
        <Heading size="lg" textAlign="start">
            Admin Profile
        </Heading>
    </GridItem>
    <AddAdminForm email="something@something.com" /> 
  </Container>
</Grid>
</Box>
);

    
    
export default EditAdminPage;
