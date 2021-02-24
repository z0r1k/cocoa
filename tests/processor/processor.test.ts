import processor from '@/processor'
import { RequestBody, MarkdownConfig, Alignment, Spacing } from '@/interfaces'
import { ConfigurationError } from '@/utils/error'
import { text as inputText } from '../fixtures/input.json'
import { text as outputText } from '../fixtures/output.json'
import requestParams from '../fixtures/request-params.json'

describe('Processor', () => {
  test('processes input string correctly', async () => {
    const req: RequestBody = {
      config: requestParams as MarkdownConfig,
      text: inputText,
    }
    const res = await processor(req)
    expect(res).toBe(outputText)
  })

  test('should return original text if no configuration could be applied', async () => {
    const req: RequestBody = {
      config: {
        bold: ['Bob', 'Alice', 'Jack'],
        italic: ['pizza'],
        replace: {
          Sugar: 'Xylit',
        },
      } as MarkdownConfig,
      text: inputText as string,
    }
    const res = await processor(req)
    expect(res).toBe(inputText)
  })

  test('should throw an error if misconfigured', () => {
    const config: MarkdownConfig = {
      bold: ['Bob', 'Alice', 'Jack'],
      italic: ['pizza'],
      replace: {
        Sugar: 'Xylit',
      },
    }

    expect(async () => processor({ config, text: '' } as RequestBody)).rejects.toThrow(ConfigurationError)
    expect(async () =>
      processor({
        config: {} as MarkdownConfig,
        text: inputText,
      } as RequestBody),
    ).rejects.toThrow(ConfigurationError)
  })
})
