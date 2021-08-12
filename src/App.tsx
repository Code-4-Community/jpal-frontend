import { ChakraProvider, theme } from '@chakra-ui/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { withAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import Landing from './Landing';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

const App: React.FC = () => {

  Auth.currentSession().then(res=>{
    const accessToken = res.getAccessToken()
    const jwt = accessToken.getJwtToken()
    // You can print them to see the full objects
    console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
    console.log(`myJwt: ${jwt}`)
  })

   return <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Landing />
      <AmplifySignOut />
    </ChakraProvider>
  </QueryClientProvider>;
};

export default withAuthenticator(App);
