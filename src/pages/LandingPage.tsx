import { Box, Code, Grid, Link, Text, VStack } from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import apiClient from '../api/apiClient';
import ColorModeSwitcher from '../components/ColorModeSwitcher';
import Logo from '../components/header/Logo';

const LandingPage: React.FC = () => {
  const { isLoading, error, data } = useQuery<string, Error>('helloWorld', () =>
    apiClient.getHello(),
  );

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text>
          <Text>
            {(() => {
              if (isLoading) return 'Loading...';
              if (error) return `Error: ${error.message}`;
              return `Response from backend: ${data}`;
            })()}
          </Text>
          <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link>
          <Link color="teal.500" fontSize="xl" as={RouterLink} to="/example-form">
            Go to Example Form page
          </Link>
        </VStack>
      </Grid>
    </Box>
  );
};

export default LandingPage;
