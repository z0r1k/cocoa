import { Replace, Module, ModuleReplace } from '@/interfaces'

type Callable = () => string

export function factory(cb: Module): Array<Callable>
export function factory(cb: ModuleReplace, payload: Replace): Array<Callable>
export function factory(cb: Module | ModuleReplace, payload?: Replace): Array<Callable> {
  const cases = ['', 'Hi, Jack!', 'Hi, Mike!']
  const defaultKeywords: string[] = ['Alice', '']

  return cases.map((text, idx) => {
    if (payload) {
      const key: string = Object.keys(payload)[idx]
      const keyword: Replace = payload[key] ? { [key]: payload[key] } : {}
      return () => (cb as ModuleReplace)(text, keyword)
    }
    const keyword: string[] = defaultKeywords[idx] ? [defaultKeywords[idx]] : []
    return () => (cb as Module)(text, keyword)
  })
}
