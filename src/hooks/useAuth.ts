import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import { useQuery } from 'react-query';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CognitoUser } from '@aws-amplify/auth';
import { Auth } from 'aws-amplify';
import User from '../api/dtos/user.dto';
import apiClient from '../api/apiClient';

/**
 * Waits for Amplify auth state to change. When it changes, refetches the User from the backend.
 * @returns whether the User object is being loaded, whether there was an error fetching the user,
 *          and the User object (or undefined if not signed in)
 */
export default function useAuth(): [boolean, boolean, User | undefined] {
  const [authState, setAuthState] = React.useState<AuthState>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = React.useState<any>();

  useEffect(() => {
    async function checkCurrentUser() {
      try {
        const currentUser = await Auth.currentAuthenticatedUser() as CognitoUser;
        setAuthState(AuthState.SignedIn);
        setUser(currentUser);
      } catch (e) {
        setAuthState(AuthState.SignedOut);
        setUser(null);
      }
    }
    
    checkCurrentUser();
  }, []);

  useEffect(
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

  return [isLoading, !!error, authState === AuthState.SignedIn ? data : undefined];
}
