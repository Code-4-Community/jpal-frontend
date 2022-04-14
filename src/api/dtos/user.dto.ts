import Role from './role';

// eslint-disable-next-line import/prefer-default-export
interface User {
  id: number;

  firstName: string;

  lastName: string;

  email: string;

  role: Role;

  creation_date: Date;
}

export default User;
