import { ConfigurationError } from '@/utils/error'
import bold from '@/processor/modules/bold'
import italic from '@/processor/modules/italic'
import replace from '@/processor/modules/replace'
import space from '@/processor/modules/space'
import { facts, fetchFacts } from '@/processor/modules/chuck'
import { RequestBody, MarkdownConfig, Alignment } from '@/interfaces'
import { ModuleRender } from '@/interfaces/types'

const validate = (req: RequestBody): boolean => {
  return req.text?.length && Object.keys(req.config).length > 0
}

export default async (req: RequestBody): Promise<string> => {
  if (!validate(req)) {
    throw new ConfigurationError('Incoming request does not comply with schema')
  }

  const { text } = req
  let input: string = text

  if (req.config.food_facts) {
    await fetchFacts(req.config.food_facts)
  }

  const pipeline = [
    { mod: 'food_facts', fn: facts },
    { mod: 'bold', fn: bold },
    { mod: 'italic', fn: italic },
    { mod: 'replace', fn: replace },
    { mod: 'spacing', fn: space },
    // @todo: implement 'width' module
    { mod: 'width', fn: ((text: string, keywords: number): string => text) as ModuleRender },
    // todo implement 'alignment' module
    { mod: 'alignment', fn: ((text: string, keywords: Alignment): string => text) as ModuleRender },
  ]

  pipeline.map((pipe) => {
    const params = req.config[pipe.mod as keyof MarkdownConfig]
    if (params) {
      // FIXME TS is weird some times and hardly dynamic
      // @ts-ignore-line
      input = pipe.fn(input, params)
    }
    return pipe
  })

  return input
}
