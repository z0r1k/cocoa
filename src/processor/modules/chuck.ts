import { ConfigurationError } from '@/utils/error'
import { ChuckApiResponse } from '@/interfaces'
import { Module } from '@/interfaces/types'
import axios from 'axios'
import { URLSearchParams } from 'url'
import cache from '@/utils/cache'

const fetchFacts = async (keywords: string[]): Promise<Record<string, string>> => {
  const result: Record<string, string> = {}

  const requests = keywords.map((kw) => {
    const value = cache.get(`raw_${kw}`)
    if (value) {
      return Promise.resolve(value)
    }
    const params = new URLSearchParams()
    params.append('query', kw)
    return axios.get('https://api.chucknorris.io/jokes/search', { params })
  })

  const settled = (await Promise.allSettled(requests)) as Array<any>
  settled.map((promise, pos) => {
    const kw = keywords[pos]

    if (promise.status === 'fulfilled') {
      if (!cache.get(`raw_${kw}`)) {
        cache.set(`raw_${kw}`, { data: promise.value?.data })
      }
      const data: ChuckApiResponse = promise.value?.data
      if (data.total > 0) {
        const sorted = data.result.sort((a, b) => {
          return new Date(a.updated_at).getTime() / 1000 - new Date(b.updated_at).getTime() / 1000
        })

        // FIXME sometimes sorted is empty because promise.value is not there; something with setting the cache
        // too late (1am atm) to fix it. will look at it later
        let fact = ''
        if (sorted.length) {
          fact = sorted.pop().value
          result[kw] = fact
          cache.set(kw, fact)
        }
        return fact
      }
    }
    result[kw] = ''
    return ''
  })

  return Promise.resolve(result)
}

const facts: Module = (text: string, keywords: string[]): string => {
  const isEmpty = !keywords.every((word) => {
    return word.trim().length > 0
  })
  if (!text.trim() || keywords.length === 0 || isEmpty) {
    throw new ConfigurationError('Some of the required parameters are missing')
  }

  const chunks = text.split('\n')

  let max = -1
  let pos = -1
  chunks.forEach((chunk, idx) => {
    const iterator = chunk.matchAll(new RegExp(`(${keywords.join('|')})(?!-)`, 'igm'))
    const matches = [...iterator]

    if (matches.length && matches.length > max) {
      max = matches.length
      pos = idx
    }
  })

  if (max > -1 && pos > -1) {
    let paragraph = `${chunks[pos]}`
    keywords.forEach((kw) => {
      const fact = cache.get(kw)
      if (fact) {
        paragraph += `\n${fact}`
      }
    })
    chunks[pos] = paragraph
  }

  return chunks.join('\n')
}

export { facts, fetchFacts }
