import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, ChakraProvider } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Route, Router, Switch, Redirect } from "react-router-dom"
import { ReactQueryDevtools } from 'react-query/devtools';

import apiClient from './api/apiClient';
import Role from './api/dtos/role';
import awsconfig from './aws-exports';
import LoadingSpinner from './components/LoadingSpinner';
import Logo from './components/Logo';
import ThankYou from './components/survey/ThankYou';
import AddAdminPage from './pages/addAdminPage/AddAdminPage';
import ResearcherLandingPage from './pages/researcherLandingPage/ResearcherLandingPage';
import AdminLandingPage from './pages/adminLandingPage/AdminLandingPage';
import ExampleFormPage from './pages/exampleFormPage/ExampleFormPage';
import ReviewerConfirmationPage from './pages/survey/ReviewerConfirmationPage';
import SurveyPage from './pages/survey/SurveyPage';
import theme from './theme';
import NotFoundPage from './pages/NotFoundPage';

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

  const isResearcher = data?.role === Role.RESEARCHER;

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
          {isLoading && <LoadingSpinner />}
          {data && (
            <Switch>
              <Route path="/private" exact component={() => <AdminLandingPage />} />
              <Route path="/private/example-form" exact component={() => <ExampleFormPage />} />
              {isResearcher && (
                <>
                  <Route
                    path="/private/dashboard"
                    exact
                    component={() => <ResearcherLandingPage />}
                  />
                  <Route path="/private/add-new-admin" exact component={() => <AddAdminPage />} />
                </>
              )}
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
          <Route path="/" component={() => <Redirect to="/private"/>} />
          <Route path="/private" component={AdminOnlyApp} />
          <Route
            path="/survey/:survey_uuid/:reviewer_uuid"
            exact
            component={() => <SurveyPage />}
          />
          <Route path="/survey/confirmation" component={() => <ThankYou />} />
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
