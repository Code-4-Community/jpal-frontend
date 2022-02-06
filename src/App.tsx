import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, ChakraProvider } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import apiClient from './api/apiClient';
import Role from './api/dtos/role';
import awsconfig from './aws-exports';
import LoadingSpinner from './components/LoadingSpinner';
import ThankYou from './components/survey/ThankYou';
import AddAdminPage from './pages/addAdminPage/AddAdminPage';
import ResearcherLandingPage from './pages/researcherLandingPage/ResearcherLandingPage';
import AdminLandingPage from './pages/adminLandingPage/AdminLandingPage';
import ExampleFormPage from './pages/exampleFormPage/ExampleFormPage';
import ReviewerConfirmationPage from './pages/survey/ReviewerConfirmationPage';
import SurveyPage from './pages/survey/SurveyPage';
import theme from './theme';
import NotFoundPage from './pages/NotFoundPage';
import User from './api/dtos/user.dto';
import Header from './components/header/Header';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

interface AppProps {
  history: History<unknown>;
}

interface AdminOnlyAppProps {
  setProfile: (profile: User | undefined) => void;
}

const AdminOnlyApp: React.FC<AdminOnlyAppProps> = ({ setProfile }) => {
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

  React.useEffect(() => {
    setProfile(data);
  }, [data, setProfile]);

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
          {data && <Outlet />}
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

const App: React.FC<AppProps> = () => {
  const [userProfile, setUserProfile] = React.useState<User | undefined>(undefined);

  const isResearcher = userProfile?.role === Role.RESEARCHER;

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Header profile={userProfile} />
          <Routes>
            <Route path="/private" element={<AdminOnlyApp setProfile={setUserProfile} />}>
              <Route path="" element={<AdminLandingPage />} />
              <Route path="example-form" element={<ExampleFormPage />} />
              {isResearcher && (
                <>
                  <Route path="dashboard" element={<ResearcherLandingPage />} />
                  <Route path="add-new-admin" element={<AddAdminPage />} />
                </>
              )}
            </Route>
            <Route path="/survey/:survey_uuid/:reviewer_uuid" element={<SurveyPage />} />
            <Route path="/survey/confirmation" element={<ThankYou />} />
            <Route path="/survey/confirm-reviewer" element={<ReviewerConfirmationPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
