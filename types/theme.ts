export interface Theme {
  id: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    accent: string
  }
  fontOptions: string[]
  cardStyles: string[]
}
