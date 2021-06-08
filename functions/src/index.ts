import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sveltekitServer: any;
exports.sveltekit = functions.https.onRequest(async (request, response) => {
  if (!sveltekitServer) {
    functions.logger.info('Initialising SvelteKit SSR Handler');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    sveltekitServer = require('./sveltekit/index').default;
    functions.logger.info('SvelteKit SSR Handler initialised!');
  }
  functions.logger.info('Requested resource: ' + request.originalUrl);
  return sveltekitServer(request, response);
});
