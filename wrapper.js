import { success, failure } from './reply.js'

export function wrap(handler) {
  return async (request, response) => {
    const { id, callback, args } = request.body

    try {
      await handler(args)
      await success(callback)

      response.send('ok')
    } catch (error) {
      await failure(callback, error)

      response.status(500).send('err')
    }
  }
}
