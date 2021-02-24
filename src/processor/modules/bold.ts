import { Module } from '@/interfaces/types'
import wrap from './common'

const bold: Module = (text: string, keywords: string[]): string => {
  return wrap(text, keywords, '**')
}

export default bold
