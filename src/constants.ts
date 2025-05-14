// Map with all the roles mapped to their landing pages

import Role from './api/dtos/role';

// eslint-disable-next-line import/prefer-default-export
export const roleMap = {
  [Role.ADMIN]: '/private',
  [Role.RESEARCHER]: '/researcher',
};
