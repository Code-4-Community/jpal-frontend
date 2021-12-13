import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, ChakraProvider, Spinner } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Router, Switch } from 'react-router-dom';
import apiClient from './api/apiClient';
import awsconfig from './aws-exports';
import Logo from './components/Logo';
import ExampleFormPage from './pages/ExampleFormPage';
import AddAdminPage from './pages/AddAdminPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import SurveyConfirmation from './components/survey/SurveyConfirmation';
import SurveyPage from './pages/survey/SurveyPage';
import ReviewerConfirmationPage from './pages/survey/ReviewerConfirmationPage';
import theme from './theme';
import NotFoundPage from './pages/NotFoundPage';
import AdminLandingPage from './pages/AdminLandingPage';

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
              <Route path="/admin" exact component={() => <AdminLandingPage />} />
              <Route path="/admin/dashboard" exact component={() => <AdminDashboard />} />
              <Route path="/admin/example-form" exact component={() => <ExampleFormPage />} />
              <Route path="/admin/add-new-admin" exact component={() => <AddAdminPage />} />
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
      <Router history={history}>
        <Logo w="12" h="12" marginTop="4" marginLeft="8" />
        <Switch>
          <Route path="/admin" component={AdminOnlyApp} />
          <Route
            path="/survey/:survey_uuid/:reviewer_uuid"
            exact
            component={() => <SurveyPage />}
          />
          <Route path="/survey/confirmation" component={() => <SurveyConfirmation />} />
          <Route
            path="/survey/confirm-reviewer"
            exact
            component={() => <ReviewerConfirmationPage />}
          />
          <Route path="*" component={() => <NotFoundPage />} />
        </Switch>
      </Router>
    </ChakraProvider>
  </QueryClientProvider>
);

export default App;
