import { Replace } from '@/interfaces'
import { ConfigurationError } from '@/utils/error'
import { ModuleReplace } from '@/interfaces/types'

export default ((text: string, keywords: Replace): string => {
  const isEmpty = !Object.keys(keywords).every((key: string) => {
    return key.length > 0
  })
  if (!text.trim() || !Object.keys(keywords).length || isEmpty) {
    throw new ConfigurationError('Some of the required parameters are missing')
  }

  const pattern = new RegExp(`(${Object.keys(keywords).join('|')})((?!-))`, 'igm')
  return text.replace(pattern, (match) => {
    return keywords[match] || match
  })
}) as ModuleReplace
