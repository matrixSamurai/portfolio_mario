import { handler } from './index.mjs';

const event = {
  requestContext: { http: { method: 'POST' } },
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'What is Ujjwal\'s work experience?' }
    ]
  })
};

console.log('Testing Lambda handler...\n');
const result = await handler(event);
console.log('Status:', result.statusCode);
const body = JSON.parse(result.body);
console.log('Reply:\n', body.reply || body.error);
