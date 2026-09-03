/**
 * German résumé content — a fully independent translation of `resume.en.ts`,
 * not a derived/merged view. Edit this file directly for German-specific
 * wording; non-text fields (dates, logos, links, stack/skill names) are
 * repeated here on purpose so each language file stays self-contained.
 *
 * Machine-translated as a starting point — please review for tone/accuracy
 * before publishing.
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

export const resumeDe = {
  name: 'Liam Gleeson',
  title: 'Softwareentwickler',
  location: 'Zürich, Schweiz',
  email: 'liam@gleeson.ch',
  phone: '',
  photo: '/portrait.jpeg',
  links: {
    linkedin: 'https://www.linkedin.com/in/liam-gleeson-57208613a/',
    website: '',
  },

  summary:
    'Softwareentwickler mit Fokus auf zuverlässige, durchdachte Produkte — von Backend-Diensten ' +
    'bis zu den Schnittstellen, die Menschen täglich nutzen.',

  about: {
    paragraphs: [
      'Ich bin Softwareentwickler mit Sitz in Zürich und arbeite aktuell bei Sunrise Communications, ' +
        'wo ich an zuverlässigen Backend-Systemen und der Cloud-Infrastruktur für Kundinnen und Kunden ' +
        'in der ganzen Schweiz mitarbeite.',
      'In meiner Freizeit trifft man mich im Fitnessstudio, beim Joggen, beim Gitarrespielen oder beim Wandern.',
    ],
    facts: [
      { label: 'Fokus', value: 'Softwareentwicklung' },
      { label: 'Aktuell', value: 'Junior Software Engineer @Sunrise' },
      { label: 'Standort', value: 'Zürich, Schweiz' },
      { label: 'Freizeit', value: 'Laufen, Fitness, Gitarre und Wandern' },
    ] satisfies Fact[],
  },

  experience: [
    {
      role: 'Junior Software Engineer',
      company: 'Sunrise Communications AG',
      companyUrl: 'https://www.sunrise.ch/de/home',
      logo: '/sunrise_logo.svg',
      location: 'Zürich, Schweiz',
      start: 'August 2025',
      end: 'Heute',
      highlights: [
        'Entwicklung einer Microservice-Architektur mit Fokus auf Backend-Services und Cloud-Lösungen',
        'Aufbau und Pflege von CI/CD-Pipelines und automatisierten Deployment-Prozessen',
        'Arbeit über den gesamten Entwicklungszyklus hinweg — von Coding und Testing bis zum Cloud-Deployment',
        'Mitwirkung bei der agilen Planung, dem Ticket-Refinement und der Zusammenarbeit im Team',
      ],
      stack: ['Python', 'FastAPI', 'GraphQL', 'Redis', 'RabbitMQ', 'AWS', 'Google Cloud', 'Kubernetes', 'MongoDB'],
    },
    {
      role: 'Rekrutenschule',
      company: 'Schweizer Armee',
      companyUrl: 'https://www.vtg.admin.ch/de',
      logo: '/swiss_army_logo.svg',
      location: 'St. Gallen, Schweiz',
      start: 'Januar 2026',
      end: 'Mai 2026',
      highlights: [
        'Disziplin, Belastbarkeit und Teamfähigkeit gestärkt',
        'Ausbildung in taktischen Einsätzen, körperlicher Fitness und militärischen Abläufen',
        'Effektives Arbeiten unter Druck und in anspruchsvollen Situationen',
      ],
      stack: ['Teamfähigkeit', 'Anpassungsfähigkeit', 'Disziplin'],
    },
    {
      role: 'Lehre Applikationsentwicklung',
      company: 'Sunrise Communications AG',
      companyUrl: 'https://www.sunrise.ch/de/home',
      logo: '/sunrise_logo.svg',
      location: 'Zürich, Schweiz',
      start: 'August 2021',
      end: 'August 2025',
      highlights: [
        '1. Basislehrjahr in der Softwareentwicklung abgeschlossen',
        'Rotation durch verschiedene Abteilungen mit Einblick in unterschiedliche Technologien und IT-Bereiche',
        'Arbeit in den Bereichen Frontend, Backend und Full-Stack-Entwicklung',
        'Praktische Erfahrung mit verschiedenen Entwicklungsumgebungen und Projekten gesammelt',
      ],
      stack: ['Python', 'PostgreSQL', 'Java', 'PostgreSQL', 'React', 'Flask', 'Linux', 'Angular'],
    },
  ] satisfies Experience[],

  projects: [
    {
      name: 'Yallo TV',
      description: 'Freemium-TV-Plattform für den Internetanbieter yallo.',
      url: 'https://www.yallo.tv/',
      image: '/yallo_preview.jpg',
      stack: ['Python', 'FastAPI', 'RabbitMQ', 'AWS', 'Google Cloud', 'Kubernetes', 'MongoDB'],
    },
  ] satisfies Project[],

  skills: [
    { label: 'Programmierung', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'Rust'] },
    { label: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'Angular'] },
    { label: 'Backend', items: ['Node.js', 'FastAPI', 'GraphQL', 'Redis', 'PostgreSQL', 'Bootstrap', 'Axum', 'MongoDB', 'MySQL', 'Kubernetes'] },
    { label: 'Tools', items: ['Git', 'Docker', 'CI/CD', 'Bitbucket', 'Jira'] },
    { label: 'Soft Skills', items: ['Kommunikation', 'Teamfähigkeit', 'Problemlösung', 'Anpassungsfähigkeit', 'Führungskompetenz'] },
  ] satisfies SkillGroup[],

  languages: [
    { name: 'Deutsch', level: 'Native' },
    { name: 'Englisch', level: 'Native' },
    { name: 'Portugiesisch', level: 'Basic' },
  ] satisfies Language[],

  certifications: [
    {
      name: 'Build a Secure Google Cloud Network Skill Badge',
      issuer: 'Google',
      date: 'Juli 2025',
      url: 'https://www.credly.com/badges/8eaf391d-150a-4ca9-bd11-a2ad798b9834',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Implement Cloud Security Fundamentals on Google Cloud Skill Badge',
      issuer: 'Google',
      date: 'Juli 2025',
      url: 'https://www.credly.com/badges/e1681445-ffbc-42ec-b41f-3009a675ca70',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Set Up an App Dev Environment on Google Cloud Skill Badge',
      issuer: 'Google',
      date: 'Juli 2025',
      url: 'https://www.credly.com/badges/13827a27-4237-4579-bddc-6b230b8c837c',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Implement Load Balancing on Compute Engine Skill Badge',
      issuer: 'Google',
      date: 'Juli 2025',
      url: 'https://www.credly.com/badges/df99dd1c-be87-4530-b843-775093f7892d',
      badge: '/google_icon.jpeg',
    },
    {
      name: 'Google Cloud Fundamentals: Core Infrastructure',
      issuer: 'Google',
      date: 'Juli 2025',
      url: '',
      badge: '/google_icon.jpeg',
    },
  ] satisfies Certification[],

  education: [
    {
      degree: 'Eidgenössisches Fähigkeitszeugnis Informatik – Applikationsentwicklung',
      school: 'BBW Berufbildungsschule Winterthur',
      logo: '/bbw_logo.svg',
      location: 'Winterthur, Schweiz',
      start: 'August 2021',
      end: 'August 2025',
      detail: '',
      grade: '5.4 / 6.0',
    },
  ] satisfies Education[],
} satisfies Resume
