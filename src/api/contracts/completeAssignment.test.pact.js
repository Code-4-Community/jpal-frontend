// eslint-disable-next-line import/no-extraneous-dependencies
import * as Pact from '@pact-foundation/pact';
import { ApiClient } from '../apiClient';

describe('PATCH /assignment/`assignmentUuid`', () => {
  const api = new ApiClient(`http://localhost:${global.port}`, { skipAuth: true });

  describe('PATCH /assignment/`assignmentUuid`', () => {
    beforeEach((done) => {
      global.provider
      .addInteraction({
        state: 'TODO: ask Ryan',
        uponReceiving: 'a PATCH request at /assignment/`assignmentUuid`',
        withRequest: {
          method: 'PATCH',
          path: '/assignment/1' //TODO: Ask Ryan how to fill in a dummy uuid,
        },
        willRespondWith: {
          status: 200,
          body: Pact.Matchers.somethingLike(undefined),
        },
      })
      .then(() => done());
    });

    it('sends a request according to contract', (done) => {
      api
      .completeAssignment(1)//TODO: Ask Ryan what goes in as uuid
      .then((response) => {
        expect(response).toEqual(undefined);
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
