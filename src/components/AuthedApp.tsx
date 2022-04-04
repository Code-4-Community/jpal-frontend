import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, Text, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Role from '../api/dtos/role';
import useAuth from '../hooks/useAuth';
import { FullLogo } from './header/Logo';
import LoadingSpinner from './LoadingSpinner';
import '../styles.css';

interface AuthedAppProps {
  roles: Role[];
}

const AuthedApp: React.FC<AuthedAppProps> = ({ roles }) => {
  const [userLoading, userError, user] = useAuth();

  if (userLoading)
    return (
      <>
        <LoadingSpinner />
      </>
    );
  if (userError)
    return (
      <>
        <Alert status="error">
          An error occurred while fetching your user information. Please sign out and try again.
        </Alert>
      </>
    );
  if (!user)
    return (
      <Flex width="100%" justifyContent="center">
        <Flex gridColumnGap={30} alignItems="center">
          <Flex flexDirection="column" width="100%" padding="10" alignItems="flex-center">
            <FullLogo />
            <Text>
              This text here is to explain the background of the site or the user’s role, etc. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>
          </Flex>
          <Flex width="100%" justifyContent="flex-start">
            <AmplifyAuthenticator usernameAlias="email">
              <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
            </AmplifyAuthenticator>
          </Flex>
        </Flex>
      </Flex>
    );
  if (!roles.includes(user.role)) return <AmplifySignOut />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthedApp;
