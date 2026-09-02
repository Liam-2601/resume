export interface Experience {
  role: string
  company: string
  companyUrl?: string
  // TODO: company logo, e.g. '/logos/acme.png'. Left empty, a monogram badge is shown instead.
  logo?: string
  location: string
  start: string
  end: string
  highlights: string[]
  stack?: string[]
}

export interface Education {
  degree: string
  school: string
  // TODO: institution logo, e.g. '/logos/university.png'.
  logo?: string
  location: string
  start: string
  end: string
  detail?: string
  // TODO: optional, e.g. '5.4 / 6.0' or 'First Class Honours'. Leave empty to hide.
  grade?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url?: string
  // TODO: credential badge image, e.g. '/badges/aws.png'.
  badge?: string
}

export interface Project {
  name: string
  description: string
  url?: string
  stack: string[]
  // TODO: project screenshot/cover image, e.g. '/projects/my-app.png'.
  image?: string
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Language {
  name: string
  level: 'Native' | 'Fluent' | 'Conversational' | 'Basic'
}

export interface Fact {
  label: string
  value: string
}

export interface Resume {
  name: string
  title: string
  location: string
  email: string
  phone: string
  photo: string
  links: {
    linkedin: string
    website: string
  }
  summary: string
  about: {
    paragraphs: string[]
    facts: Fact[]
  }
  experience: Experience[]
  projects: Project[]
  skills: SkillGroup[]
  languages: Language[]
  certifications: Certification[]
  education: Education[]
}
