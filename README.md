# Serverless background job experiment

Each background job is a serverless function that notifies the "coordinator" when it succeeds or failures.

When a failure occurs, the coordinator will re-schedule the worker to be retried later.

## Bakckground job

A background job looks like this:

```javascript
// in jobs/sendMail.js
import postmark from 'postmark'

export default async function job(args) {
  const { from, to, subject, message } = args

  client = new postmark.ServerClient(process.env.POSTMARK_API_KEY)

  await client.sendEmail({
    From: from,
    To: to,
    Subject: subject,
    TextBody: message
  })
}
```

## Building

The build process will generate vercel serverless functions:

```bash
pnpm build
```

## Deploy

```bash
npx vercel
```

## Testing

The job can be manually called with `curl`:

```bash
curl http://localhost:3000/api/sendMail -d '{"id": 1, "callback": "http://localhost/reply/1", "args": {"from": "josh@example.com", "to": "josh@example.com", "subject": "It works", "message": "It totally works"}}' -H 'content-type: application/json'
```
