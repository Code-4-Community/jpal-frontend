import { Grid, Box, Container, Heading } from '@chakra-ui/react';
import * as React from 'react';
import {AddAdminForm} from '../components/AddAdminForm';


const AddAdminPage: React.FC = () => (
<Box>
<Grid minH="100vh" p={3}>
  <Container maxW="xl">
    <Heading size="lg" textAlign="start">
      Add New Admin
    </Heading>
    <AddAdminForm/>
  </Container>
</Grid>
</Box>
);

    
    
export default AddAdminPage;
