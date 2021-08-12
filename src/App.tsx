import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Amplify from 'aws-amplify';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import awsconfig from './aws-exports';
import Landing from './Landing';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

const App: React.FC = () => (
  // Auth.currentSession().then((res) => {
  //   const accessToken = res.getIdToken();
  //   const jwt = accessToken.getJwtToken();
  // });

  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Landing />
      <AmplifySignOut />
    </ChakraProvider>
  </QueryClientProvider>
);
export default withAuthenticator(App);
