import * as React from 'react';
import { Center, Flex, Image, Text } from '@chakra-ui/react';
import logo from '../c4cLogo.svg';

const Footer: React.FC = () => (
  <Center>
    <Flex flexDirection="column" fontSize="sm" alignItems="center" textAlign="center" mb="40px">
      <Image boxSize="100px" p="15px" src={logo} />
      <Text fontWeight="bold">Made with love by Code4Community</Text>
      <Text>Northeastern University, Boston MA</Text>
    </Flex>
  </Center>
);
export default Footer;
