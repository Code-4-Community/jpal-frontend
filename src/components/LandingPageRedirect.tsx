import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert } from '@chakra-ui/react';
import * as React from 'react';
import {Navigate} from 'react-router-dom';
import Role from '../api/dtos/role';
import useAuth from '../hooks/useAuth';
import LoadingSpinner from './LoadingSpinner';

interface LandingPageRedirectProps {
  rolesMap: Map<Role,string>;
}
// TODO: Fix signature
const LandingPageRedirect: ({rolesMap}: { rolesMap: any }) => (JSX.Element) = ({ rolesMap }) => {
  const [userLoading, userError, user] = useAuth();

  if (userLoading)
    return (
        <>
          <LoadingSpinner />
          <AmplifySignOut />;
        </>
    );
  if (userError)
    return (
        <>
          <Alert status="error">
            An error occurred while fetching your user information. Please sign out and try again.
          </Alert>
          <AmplifySignOut />
        </>
    );
  if (!user)
    return (
        <AmplifyAuthenticator usernameAlias="email">
          <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
        </AmplifyAuthenticator>
    );
  if (!rolesMap.has(user.role)) return <AmplifySignOut />;
  const path = rolesMap.get(user.role);
  return (
      path && <Navigate to={path} />
  );
};

export default LandingPageRedirect;
