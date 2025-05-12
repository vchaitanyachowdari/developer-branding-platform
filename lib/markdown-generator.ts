import type { UserProfile } from "@/types/profile"
import { templates } from "./templates"
import { themes } from "./themes"
import { skillIcons, skillWebsites } from "./skills-data"

// Define skillCategories here or import it from a file
const skillCategories: { [key: string]: { title: string; skills: string[] } } = {
  frontend: {
    title: "Frontend",
    skills: ["HTML", "CSS", "JavaScript", "React", "Vue.js", "Angular"],
  },
  backend: {
    title: "Backend",
    skills: ["Node.js", "Python", "Java", "Go", "Ruby", "PHP"],
  },
  database: {
    title: "Database",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"],
  },
  devops: {
    title: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Azure", "GCP"],
  },
  mobile: {
    title: "Mobile",
    skills: ["Android", "iOS", "React Native", "Flutter"],
  },
}

export function generateMarkdown(profile: UserProfile): string {
  let markdown = ""

  // Get the selected template and theme
  const template = templates.find((t) => t.id === profile.template) || templates[0]
  const theme = themes.find((t) => t.id === profile.theme) || themes[0]

  // Apply template sections in the correct order
  const orderedSections = template.sections.filter(
    (section) => profile.enabledComponents[section as keyof typeof profile.enabledComponents],
  )

  // Header
  if (orderedSections.includes("header")) {
    // Title order based on preference
    if (profile.displayOptions.showTitleFirst && profile.title) {
      markdown += `# ${profile.title}\n\n`
      if (profile.name) {
        markdown += `## Hi there 👋, I'm ${profile.name}\n\n`
      }
    } else {
      markdown += `# Hi there 👋, I'm ${profile.name || "[Your Name]"}\n`
      if (profile.title) {
        markdown += `## ${profile.title}\n`
      }
      markdown += "\n"
    }

    // GitHub Badge
    if (profile.displayOptions.showGitHubBadge && profile.github) {
      markdown += `[![GitHub followers](https://img.shields.io/github/followers/${profile.github}?logo=GitHub&style=for-the-badge)](https://github.com/${profile.github})\n\n`
    }

    // Visitors Badge
    if (profile.displayOptions.showVisitorsBadge && profile.github) {
      markdown += `![Profile views](https://komarev.com/ghpvc/?username=${profile.github}&style=for-the-badge)\n\n`
    }
  }

  // About Me
  if (orderedSections.includes("about")) {
    markdown += "## About Me\n\n"

    if (profile.bio) {
      markdown += `${profile.bio}\n\n`
    } else {
      // Use template bio if available
      const bioTemplate = template.defaultContent.bioTemplate
        .replace("{title}", profile.title || "developer")
        .replace("{skills}", profile.skills.slice(0, 3).join(", ") || "various technologies")

      markdown += `${bioTemplate}\n\n`
    }

    // Additional info bullets
    const additionalInfoItems = []

    if (profile.additionalInfo.currentLearning.length > 0) {
      additionalInfoItems.push(`- 🌱 I'm currently learning ${profile.additionalInfo.currentLearning.join(", ")}\n`)
    }

    if (profile.additionalInfo.collaborateOn) {
      additionalInfoItems.push(`- 👯 I'm looking to collaborate on ${profile.additionalInfo.collaborateOn}\n`)
    }

    if (profile.additionalInfo.helpWith) {
      additionalInfoItems.push(`- 🤔 I'm looking for help with ${profile.additionalInfo.helpWith}\n`)
    }

    if (profile.additionalInfo.askMeAbout.length > 0) {
      additionalInfoItems.push(`- 💬 Ask me about ${profile.additionalInfo.askMeAbout.join(", ")}\n`)
    }

    if (profile.additionalInfo.funFact) {
      additionalInfoItems.push(`- ⚡ Fun fact: ${profile.additionalInfo.funFact}\n`)
    }

    if (profile.location) {
      additionalInfoItems.push(`- 📍 Based in ${profile.location}\n`)
    }

    if (profile.portfolio) {
      additionalInfoItems.push(
        `- 🌐 Check out my portfolio at [${profile.portfolio.replace(/^https?:\/\//, "")}](${profile.portfolio})\n`,
      )
    }

    if (profile.additionalInfo.pronouns) {
      additionalInfoItems.push(`- 😄 Pronouns: ${profile.additionalInfo.pronouns}\n`)
    }

    if (additionalInfoItems.length > 0) {
      markdown += additionalInfoItems.join("")
      markdown += "\n"
    }

    // Work Experience
    if (profile.displayOptions.showWorkExperience && profile.work.company) {
      markdown += "### Work Experience\n\n"
      markdown += `**${profile.work.position || "Developer"}** at [${profile.work.company}](${
        profile.work.website || "#"
      })\n`
      if (profile.work.startDate) {
        const startDate = new Date(profile.work.startDate + "-01").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
        let dateRange = `${startDate} - `
        if (profile.work.current) {
          dateRange += "Present"
        } else if (profile.work.endDate) {
          const endDate = new Date(profile.work.endDate + "-01").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })
          dateRange += endDate
        }
        markdown += `\n${dateRange}\n\n`
      }
    }

    // Education
    if (profile.displayOptions.showEducation && profile.education.institution) {
      markdown += "### Education\n\n"
      markdown += `**${profile.education.degree || "Degree"}** in ${profile.education.field || "Field"}\n`
      markdown += `${profile.education.institution}\n`
      if (profile.education.startDate) {
        const startDate = new Date(profile.education.startDate + "-01").toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })
        let dateRange = `${startDate} - `
        if (profile.education.current) {
          dateRange += "Present"
        } else if (profile.education.endDate) {
          const endDate = new Date(profile.education.endDate + "-01").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })
          dateRange += endDate
        }
        markdown += `\n${dateRange}\n\n`
      }
    }
  }

  // Skills
  if (orderedSections.includes("skills")) {
    markdown += "## Skills & Technologies\n\n"

    // Get selected skills
    const selectedSkillNames = Object.keys(profile.selectedSkills).filter(
      (skillName) => profile.selectedSkills[skillName],
    )

    if (selectedSkillNames.length > 0) {
      // Apply different skill layouts based on customization
      switch (profile.customization.skillsLayout) {
        case "grid":
          markdown += '<div align="center">\n\n'
          selectedSkillNames.forEach((skill) => {
            if (skillIcons[skill] && skillWebsites[skill]) {
              markdown += `<a href="${skillWebsites[skill]}" target="_blank" rel="noreferrer">`
              markdown += `<img src="${skillIcons[skill]}" alt="${skill}" width="40" height="40"/>`
              markdown += `</a>&nbsp;&nbsp;`
            }
          })
          markdown += "\n\n</div>\n\n"
          break

        case "badges":
          selectedSkillNames.forEach((skill) => {
            if (skillWebsites[skill]) {
              markdown += `[![${skill}](https://img.shields.io/badge/-${skill}-${theme.colors.primary.replace("#", "")}?style=for-the-badge&logo=${skill}&logoColor=white)](${skillWebsites[skill]}) `
            }
          })
          markdown += "\n\n"
          break

        case "table":
          markdown += "| Skill | Category |\n| --- | --- |\n"
          selectedSkillNames.forEach((skill) => {
            const category =
              Object.entries(skillCategories).find(([_, { skills }]) => skills.includes(skill))?.[0] || ""

            const categoryTitle = skillCategories[category]?.title || ""

            markdown += `| [${skill}](${skillWebsites[skill] || "#"}) | ${categoryTitle} |\n`
          })
          markdown += "\n"
          break

        default:
          markdown += '<div align="left">\n\n'
          selectedSkillNames.forEach((skill) => {
            if (skillIcons[skill] && skillWebsites[skill]) {
              markdown += `<a href="${skillWebsites[skill]}" target="_blank" rel="noreferrer">`
              markdown += `<img src="${skillIcons[skill]}" alt="${skill}" width="40" height="40"/>`
              markdown += `</a>&nbsp;&nbsp;`
            }
          })
          markdown += "\n\n</div>\n\n"
      }
    } else if (profile.skills.length > 0) {
      // Fallback to manually entered skills if no skills are selected
      switch (profile.customization.skillsLayout) {
        case "grid":
          const skillsGrid = profile.skills
            .map((skill) => {
              const lowerSkill = skill.toLowerCase()
              return `<img src="https://img.shields.io/badge/-${skill}-3a464b?style=flat-square&logo=${lowerSkill}" alt="${skill}" />`
            })
            .join(" ")
          markdown += `<div align="center">\n\n${skillsGrid}\n\n</div>\n\n`
          break

        case "inline":
          markdown += `\`${profile.skills.join("` • `")}\`\n\n`
          break

        case "badges":
          const skillsBadges = profile.skills
            .map((skill) => {
              const lowerSkill = skill.toLowerCase()
              return `![${skill}](https://img.shields.io/badge/-${skill}-${theme.colors.primary.replace("#", "")}?style=for-the-badge&logo=${lowerSkill}&logoColor=white)`
            })
            .join(" ")
          markdown += `${skillsBadges}\n\n`
          break

        case "rating":
          markdown += "| Skill | Proficiency |\n| --- | --- |\n"
          profile.skills.forEach((skill) => {
            const rating =
              "★".repeat(Math.floor(Math.random() * 3) + 3) + "☆".repeat(5 - (Math.floor(Math.random() * 3) + 3))
            markdown += `| ${skill} | ${rating} |\n`
          })
          markdown += "\n"
          break

        case "neon":
          const neonSkills = profile.skills
            .map((skill) => {
              return `<span style="color:${theme.colors.primary};text-shadow:0 0 10px ${theme.colors.primary};">${skill}</span>`
            })
            .join(" • ")
          markdown += `<div align="center">\n\n${neonSkills}\n\n</div>\n\n`
          break

        default:
          const defaultSkills = profile.skills.join(", ")
          markdown += `${defaultSkills}\n\n`
      }
    } else {
      markdown += "_No skills specified_\n\n"
    }
  }

  // GitHub Stats
  if (orderedSections.includes("stats") && profile.github) {
    markdown += "## GitHub Stats\n\n"
    markdown += `<img src="https://github-readme-stats.vercel.app/api?username=${profile.github}&show_icons=true&count_private=true&theme=${profile.customization.statsTheme}" alt="GitHub Stats" />\n\n`
  }

  // GitHub Streak
  if (orderedSections.includes("streak") && profile.github) {
    markdown += `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.github}&theme=${profile.customization.statsTheme}" alt="GitHub Streak" />\n\n`
  }

  // Top Languages
  if (orderedSections.includes("topLangs") && profile.github) {
    markdown += `<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.github}&layout=compact&theme=${profile.customization.statsTheme}" alt="Top Languages" />\n\n`
  }

  // GitHub Trophies
  if (orderedSections.includes("trophies") && profile.github) {
    markdown += "## GitHub Trophies\n\n"
    markdown += `[![trophy](https://github-profile-trophy.vercel.app/?username=${profile.github}&theme=${profile.customization.statsTheme}&margin-w=15&margin-h=15)](https://github.com/ryo-ma/github-profile-trophy)\n\n`
  }

  // Activity Graph
  if (orderedSections.includes("activity") && profile.github) {
    markdown += "## Activity Graph\n\n"
    markdown += `[![${profile.name || profile.github}'s github activity graph](https://github-readme-activity-graph.vercel.app/graph?username=${profile.github}&theme=${profile.customization.statsTheme})](https://github.com/${profile.github})\n\n`
  }

  // WakaTime Stats
  if (orderedSections.includes("wakatime") && profile.github) {
    markdown += "## WakaTime Stats\n\n"
    markdown += `<img src="https://github-readme-stats.vercel.app/api/wakatime?username=${profile.github}&theme=${profile.customization.statsTheme}" alt="WakaTime Stats" />\n\n`
  }

  // Blog Posts
  if (orderedSections.includes("blog") && (profile.devto || profile.medium)) {
    markdown += "## Latest Blog Posts\n\n"

    if (profile.devto) {
      markdown += "<!-- BLOG-POST-LIST:START -->\n"
      markdown += "<!-- BLOG-POST-LIST:END -->\n\n"
      markdown += "➡️ [more blog posts...](https://dev.to/" + profile.devto + ")\n\n"
    } else if (profile.medium) {
      markdown += "<!-- BLOG-POST-LIST:START -->\n"
      markdown += "<!-- BLOG-POST-LIST:END -->\n\n"
      markdown += "➡️ [more blog posts...](https://medium.com/@" + profile.medium + ")\n\n"
    }
  }

  // Social Links
  if (orderedSections.includes("social") && profile.displayOptions.showSocialIcons) {
    markdown += "## Connect With Me\n\n"

    const socialLinks = []

    // Main social links
    if (profile.github) {
      socialLinks.push(
        `<a href="https://github.com/${profile.github}" target="_blank"><img src="https://img.shields.io/badge/github-%2324292e.svg?&style=for-the-badge&logo=github&logoColor=white" alt="github" /></a>`,
      )
    }

    if (profile.twitter) {
      socialLinks.push(
        `<a href="https://twitter.com/${profile.twitter}" target="_blank"><img src="https://img.shields.io/badge/twitter-%2300acee.svg?&style=for-the-badge&logo=twitter&logoColor=white" alt="twitter" /></a>`,
      )
    }

    if (profile.linkedin) {
      socialLinks.push(
        `<a href="https://linkedin.com/in/${profile.linkedin}" target="_blank"><img src="https://img.shields.io/badge/linkedin-%231E77B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" alt="linkedin" /></a>`,
      )
    }

    if (profile.devto) {
      socialLinks.push(
        `<a href="https://dev.to/${profile.devto}" target="_blank"><img src="https://img.shields.io/badge/dev.to-%2308090A.svg?&style=for-the-badge&logo=dev.to&logoColor=white" alt="dev.to" /></a>`,
      )
    }

    if (profile.medium) {
      socialLinks.push(
        `<a href="https://medium.com/@${profile.medium}" target="_blank"><img src="https://img.shields.io/badge/medium-%23292929.svg?&style=for-the-badge&logo=medium&logoColor=white" alt="medium" /></a>`,
      )
    }

    // Additional social links
    if (profile.socialLinks.codepen) {
      socialLinks.push(
        `<a href="https://codepen.io/${profile.socialLinks.codepen}" target="_blank"><img src="https://img.shields.io/badge/codepen-%23000000.svg?&style=for-the-badge&logo=codepen&logoColor=white" alt="codepen" /></a>`,
      )
    }

    if (profile.socialLinks.stackoverflow) {
      socialLinks.push(
        `<a href="https://stackoverflow.com/users/${profile.socialLinks.stackoverflow}" target="_blank"><img src="https://img.shields.io/badge/stackoverflow-%23F28032.svg?&style=for-the-badge&logo=stackoverflow&logoColor=white" alt="stackoverflow" /></a>`,
      )
    }

    if (profile.socialLinks.instagram) {
      socialLinks.push(
        `<a href="https://instagram.com/${profile.socialLinks.instagram}" target="_blank"><img src="https://img.shields.io/badge/instagram-%23E4405F.svg?&style=for-the-badge&logo=instagram&logoColor=white" alt="instagram" /></a>`,
      )
    }

    if (profile.socialLinks.dribbble) {
      socialLinks.push(
        `<a href="https://dribbble.com/${profile.socialLinks.dribbble}" target="_blank"><img src="https://img.shields.io/badge/dribbble-%23EA4C89.svg?&style=for-the-badge&logo=dribbble&logoColor=white" alt="dribbble" /></a>`,
      )
    }

    if (profile.socialLinks.behance) {
      socialLinks.push(
        `<a href="https://behance.net/${profile.socialLinks.behance}" target="_blank"><img src="https://img.shields.io/badge/behance-%231769FF.svg?&style=for-the-badge&logo=behance&logoColor=white" alt="behance" /></a>`,
      )
    }

    if (profile.socialLinks.hashnode) {
      socialLinks.push(
        `<a href="https://hashnode.com/@${profile.socialLinks.hashnode}" target="_blank"><img src="https://img.shields.io/badge/hashnode-%232962FF.svg?&style=for-the-badge&logo=hashnode&logoColor=white" alt="hashnode" /></a>`,
      )
    }

    if (profile.socialLinks.youtube) {
      socialLinks.push(
        `<a href="https://youtube.com/c/${profile.socialLinks.youtube}" target="_blank"><img src="https://img.shields.io/badge/youtube-%23FF0000.svg?&style=for-the-badge&logo=youtube&logoColor=white" alt="youtube" /></a>`,
      )
    }

    // Competitive programming profiles
    const competitiveProgramming = []

    if (profile.socialLinks.leetcode) {
      competitiveProgramming.push(
        `<a href="https://leetcode.com/${profile.socialLinks.leetcode}" target="_blank"><img src="https://img.shields.io/badge/leetcode-%23FFA116.svg?&style=for-the-badge&logo=leetcode&logoColor=white" alt="leetcode" /></a>`,
      )
    }

    if (profile.socialLinks.hackerrank) {
      competitiveProgramming.push(
        `<a href="https://hackerrank.com/${profile.socialLinks.hackerrank}" target="_blank"><img src="https://img.shields.io/badge/hackerrank-%232EC866.svg?&style=for-the-badge&logo=hackerrank&logoColor=white" alt="hackerrank" /></a>`,
      )
    }

    if (profile.socialLinks.codechef) {
      competitiveProgramming.push(
        `<a href="https://codechef.com/users/${profile.socialLinks.codechef}" target="_blank"><img src="https://img.shields.io/badge/codechef-%235B4638.svg?&style=for-the-badge&logo=codechef&logoColor=white" alt="codechef" /></a>`,
      )
    }

    if (profile.socialLinks.codeforces) {
      competitiveProgramming.push(
        `<a href="https://codeforces.com/profile/${profile.socialLinks.codeforces}" target="_blank"><img src="https://img.shields.io/badge/codeforces-%231F8ACB.svg?&style=for-the-badge&logo=codeforces&logoColor=white" alt="codeforces" /></a>`,
      )
    }

    if (profile.socialLinks.topcoder) {
      competitiveProgramming.push(
        `<a href="https://topcoder.com/members/${profile.socialLinks.topcoder}" target="_blank"><img src="https://img.shields.io/badge/topcoder-%2305ACF0.svg?&style=for-the-badge&logo=topcoder&logoColor=white" alt="topcoder" /></a>`,
      )
    }

    if (profile.socialLinks.hackerearth) {
      competitiveProgramming.push(
        `<a href="https://hackerearth.com/@${profile.socialLinks.hackerearth}" target="_blank"><img src="https://img.shields.io/badge/hackerearth-%232C3454.svg?&style=for-the-badge&logo=hackerearth&logoColor=white" alt="hackerearth" /></a>`,
      )
    }

    if (profile.socialLinks.geeksforgeeks) {
      competitiveProgramming.push(
        `<a href="https://geeksforgeeks.org/user/${profile.socialLinks.geeksforgeeks}" target="_blank"><img src="https://img.shields.io/badge/geeksforgeeks-%230F9D58.svg?&style=for-the-badge&logo=geeksforgeeks&logoColor=white" alt="geeksforgeeks" /></a>`,
      )
    }

    // Add social links to markdown
    if (socialLinks.length > 0) {
      markdown += socialLinks.join(" ") + "\n\n"
    }

    // Add competitive programming links if any
    if (competitiveProgramming.length > 0) {
      markdown += "### Competitive Programming\n\n"
      markdown += competitiveProgramming.join(" ") + "\n\n"
    }
  }

  // Support section
  if (
    orderedSections.includes("support") &&
    profile.displayOptions.showSupportSection &&
    (profile.supportLinks.buymeacoffee ||
      profile.supportLinks.kofi ||
      profile.supportLinks.patreon ||
      profile.supportLinks.paypal)
  ) {
    markdown += "## Support Me\n\n"
    const supportLinks = []

    if (profile.supportLinks.buymeacoffee) {
      supportLinks.push(
        `<a href="https://buymeacoffee.com/${profile.supportLinks.buymeacoffee}" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>`,
      )
    }

    if (profile.supportLinks.kofi) {
      supportLinks.push(
        `<a href="https://ko-fi.com/${profile.supportLinks.kofi}" target="_blank"><img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" alt="Ko-fi" style="height: 50px !important;width: 217px !important;" ></a>`,
      )
    }

    if (profile.supportLinks.patreon) {
      supportLinks.push(
        `<a href="https://patreon.com/${profile.supportLinks.patreon}" target="_blank"><img src="https://img.shields.io/badge/Patreon-F96854?style=for-the-badge&logo=patreon&logoColor=white" alt="Patreon" /></a>`,
      )
    }

    if (profile.supportLinks.paypal) {
      supportLinks.push(
        `<a href="https://paypal.me/${profile.supportLinks.paypal}" target="_blank"><img src="https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal" /></a>`,
      )
    }

    markdown += supportLinks.join(" ") + "\n\n"
  }

  // Visitors Counter
  if (orderedSections.includes("visitors") && profile.github && !profile.displayOptions.showVisitorsBadge) {
    markdown += "## Visitors\n\n"
    markdown += `<img src="https://visitor-badge.glitch.me/badge?page_id=${profile.github}.${profile.github}" alt="visitors" />\n`
  }

  // Add template-specific footer if needed
  if (template.id === "cyberpunk") {
    markdown += '\n\n<div align="center">\n\n'
    markdown += "⚡ Powered by code and caffeine ⚡\n\n"
    markdown += "</div>\n"
  } else if (template.id === "opensource") {
    markdown += "\n\n---\n\n"
    markdown += "Happy coding! 💻\n"
  }

  return markdown
}
