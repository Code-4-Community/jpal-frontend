// eslint-disable-next-line import/no-extraneous-dependencies
import * as Pact from '@pact-foundation/pact';
import { ApiClient } from '../apiClient';
import Role from '../dtos/role';

const MockUserAdmin = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'something@something.com',
  role: Role.ADMIN,
};
describe('POST /user', () => {
  const api = new ApiClient(`http://localhost:${global.port}`, { skipAuth: true });

  describe('Researcher', () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: 'signed in as a researcher',
          uponReceiving: 'a POST request at /user',
          withRequest: {
            method: 'POST',
            path: '/user',
            body: MockUserAdmin,
          },
          willRespondWith: {
            status: 201,
            body: Pact.Matchers.like({
              id: Pact.Matchers.somethingLike(1),
              firstName: 'John',
              lastName: 'Doe',
              email: Pact.Matchers.somethingLike('something@something.com'),
              role: Pact.Matchers.somethingLike('admin'),
            }),
          },
        })
        .then(() => done());
    });

    it('sends a request according to contract', async () => {
      // expect.assertions(1);
      const res = await api.createUser(MockUserAdmin);
      expect(res).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: 'John',
          lastName: 'Doe',
          email: 'something@something.com',
          role: 'admin',
        }),
      );
      return global.provider.verify();
    });
  });
});
