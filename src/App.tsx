import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, ChakraProvider, Spinner, theme } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Router, Switch } from 'react-router-dom';
import apiClient from './api/apiClient';
import awsconfig from './aws-exports';
import ExampleFormPage from './pages/ExampleFormPage';
import LandingPage from './pages/LandingPage';
import SurveyConfirmation from './components/survey/SurveyConfirmation';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

interface AppProps {
  history: History<unknown>;
}

const AdminOnlyApp: React.FC = () => {
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

  const { isLoading, error, data } = useQuery('auth', () => apiClient.getMe(), {
    // The query will not execute until the user is signed in
    enabled: authState === AuthState.SignedIn && !!user,
  });

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      {authState === AuthState.SignedIn && user ? (
        <>
          {error && (
            <Alert status="error">
              An error occurred while fetching your user information. Please sign out and try again.
            </Alert>
          )}
          {isLoading && <Spinner />}
          {data && (
            <Switch>
              <Route path="/admin" exact component={() => <LandingPage />} />
              <Route path="/admin/example-form" exact component={() => <ExampleFormPage />} />
            </Switch>
          )}
          <AmplifySignOut />
        </>
      ) : (
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
        </AmplifyAuthenticator>
      )}
    </>
  );
};

const App: React.FC<AppProps> = ({ history }) => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <div style={{ height: '100vh' }}>
        <Router history={history}>
          <Switch>
            <Route path="/admin" component={AdminOnlyApp} />
            <Route path="/survey/confirmation" component={() => <SurveyConfirmation />} />
            <Route path="/survey" component={() => <p>todo: write survey page</p>} />
            <Route
              path="*"
              component={() => <div> Page not found (TODO: write a 404 page) </div>}
            />
          </Switch>
        </Router>
      </div>
    </ChakraProvider>
  </QueryClientProvider>
);

export default App;
