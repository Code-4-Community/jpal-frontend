import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert } from '@chakra-ui/react';
import * as React from 'react';
import { Navigate } from 'react-router-dom';
import Role from '../api/dtos/role';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface LandingPageRedirectProps {
  rolesMap: Record<Role, string>;
}

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
      {user && (!user.role || (user.role && !rolesMap[user.role])) && <AmplifySignOut />}
      {user && user.role !== undefined && rolesMap[user.role] && (
        <Navigate to={rolesMap[user.role]} />
      )}
    </>
  );
};

export default LandingPageRedirect;
