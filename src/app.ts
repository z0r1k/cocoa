import Fastify, { FastifyInstance, FastifyServerOptions } from 'fastify'
import fastifyCors from 'fastify-cors'
import routes from './routes'

const createApp = (opts?: FastifyServerOptions): FastifyInstance => {
  const server: FastifyInstance = Fastify(opts)

  server.register(fastifyCors, { origin: '*' })
  server.register(routes, { prefix: '/api/v1' })

  return server
}

export default createApp
