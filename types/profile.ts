export interface UserProfile {
  name: string
  title: string
  bio: string
  location: string
  portfolio: string
  github: string
  twitter: string
  linkedin: string
  devto: string
  medium: string
  wakatime: string
  skills: string[]
  enabledComponents: {
    header: boolean
    about: boolean
    skills: boolean
    stats: boolean
    streak: boolean
    topLangs: boolean
    wakatime: boolean
    blog: boolean
    social: boolean
    visitors: boolean
    support: boolean
    trophies: boolean
    activity: boolean
    addons: boolean
  }
  template: string
  theme: string
  customization: {
    fontFamily: string
    cardStyle: string
    iconSet: string
    statsTheme: string
    skillsLayout: string
  }
  work: {
    company: string
    position: string
    website: string
    startDate: string
    endDate: string
    current: boolean
  }
  education: {
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
  }
  additionalInfo: {
    currentLearning: string[]
    collaborateOn: string
    helpWith: string
    askMeAbout: string[]
    funFact: string
    pronouns: string
  }
  socialLinks: {
    codepen: string
    stackoverflow: string
    kaggle: string
    instagram: string
    dribbble: string
    behance: string
    hashnode: string
    youtube: string
    codechef: string
    hackerrank: string
    codeforces: string
    leetcode: string
    topcoder: string
    hackerearth: string
    geeksforgeeks: string
    discord: string
    rss: string
  }
  supportLinks: {
    buymeacoffee: string
    patreon: string
    kofi: string
    paypal: string
  }
  displayOptions: {
    showTitleFirst: boolean
    showVisitorsBadge: boolean
    showGitHubBadge: boolean
    showWorkExperience: boolean
    showEducation: boolean
    showBlogPosts: boolean
    showSkillIcons: boolean
    showSocialIcons: boolean
    showSupportSection: boolean
    showTrophies: boolean
    showActivityGraph: boolean
  }
}
