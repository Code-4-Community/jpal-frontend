// eslint-disable-next-line import/no-extraneous-dependencies
import * as Pact from '@pact-foundation/pact';
import { ApiClient } from '../apiClient';

describe('GET /auth/me contract with API', () => {
  const api = new ApiClient(`http://localhost:${global.port}`, { skipAuth: true });

  describe('Researcher', () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: 'signed in as a researcher',
          uponReceiving: 'a GET request at /auth/me',
          withRequest: {
            method: 'GET',
            path: '/auth/me',
          },
          willRespondWith: {
            status: 200,
            body: Pact.Matchers.like({
              id: Pact.Matchers.somethingLike(1),
              email: Pact.Matchers.somethingLike('c4cneu.jpal+researcher@gmail.com'),
              role: 'researcher',
            }),
          },
        })
        .then(() => done());
    });

    it('sends a request according to contract', async () => {
      expect.assertions(1);
      const res = await api.getMe();
      expect(res).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          role: 'researcher',
        }),
      );
      return global.provider.verify();
    });
  });

  describe('Admin', () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: 'signed in as an admin',
          uponReceiving: 'a GET request at /auth/me',
          withRequest: {
            method: 'GET',
            path: '/auth/me',
          },
          willRespondWith: {
            status: 200,
            body: Pact.Matchers.like({
              id: Pact.Matchers.somethingLike(1),
              email: Pact.Matchers.somethingLike('c4cneu.jpal+admin@gmail.com'),
              role: 'admin',
            }),
          },
        })
        .then(() => done());
    });

    it('sends a request according to contract', async () => {
      expect.assertions(1);
      const res = await api.getMe();
      expect(res).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          email: expect.any(String),
          role: 'admin',
        }),
      );

      return global.provider.verify();
    });
  });

  describe('Not authorized', () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: 'is not authenticated',
          uponReceiving: 'a GET request at /auth/me',
          withRequest: {
            method: 'GET',
            path: '/auth/me',
          },
          willRespondWith: {
            status: 403,
          },
        })
        .then(() => done());
    });

    it('sends a request according to contract', async () => {
      expect.assertions(1);
      await api.getMe().catch((err) => {
        expect(err.response.status).toEqual(403);
      });
      return global.provider.verify();
    });
  });
});
