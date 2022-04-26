import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import { Alert, Text, Flex, Center } from '@chakra-ui/react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Role from '../api/dtos/role';
import useAuth from '../hooks/useAuth';
import FullLogo from './header/FullLogo';
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
      <Center w="100%" paddingLeft="150px" paddingRight="150px">
        <Flex gridColumnGap={30} alignItems="center">
          <Flex flexDirection="column" padding="10" alignItems="flex-center">
            <FullLogo />
            <Text margin={10}>
              This text here is to explain the background of the site or the user’s role, etc. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </Text>
          </Flex>
          <Flex justifyContent="flex-start">
            <AmplifyAuthenticator usernameAlias="email">
              <AmplifySignIn usernameAlias="email" hideSignUp slot="sign-in" />
            </AmplifyAuthenticator>
          </Flex>
        </Flex>
      </Center>
    );
  if (!roles.includes(user.role)) return <AmplifySignOut />;
  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthedApp;
