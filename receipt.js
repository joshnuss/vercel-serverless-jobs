import fetch from 'node-fetch'

export async function success(url) {
  await receipt(url, { status: 'success' })
}

export async function failure(url, error) {
  await receipt(url, { status: 'failure', error })
}

async function receipt(url, message) {
  console.log('receipt', {url, ...message})

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(message)
  })
}
