import fetch from 'node-fetch'

export default async function handler(request, response) {
  const res = await fetch('https://google.com')

  response.json({
    message: 'hello world',
    body: await res.text()
  })
}
