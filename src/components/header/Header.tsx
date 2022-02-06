import * as React from 'react';
import { Box } from '@chakra-ui/react';
import JPALMenu from './JPALMenu';
import Role from '../../api/dtos/role';
import User from '../../api/dtos/user.dto';
import Logo from './Logo';

interface HeaderProps {
  profile?: User;
}

const Header: React.FC<HeaderProps> = ({ profile }) => (
  <Box display="flex" justifyContent="space-between">
    <Logo w="12" h="12" marginTop="4" marginLeft="8" />
    <JPALMenu isResearcher={profile?.role === Role.RESEARCHER} />
  </Box>
);

export default Header;
