// eslint-disable-next-line import/no-extraneous-dependencies
import { ApiClient } from '../apiClient';
import {
  eachLike,
  like,
  somethingLike
} from "@pact-foundation/pact/src/dsl/matchers";

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
          body: eachLike( like({
            id: somethingLike(1),
            email: somethingLike(
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
          expect.arrayContaining([
              expect.objectContaining({
                id: expect.any(Number),
                email: expect.any(String),
                role: 'admin',
              })])
      );

      return global.provider.verify();
    });
  });
});

