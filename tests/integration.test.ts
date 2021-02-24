import createApp from '@/app'
import { RequestBody, MarkdownConfig } from '@/interfaces'
import { FastifyInstance } from 'fastify'
import { text as inputText } from './fixtures/input.json'
import output from './fixtures/output.json'
import requestParams from './fixtures/request-params.json'

describe('Integration Test', () => {
  let app: FastifyInstance
  beforeEach(() => {
    app = createApp()
  })

  test('http endpoint should return 200 with formatted text', async () => {
    const request: RequestBody = {
      config: requestParams as MarkdownConfig,
      text: inputText,
    }
    const response = await app
      .inject()
      .post('/api/v1/format')
      .headers({
        authorization: 'bearer foobar',
      })
      .payload(request)

    expect(response.statusCode).toBe(200)
    expect(response.json()).toStrictEqual(output)
  })

  test('http endpoint should reject request due to missing authorization', async () => {
    const request: RequestBody = {
      config: requestParams as MarkdownConfig,
      text: inputText,
    }
    const response = await app.inject().post('/api/v1/format').payload(request)

    expect(response.statusCode).toBe(401)
    expect(response.json().error).toBe('Unauthorized')
  })

  test('http endpoint should return bad request on malformed input', async () => {
    const request: RequestBody = {
      config: {
        // NB! needed to test bad request
        // @ts-ignore
        spacing: 'tripple',
        italic: ['Chuck'],
      },
      text: inputText,
    }
    const response = await app
      .inject()
      .post('/api/v1/format')
      .headers({
        authorization: 'bearer foobar',
      })
      .payload(request)

    expect(response.statusCode).toBe(400)
    expect(response.json().error).toBe('Bad Request')
  })
})
