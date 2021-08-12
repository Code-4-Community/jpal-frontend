import { ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { withAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Landing from './Landing';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <AmplifySignIn />
      <Landing />
    </ChakraProvider>
  </QueryClientProvider>
);

export default withAuthenticator(App);
