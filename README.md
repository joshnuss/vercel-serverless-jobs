# Serverless background job experiment

An experiment to create an asynchronous background job queue based on cloud functions.

Each background job is a serverless function that notifies a "coordinator" when it succeeds or failures.

When a failure occurs, the coordinator will re-schedule the worker to be retried later based on a backoff strategy.

## Background job

A background job is a function that looks like this:

```javascript
// in jobs/example.js
export default async function job(args) {
  console.log(args)
}
```

For example, a job for sending an e-mail might look like this:

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

The build process generates Vercel serverless functions:

```bash
pnpm build
```

## Deploy

The jobs can be deployed to vercel:

```bash
npx vercel
```

## Testing

The job can be called manually via `curl`:

```bash
curl http://localhost:3000/api/sendMail \
  -H 'content-type: application/json' \
  -d '{"id": 1, "callback": "http://localhost/receipt/1", "args": {"from": "josh@example.com", "to": "josh@example.com", "subject": "It works", "message": "It totally works"}}'
```
