import Role from './role';

// eslint-disable-next-line import/prefer-default-export
interface User {
  id: number;

  email: string;

  role: Role;
}

export default User;
