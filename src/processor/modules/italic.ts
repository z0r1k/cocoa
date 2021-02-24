import { Module } from '@/interfaces/types'
import wrap from './common'

const italic: Module = (text: string, keywords: string[]): string => {
  return wrap(text, keywords, '_')
}

export default italic
