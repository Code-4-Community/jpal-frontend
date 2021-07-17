import { Interaction } from '@pact-foundation/pact';
import { like } from '@pact-foundation/pact/src/dsl/matchers';
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
  
   describe('get user profile', () => {
     const PROFILE = {
       id: 0,
       email: "jung.ry@northeastern.edu",
       role: "researcher",
       password: "password",
     };

    beforeEach(() => {
      const interaction = new Interaction()
        .given('I am an authenticated user')
        .uponReceiving('A request for my user profile')
        .withRequest({
          method: 'GET',
          path: '/auth/me',
          headers: {
            'Authorization': 'Bearer {token}'
          }
        })
        .willRespondWith({
          status: 200,
          body: like(PROFILE),
        });

      return provider.addInteraction(interaction);
    });

    // add expectations
    it('returns a successful body', () => 
      client.getProfile().then((body: any) => expect(body).toEqual(PROFILE))
    );
  });
});
