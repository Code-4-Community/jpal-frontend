import React from 'react';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import * as Sentry from '@sentry/react';
import { Auth, Hub } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../assets/Avatar.svg';

type JPALMenuProps = {
  isResearcher: boolean;
};

const JPALMenu: React.FC<JPALMenuProps> = ({ isResearcher }) => {
  const navigate = useNavigate();

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
      <MenuButton>
        <img src={Avatar} alt="User avatar" />
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
