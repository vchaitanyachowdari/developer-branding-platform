export interface Template {
  id: string
  name: string
  description: string
  previewImage: string
  sections: string[]
  style: {
    theme: string
    fontFamily: string
    cardStyle: string
    iconSet: string
  }
  defaultContent: {
    bioTemplate: string
    skillsLayout: string
    statsTheme: string
  }
}
