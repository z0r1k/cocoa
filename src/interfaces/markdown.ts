export enum Alignment {
  Left = 'left',
  Right = 'right',
  Center = 'center',
}

export enum Spacing {
  Single = 'single',
  Double = 'double',
}

export interface MarkdownConfig {
  width?: number
  alignment?: Alignment
  spacing?: Spacing
  bold?: string[]
  italic?: string[]
  replace?: Replace
  food_facts?: string[]
}

export interface Replace {
  [key: string]: string
}
