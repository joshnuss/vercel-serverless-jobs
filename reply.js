import fetch from 'node-fetch'

export async function success(url) {
  await reply(url, { status: 'success' })
}

export async function failure(url, error) {
  await reply(url, { status: 'failure', error })
}

async function reply(url, message) {
  console.log('reply', {url, ...message})

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(message)
  })
}
