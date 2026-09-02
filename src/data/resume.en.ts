/**
 * English résumé content. Edit this file — the web page (`/`) and the
 * generated PDF (`npm run pdf`) both read from it. See `resume.de.ts` for
 * the German version (kept as a fully separate, independently-editable copy).
 */
import type {
  Certification,
  Education,
  Experience,
  Fact,
  Language,
  Project,
  Resume,
  SkillGroup,
} from './types'

export const resumeEn = {
  name: 'Liam Gleeson',
  title: 'Software Engineer',
  location: 'Zürich, Switzerland',
  email: 'liam@gleeson.ch',
  phone: '', // TODO: optional, e.g. '+353 00 000 0000'
  // Left empty, a generated placeholder avatar is shown instead.
  photo: '/portrait.jpeg',
  links: {
    linkedin: 'https://www.linkedin.com/in/liam-gleeson-57208613a/',
    website: '', // TODO: optional personal site
  },

  summary:
    'Software engineer focused on building reliable, well-crafted products ' +
    'end to end — from backend services to the interfaces people use every day.',

  about: {
    paragraphs: [
      "I got into engineering because I like taking something messy and making it click — " +
        'whether that is an API, a data pipeline, or a gnarly bit of UI state.',
      'I care most about the boring-sounding stuff that actually matters: readable code, ' +
        'tests that catch real bugs, and shipping in small steps instead of big-bang releases.',
    ],
    facts: [
      { label: 'Focus', value: 'Software Engineering' },
      { label: 'Currently', value: 'Junior Software Engineer @Sunrise' },
      { label: 'Based in', value: 'Zürich, Switzerland' },
      { label: 'Outside work', value: 'Gym, Running and playing Guitar' },
    ] satisfies Fact[],
  },

  experience: [
    {
      role: 'Junior Software Engineer',
      company: 'Sunrise Communications AG',
      companyUrl: 'https://www.sunrise.ch/de/home',
      logo: '/sunrise_logo.svg',
      location: 'Zürich, Switzerland',
      start: 'August 2025',
      end: 'Present',
      highlights: [
        'Developing microservice architecture with a focus on backend services and cloud solutions',
        'Building and maintaining CI/CD pipelines and automated deployment processes',
        'Working across the full development lifecycle, from coding and testing to cloud deployment',
        'Participating in agile planning, ticket refinement and team collaboration',
      ],
      stack: ['Python', 'FastAPI', 'RabbitMQ', 'AWS', 'Google Cloud', 'Kubernetes', 'MongoDB'],
    },
    {
      role: 'Army Bootcamp',
      company: 'Swiss Armed Forces',
      companyUrl: 'https://www.vtg.admin.ch/en',
      logo: '/swiss_army_logo.svg',
      location: 'St. Gallen, Switzerland',
      start: 'January 2026',
      end: 'May 2026',
      highlights: [
        'Developed strong discipline, resilience and teamwork',
        'Trained in tactical operations, physical fitness and military procedures',
        'Worked effectively in high-pressure and challenging environments',
      ],
      stack: ['Teamwork', 'Adaptability', 'Discipline'],
    },
    {
      role: 'Apprentice Software Development',
      company: 'Sunrise Communications AG',
      companyUrl: 'https://www.sunrise.ch/de/home',
      logo: '/sunrise_logo.svg',
      location: 'Zürich, Switzerland',
      start: 'August 2021',
      end: 'August 2025',
      highlights: [
        'Completed 1st Basis-Lehrjahr in Software Development',
        'Rotated through different departments, gaining insight into various technologies and IT areas',
        'Worked across Frontend, Backend and Full-Stack Development',
        'Gained hands-on experience with different development environments and projects',
      ],
      stack: ['Python', 'PostgreSQL', 'Java', 'PostgreSQL', 'React', 'Flask', 'Linux', 'Angular'],
    },
  ] satisfies Experience[],

  projects: [
    {
      name: 'Yallo TV',
      description: 'Freemium TV platform for yallo internet provider.',
      url: 'https://www.yallo.tv/',
      image: '/yallo_preview.jpg',
      stack: ['Python', 'FastAPI', 'RabbitMQ', 'AWS', 'Google Cloud', 'Kubernetes', 'MongoDB'],
    },
  ] satisfies Project[],

  skills: [
    { label: 'Programming', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Rust'] },
    { label: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Angular'] },
    { label: 'Backend', items: ['Node.js', 'FastAPI', 'PostgreSQL', 'Axum', 'MongoDB', 'MySQL', 'Kubernetes'] },
    { label: 'Tools', items: ['Git', 'Docker', 'CI/CD', 'Bitbucket', 'Jira'] },
    { label: 'Soft Skills', items: ['Communication', 'Teamwork', 'Problem Solving', 'Adaptability', 'Leadership'] },
  ] satisfies SkillGroup[],

  languages: [
    { name: 'German', level: 'Native' },
    { name: 'English', level: 'Native' },
    { name: 'Portuguese', level: 'Basic' },
  ] satisfies Language[],

  certifications: [
    {
      name: 'Build a Secure Google Cloud Network Skill Badge',
      issuer: 'Google',
      date: 'July 2025',
      url: 'https://www.credly.com/badges/8eaf391d-150a-4ca9-bd11-a2ad798b9834',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Implement Cloud Security Fundamentals on Google Cloud Skill Badge',
      issuer: 'Google',
      date: 'July 2025',
      url: 'https://www.credly.com/badges/e1681445-ffbc-42ec-b41f-3009a675ca70',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Set Up an App Dev Environment on Google Cloud Skill Badge',
      issuer: 'Google',
      date: 'July 2025',
      url: 'https://www.credly.com/badges/13827a27-4237-4579-bddc-6b230b8c837c',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Implement Load Balancing on Compute Engine Skill Badge',
      issuer: 'Google',
      date: 'July 2025',
      url: 'https://www.credly.com/badges/df99dd1c-be87-4530-b843-775093f7892d',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Google Cloud Fundamentals: Core Infrastructure',
      issuer: 'Google',
      date: 'July 2025',
      url: '',
      badge: '/google_icon.jpeg',
    },
  ] satisfies Certification[],

  education: [
    {
      degree: 'Federal Diploma in Computer Science – Application Development',
      school: 'BBW Berufbildungsschule Winterthur',
      logo: '/bbw_logo.svg',
      location: 'Winterthur, Switzerland',
      start: 'August 2021',
      end: 'August 2025',
      detail: '',
      grade: '5.4 / 6.0',
    },
  ] satisfies Education[],
} satisfies Resume
