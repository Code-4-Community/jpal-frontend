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

    it('sends a request according to contract', (done) => {
      api.getMe().then(() => {
        global.provider.verify().then(
          () => done(),
          (error) => {
            done.fail(error);
          },
        );
      });
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

    it('sends a request according to contract', (done) => {
      api.getMe().then(() => {
        global.provider.verify().then(
          () => done(),
          (error) => {
            done.fail(error);
          },
        );
      });
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

    it('sends a request according to contract', (done) => {
      api.getMe().then(() => {
        global.provider.verify().then(
          () => done(),
          (error) => {
            done.fail(error);
          },
        );
      });
    });
  });
});
