import { ConfigurationError } from '@/utils/error'
import { Alignment, Spacing } from '@/interfaces'
import { ModuleRender } from '@/interfaces/types'

const replace = (text: string, value: string): string => {
  return text.replace(/(\n)+/gim, value)
}

const space: ModuleRender = (text: string, keywords: number | Alignment | Spacing): string => {
  if (!text.trim() || typeof keywords !== 'string') {
    throw new ConfigurationError('Some of the required parameters are missing')
  }

  let res = text.replace('\\n', '\n')
  switch (keywords as Spacing) {
    case Spacing.Single:
      res = replace(res, '\n')
      break
    case Spacing.Double:
      res = replace(res, '\n\n')
      break
    default:
      res += ''
  }
  return res
}

export default space
