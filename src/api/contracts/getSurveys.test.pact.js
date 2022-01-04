// eslint-disable-next-line import/no-extraneous-dependencies
import { eachLike, like, somethingLike } from '@pact-foundation/pact/src/dsl/matchers';
import { ApiClient } from '../apiClient';

describe('GET /survey contract with API', () => {
  const api = new ApiClient(`http://localhost:${global.port}`, { skipAuth: true });

  describe('Admin', () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: 'signed in as a researcher',
          uponReceiving: 'a GET request at /survey',
          withRequest: {
            method: 'GET',
            path: '/survey',
          },
          willRespondWith: {
            status: 200,
            body: eachLike(
              like({
                id: somethingLike(1),
                creator: like({
                  id: somethingLike(1),
                  email: somethingLike('c4cneu.jpal+admin@gmail.com'),
                  role: 'admin',
                }),
                uuid: somethingLike('123e4567-e89b-12d3-a456-426614174330'),
                surveyTemplate: like({
                  id: somethingLike(1),
                  creator: like({
                    id: somethingLike(1),
                    email: somethingLike('c4cneu.jpal+admin@gmail.com'),
                    role: 'admin',
                  }),
                  questions: somethingLike([]),
                }),
              }),
            ),
          },
        })
        .then(() => done());
    });

    it('sends a request according to contract', async () => {
      expect.assertions(1);
      const res = await api.getMySurveys();
      expect(res).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            creator: expect.objectContaining({
              id: expect.any(Number),
              email: expect.any(String),
              role: 'admin',
            }),
            uuid: expect.any(String),
            surveyTemplate: expect.objectContaining({
              id: expect.any(Number),
              creator: expect.objectContaining({
                id: expect.any(Number),
                email: expect.any(String),
                role: 'admin',
              }),
              questions: expect.any(Array),
            }),
          }),
        ]),
      );

      return global.provider.verify();
    });
  });
});
