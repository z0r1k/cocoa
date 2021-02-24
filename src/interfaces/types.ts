import { Alignment, Replace, Spacing } from './markdown'

export type Module = (text: string, keywords: string[]) => string
export type ModuleReplace = (text: string, keywords: Replace) => string
export type ModuleRender = (text: string, keywords: number | Alignment | Spacing) => string
