import { Button } from '@chakra-ui/react';
import * as React from 'react';

const AdminLandingPage: React.FC = () => (
  <>
    <Button leftIcon={<AddIcon />} colorScheme="teal">
      Create Survey
    </Button>
  </>
);

export default AdminLandingPage;
