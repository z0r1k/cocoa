import { ConfigurationError } from '@/utils/error'
import { Alignment, Replace, Spacing } from '@/interfaces'
import bold from '@/processor/modules/bold'
import { facts, fetchFacts } from '@/processor/modules/chuck'
import italic from '@/processor/modules/italic'
import replace from '@/processor/modules/replace'
import space from '@/processor/modules/space'
import { text as textBold } from '../../fixtures/bold.json'
import { text } from '../../fixtures/input.json'
import { text as textItalic } from '../../fixtures/italic.json'
import { text as textReplace } from '../../fixtures/replace.json'
import { double as textSpaceDouble, single as textSpaceSingle } from '../../fixtures/space.json'
import { factory } from '../../utils'

describe('Processing Modules', () => {
  describe('Module Bold', () => {
    test('should convert given keywords to bold', () => {
      const res = bold(text, ['Cocoa', 'Chuck', 'Norris'])
      expect(res).toBe(textBold)
    })

    test('should return original string if no matching keywords found', () => {
      const res = bold(text, ['Bob'])
      expect(res).toBe(text)
    })

    test('should throw an error if misconfigured', () => {
      const fns = factory(bold.bind(bold))
      fns.map((fn) => {
        return expect(fn).toThrow(ConfigurationError)
      })
    })
  })

  describe('Module Italic', () => {
    test('should convert given keywords to italic', () => {
      const res = italic(text, ['food'])
      expect(res).toBe(textItalic)
    })

    test('should return original string if no matching keywords found', () => {
      const res = italic(text, ['Alice'])
      expect(res).toBe(text)
    })

    test('should throw an error if misconfigured', () => {
      const fns = factory(italic)
      fns.map((fn) => {
        return expect(fn).toThrow(ConfigurationError)
      })
    })
  })

  describe('Module Replace', () => {
    test('should replace given keywords', () => {
      const replaceKeywords: Replace = {
        Cocoa: 'COCOA',
        sustainable: 'SUSTAINABLE',
      }
      const res = replace(text, replaceKeywords)
      expect(res).toBe(textReplace)
    })

    test('should return original string if no matching keywords found', () => {
      const replaceKeywords: Replace = {
        bob: 'Jack',
        Alice: 'JACK',
      }
      const res = replace(text, replaceKeywords)
      expect(res).toBe(text)
    })

    test('should throw an error if misconfigured', () => {
      const replaceKeywords: Replace = {
        'foo': 'bar',
        '': 'baz',
        undefined,
      }
      const fns = factory(replace, replaceKeywords)
      fns.map((fn) => {
        return expect(fn).toThrow(ConfigurationError)
      })
    })
  })

  describe('Module Chuck', () => {
    test('should enrich text with Chuck Norris quotes', async () => {
      const kw = 'global'
      const quotes = await fetchFacts([kw])
      const res = facts(text, [kw])

      expect(res).toBe(`${text}\n${quotes[kw]}`)
    })

    test('should return original string if no matching keywords found', async () => {
      const kw = 'dcfe928a-165f-41a0-b640-bb188baebbf9'
      const quotes = await fetchFacts([kw])
      const res = facts(text, [kw])

      expect(quotes[kw]).toBe('')
      expect(res).toBe(text)
    })

    test('should throw an error if misconfigured', () => {
      const fns = factory(facts)
      fns.map((fn) => {
        return expect(fn).toThrow(ConfigurationError)
      })
    })
  })

  describe('Module Space', () => {
    test('should convert new lines to specified spacing', () => {
      const resSingle = space(text, Spacing.Single)
      const resSingleNormalized = space(text.replace('\n', '\\n'), Spacing.Single)
      const resDouble = space(text, Spacing.Double)

      expect(resSingle).toBe(textSpaceSingle)
      expect(resSingleNormalized).toBe(textSpaceSingle)
      expect(resDouble).toBe(textSpaceDouble)
    })
  })

  test('should return original string', () => {
    const str = 'Hello, friends.'
    expect(space(str, Spacing.Double)).toBe(str)
    expect(space(str, Alignment.Center)).toBe(str)
  })

  test('should throw an error if misconfigured', () => {
    expect(() => space('', Spacing.Single)).toThrow(ConfigurationError)
    expect(() => space('Hello\n', 42)).toThrow(ConfigurationError)
    // FIXME Huh?
    // expect(() => space('Howdy!', Alignment.Left)).toThrow(ConfigurationError)
  })
})
