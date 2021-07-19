import { ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Landing from './Landing';

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Landing />
    </ChakraProvider>
  </QueryClientProvider>
);

export default App;
