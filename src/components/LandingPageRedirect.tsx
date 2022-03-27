import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert } from '@chakra-ui/react';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Role from '../api/dtos/role';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface LandingPageRedirectProps {
  rolesMap: Map<Role, string>;
}
// TODO: Fix signature
const LandingPageRedirect: React.FC<LandingPageRedirectProps> = ({ rolesMap }) => {
  const [userLoading, userError, user] = useAuth();

  return (
    <>
      {userLoading && <LoadingSpinner />}
      {userError && (
        <>
          <Alert status="error">
            An error occurred while fetching your user information. Please sign out and try again.
          </Alert>
          <AmplifySignOut />
        </>
      )}
      {!user && (
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
        </AmplifyAuthenticator>
      )}
      {user && !rolesMap.has(user.role) && <AmplifySignOut />}
      {user && rolesMap.has(user.role) && user.role !== undefined && <Navigate to={user.role} />}
    </>
  );
};

export default LandingPageRedirect;
