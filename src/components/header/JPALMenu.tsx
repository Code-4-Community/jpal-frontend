import React from 'react';
import { chakra, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { Auth, Hub } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../assets/Avatar.svg';

type JPALMenuProps = {
  isResearcher: boolean;
  setUserAvatarClicked: (userAvatarClicked: boolean) => void;
  userAvatarClicked: boolean;
};

const JPALMenu: React.FC<JPALMenuProps> = ({
  isResearcher,
  setUserAvatarClicked,
  userAvatarClicked,
}) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    setUserAvatarClicked(userAvatarClicked);
  }, [userAvatarClicked, setUserAvatarClicked]);

  const onSignOutClicked = async () => {
    try {
      await Auth.signOut();
      // The following is needed to trigger authUIStateChange so that it redirects to login
      Hub.dispatch('UI Auth', {
        event: 'AuthStateChange',
        message: 'signedout',
      });
    } catch (error) {
      Sentry.captureException('Error signing out');
    }
  };

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <Menu>
      <MenuButton onClick={() => setUserAvatarClicked(!userAvatarClicked)}>
        <chakra.img src={Avatar} alt="User avatar" />
      </MenuButton>
      <MenuList>
        {isResearcher && (
          <MenuItem onClick={() => navigateTo('/researcher/dashboard')}>View Admins</MenuItem>
        )}
        {isResearcher && <MenuItem onClick={() => navigateTo('/private')}>View Surveys</MenuItem>}
        <MenuItem onClick={onSignOutClicked}>Sign Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default JPALMenu;
