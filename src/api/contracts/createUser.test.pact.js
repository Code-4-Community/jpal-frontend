// eslint-disable-next-line import/no-extraneous-dependencies
import * as Pact from '@pact-foundation/pact';
import { ApiClient } from '../apiClient';

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
            body: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'something@something.com',
              role: 'admin',
            },
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

      const res = await api.createUser({
        email: 'something@somthing.com',
        firstName: 'test',
        lastName: 'user',
        role: 'admin',
      });
      expect(res).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          firstName: 'test',
          lastName: 'user',
          email: 'something@something.com',
          role: 'admin',
        }),
      );
      return global.provider.verify();
    });
  });
});
