import { RequestBody, ResponseBody } from '@/interfaces'
import processor from '@/processor'
import { FastifyInstance, RouteOptions } from 'fastify'
import bodySchema from '@/schemas/body.json'
import responseSchema from '@/schemas/response.json'

export default async (server: FastifyInstance, options: unknown) => {
  // https://www.fastify.io/docs/latest/TypeScript/
  const opt = {
    schema: {
      body: bodySchema,
      response: responseSchema,
    },
    preValidation: (request, reply, done) => {
      let res
      if (!request.headers.authorization || !request.headers.authorization.match(/^bearer\s+(.*)$/i).length) {
        reply.code(401)
        res = new Error('Authorization Required')
      }
      done(res)
    },
  } as RouteOptions

  server.post<{
    Body: RequestBody
  }>('/format', opt, async (request) => {
    const text: string = await processor(request.body)
    const response: ResponseBody = {
      text,
    }
    return response
  })

  server.get('/health', async (request, reply) => {
    return { status: 'OK' }
  })
}
