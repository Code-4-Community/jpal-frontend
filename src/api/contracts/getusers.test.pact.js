// eslint-disable-next-line import/no-extraneous-dependencies
import * as Pact from '@pact-foundation/pact';
import { ApiClient } from '../apiClient';

describe('GET /user contract with API', () => {
  const api = new ApiClient(`http://localhost:${global.port}`,
      {skipAuth: true});

  describe('Researcher', () => {
    beforeEach((done) => {
      global.provider
      .addInteraction({
        state: 'signed in as a researcher',
        uponReceiving: 'a GET request at /user',
        withRequest: {
          method: 'GET',
          path: '/user',
        },
        willRespondWith: {
          status: 200,
          body: Pact.eachlike( Pact.Matchers.like({
            id: Pact.Matchers.somethingLike(1),
            email: Pact.Matchers.somethingLike(
                'c4cneu.jpal+admin@gmail.com'),
            role: 'admin',
          })),
        },
      })
      .then(() => done());
    });

    it('sends a request according to contract', async () => {
      expect.assertions(1);
      const res = await api.getAdmins();
      expect(res).toEqual(
          expect.arrayContaining(
          expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
            role: 'admin',
          })),
      );

      return global.provider.verify();
    });
  });
});

