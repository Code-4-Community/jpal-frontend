import * as React from 'react';
import {Button, Text, Box} from '@chakra-ui/react';
import Logo from './Logo';

interface NotFoundProps {
  goBack: () => void;
}

const NotFound: React.FC<NotFoundProps> = ({ goBack }) => (
    <Box align='center' mt={20}>
    <Logo w="200" h="200" mb={6} />
    <Text fontSize="3xl" color="#D46136" fontWeight={600}>
      404 Page not found
    </Text>
    <Text> Sorry, looks like we ran into an issue.</Text>
    <Button mt={20} colorScheme="teal" onClick={goBack}>
      Go Back
    </Button>
    </Box>
);

export default NotFound;
