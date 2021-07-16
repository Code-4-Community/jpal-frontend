import { Interaction } from '@pact-foundation/pact';
import { pactWith } from 'jest-pact';
import ApiClient from '../src/api/apiClient';

pactWith({ consumer: 'jpal-frontend', provider: 'jpal-backend' }, (provider) => {
  let client : ApiClient;

  beforeEach(() => {
    client = new ApiClient(provider.mockService.baseUrl);
  });

  describe('Hello world', () => {
    const HELLO_WORLD = "Hello World?";

    beforeEach(() => {
      const interaction = new Interaction()
        .uponReceiving('A request for hello world')
        .withRequest({
          method: 'GET',
          path: '/',
        })
        .willRespondWith({
          status: 200,
          body: HELLO_WORLD,
        });

      return provider.addInteraction(interaction);
    });

    // add expectations
    it('returns a successful body', () => 
      client.getHello().then((hello: string) => 
        expect(hello).toBe(HELLO_WORLD)
      )
    );
  });
});
