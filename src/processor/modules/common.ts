import { ConfigurationError } from '@/utils/error'

const wrap = (text: string, keywords: string[], wrap = ''): string => {
  const isEmpty = !keywords.every((word) => {
    return word.trim().length > 0
  })
  if (!text.trim() || keywords.length === 0 || isEmpty) {
    throw new ConfigurationError('Some of the required parameters are missing')
  }

  const pattern = new RegExp(`(${keywords.join('|')})((?!-))`, 'igm')
  return text.replace(pattern, `${wrap}$1${wrap}`)
}

export default wrap
