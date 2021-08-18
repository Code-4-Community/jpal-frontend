import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import Amplify from 'aws-amplify';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import awsconfig from './aws-exports';
import ExampleForm from './components/ExampleForm';
import Landing from './pages/Landing';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

const App: React.FC = () => {
  const [authState, setAuthState] = React.useState<AuthState>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = React.useState<any>();

  React.useEffect(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onAuthUIStateChange((nextAuthState, authData: any) => {
        setAuthState(nextAuthState);
        setUser(authData);
        if (authData?.attributes?.email) {
          Sentry.setUser({ email: authData.attributes.email });
        } else {
          Sentry.setUser(null);
        }
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
