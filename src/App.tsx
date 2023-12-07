import { ChakraProvider, Container } from '@chakra-ui/react';
import Amplify from 'aws-amplify';
import { History } from 'history';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Role from './api/dtos/role';
import awsconfig from './aws-exports';
import AuthedApp from './components/AuthedApp';
import Header from './components/header/Header';
import ThankYou from './components/survey/ThankYou';
import AddAdminPage from './pages/addAdminPage/AddAdminPage';
import AdminLandingPage from './pages/adminLandingPage/AdminLandingPage';
import ExampleFormPage from './pages/exampleFormPage/ExampleFormPage';
import NotFoundPage from './pages/NotFoundPage';
import ResearcherLandingPage from './pages/researcherLandingPage/ResearcherLandingPage';
import ReviewerConfirmationPage from './pages/survey/ReviewerConfirmationPage';
import SurveyPage from './pages/survey/SurveyPage';
import theme from './theme';
import LandingPageRedirect from './components/LandingPageRedirect';
import Footer from './components/footer/Footer';
import CreateSurvey from './components/createSurvey/CreateSurvey';

const queryClient = new QueryClient();

Amplify.configure(awsconfig);

interface AppProps {
  history: History<unknown>;
}

// Map with all the roles mapped to their landing pages
const roleMap = {
  [Role.ADMIN]: '/private',
  [Role.RESEARCHER]: '/researcher',
};

const App: React.FC<AppProps> = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Container display="flex" flexDirection="column" minHeight="100vh" maxWidth="100%">
          <Header />
          <Container flex="1" maxWidth="100%">
            <Routes>
              <Route path="/" element={<LandingPageRedirect rolesMap={roleMap} />} />
              <Route path="/private" element={<AuthedApp roles={[Role.ADMIN, Role.RESEARCHER]} />}>
                <Route path="" element={<AdminLandingPage />} />
                <Route path="example-form" element={<ExampleFormPage />} />
              </Route>
              <Route path="/researcher" element={<AuthedApp roles={[Role.RESEARCHER]} />}>
                <Route path="" element={<Navigate to="/researcher/dashboard" />} />
                <Route path="dashboard" element={<ResearcherLandingPage />} />
                <Route path="add-new-admin" element={<AddAdminPage />} />
              </Route>
              <Route path="/create-survey" element={<CreateSurvey />} />
              <Route path="/survey/:survey_uuid/:reviewer_uuid" element={<SurveyPage />} />
              <Route path="/survey/confirmation" element={<ThankYou />} />
              <Route path="/survey/confirm-reviewer" element={<ReviewerConfirmationPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
          <Footer />
        </Container>
      </BrowserRouter>
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);

export default App;
