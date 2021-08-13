import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import Amplify from 'aws-amplify';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import awsconfig from './aws-exports';
import ExampleForm from './components/ExampleForm';
import Landing from './pages/Landing';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

const App: React.FC = () => {
  // Auth.currentSession().then((res) => {
  //   const accessToken = res.getIdToken();
  //   const jwt = accessToken.getJwtToken();
  // });

  const [authState, setAuthState] = React.useState<AuthState>();
  // eslint-disable-next-line @typescript-eslint/ban-types
  const [user, setUser] = React.useState<object | undefined>();

  React.useEffect(
    () =>
      onAuthUIStateChange((nextAuthState, authData) => {
        setAuthState(nextAuthState);
        setUser(authData);
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        {authState === AuthState.SignedIn && user ? (
          <div className="App">
            <Landing />
            <AmplifySignOut />
            <ExampleForm />
          </div>
        ) : (
          <AmplifyAuthenticator usernameAlias="email">
            <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
          </AmplifyAuthenticator>
        )}
      </ChakraProvider>
    </QueryClientProvider>
  );
};
export default App;
