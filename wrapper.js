import { success, failure } from './receipt.js'

export function wrap(handler) {
  return async (request, response) => {
    const { id, receipt, args } = request.body

    try {
      await handler(args)
      await success(receipt)

      response.send('ok')
    } catch (error) {
      await failure(receipt, error)

      response.status(500).send('err')
    }
  }
}
