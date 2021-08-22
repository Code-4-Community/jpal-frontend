import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Router, Switch } from 'react-router-dom';
import awsconfig from './aws-exports';
import ExampleFormPage from './pages/ExampleFormPage';
import LandingPage from './pages/LandingPage';
import PostsPage from './pages/PostsPage';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

interface AppProps {
  history: History<unknown>;
}

const App: React.FC<AppProps> = ({ history }) => {
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
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={() => <LandingPage />} />
              <Route path="/example-form" exact component={() => <ExampleFormPage />} />
              <Route path="/posts" exact component={() => <PostsPage />} />

              <Route
                path="*"
                component={() => <div> Page not found (TODO: write a 404 page) </div>}
              />
            </Switch>
            <AmplifySignOut />
          </Router>
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
