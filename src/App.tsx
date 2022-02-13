import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, ChakraProvider } from '@chakra-ui/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import awsconfig from './aws-exports';
import Header from './components/header/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ThankYou from './components/survey/ThankYou';
import useAuth from './hooks/useAuth';
import AddAdminPage from './pages/addAdminPage/AddAdminPage';
import AdminLandingPage from './pages/adminLandingPage/AdminLandingPage';
import ExampleFormPage from './pages/exampleFormPage/ExampleFormPage';
import NotFoundPage from './pages/NotFoundPage';
import ResearcherLandingPage from './pages/researcherLandingPage/ResearcherLandingPage';
import ReviewerConfirmationPage from './pages/survey/ReviewerConfirmationPage';
import SurveyPage from './pages/survey/SurveyPage';
import theme from './theme';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

interface AppProps {
  history: History<unknown>;
}

const AdminOnlyApp: React.FC = () => {
  const [userLoading, userError, user] = useAuth();

  if (userLoading) return (
    <>
      <LoadingSpinner />
      <AmplifySignOut />;
    </>
  )
  if (userError) return (
    <>
      <Alert status="error">
        An error occurred while fetching your user information. Please sign out and try again.
      </Alert>
      <AmplifySignOut />
    </>
  )
  if (!user) return (
    <AmplifyAuthenticator usernameAlias="email">
      <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
    </AmplifyAuthenticator>
  );
  return (
    <>
      <Outlet />
      <AmplifySignOut />
    </>
  );
};

const App: React.FC<AppProps> = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/private" element={<AdminOnlyApp />}>
            <Route path="" element={<AdminLandingPage />} />
            <Route path="example-form" element={<ExampleFormPage />} />
            <Route path="dashboard" element={<ResearcherLandingPage />} />
            <Route path="add-new-admin" element={<AddAdminPage />} />
          </Route>
          <Route path="/survey/:survey_uuid/:reviewer_uuid" element={<SurveyPage />} />
          <Route path="/survey/confirmation" element={<ThankYou />} />
          <Route path="/survey/confirm-reviewer" element={<ReviewerConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
