import * as React from 'react';
import { Box } from '@chakra-ui/react';
import JPALMenu from './JPALMenu';
import Role from '../../api/dtos/role';
import Logo from './Logo';
import useAuth from '../../hooks/useAuth';

const Header: React.FC = () => {
  const [, , user] = useAuth();

  if (!user) return null;

  return (
    <Box display="flex" justifyContent="space-between">
      <Logo w="12" h="12" marginTop="4" marginLeft="8" />
      <JPALMenu isResearcher={user?.role === Role.RESEARCHER} />
    </Box>
  );
};

export default Header;
