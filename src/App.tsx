import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Amplify, { Auth } from 'aws-amplify';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import awsconfig from './aws-exports';
import Landing from './Landing';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

const App: React.FC = () => {
  console.log('making request...');
  Auth.currentSession().then((res) => {
    console.log(res);
    const accessToken = res.getIdToken();
    const jwt = accessToken.getJwtToken();
    // You can print them to see the full objects
    console.log(`myIdToken: ${JSON.stringify(accessToken)}`);
    console.log(`myJwt: ${jwt}`);
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Landing />
        <AmplifySignOut />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default withAuthenticator(App);
