// eslint-disable-next-line import/no-extraneous-dependencies
import * as Pact from '@pact-foundation/pact';
import ApiClient from '../apiClient';

describe('Basic GET / contract with API', () => {
  const api = new ApiClient(`http://localhost:${global.port}`);

  describe('GET /', () => {
    beforeEach((done) => {
      global.provider
        .addInteraction({
          state: 'nothing',
          uponReceiving: 'a GET request at /',
          withRequest: {
            method: 'GET',
            path: '/',
          },
          willRespondWith: {
            status: 200,
            body: Pact.Matchers.somethingLike('Hello, World!'),
          },
        })
        .then(() => done());
    });

    it('sends a request according to contract', (done) => {
      api
        .getHello()
        .then((response) => {
          expect(response).toEqual('Hello, World!');
        })
        .then(() => {
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
