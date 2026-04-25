import shared from './cv_data/shared.json';
import es from './cv_data/es.json';
import ca from './cv_data/ca.json';
import en from './cv_data/en.json';

const languages = ['es', 'ca', 'en'];
const dataByLang = { es, ca, en };

export const DATA = {
  ...shared,
  skills: {
    ...shared.skills,
    leadership: {
      es: es.skills.leadership,
      ca: ca.skills.leadership,
      en: en.skills.leadership
    }
  },
  certificates: es.certificates.map((_, i) => ({
    id: shared.certificates[i].id,
    title: shared.certificates[i].title,
    issuer: shared.certificates[i].issuer,
    date: shared.certificates[i].date,
    file: shared.certificates[i].file,
    description: {
      es: es.certificates[i].description,
      ca: ca.certificates[i].description,
      en: en.certificates[i].description
    }
  })),
  profile: {
    es: es.profile,
    ca: ca.profile,
    en: en.profile
  },
  experience: es.experience.map((_, i) => ({
    id: `job-${es.experience[i].company.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 10)}-${i}`,
    company: es.experience[i].company,
    date: es.experience[i].date,
    role: {
      es: es.experience[i].role,
      ca: ca.experience[i].role,
      en: en.experience[i].role
    },
    desc: {
      es: es.experience[i].desc,
      ca: ca.experience[i].desc,
      en: en.experience[i].desc
    },
    tags: es.experience[i].tags,
    points: {
      es: es.experience[i].points,
      ca: ca.experience[i].points,
      en: en.experience[i].points
    },
    subItems: es.experience[i].subItems ? es.experience[i].subItems.map((_, siIdx) => ({
      id: es.experience[i].subItems[siIdx].id,
      title: {
        es: es.experience[i].subItems?.[siIdx]?.title || '',
        ca: ca.experience[i].subItems?.[siIdx]?.title || '',
        en: en.experience[i].subItems?.[siIdx]?.title || ''
      },
      desc: {
        es: es.experience[i].subItems?.[siIdx]?.desc || '',
        ca: ca.experience[i].subItems?.[siIdx]?.desc || '',
        en: en.experience[i].subItems?.[siIdx]?.desc || ''
      },
      points: {
        es: es.experience[i].subItems?.[siIdx]?.points || [],
        ca: ca.experience[i].subItems?.[siIdx]?.points || [],
        en: en.experience[i].subItems?.[siIdx]?.points || []
      }
    })) : undefined
  })),
  education: es.education.map((_, i) => ({
    id: es.education[i].id,
    school: es.education[i].school,
    date: es.education[i].date,
    grade: {
      es: es.education[i].grade,
      ca: ca.education[i].grade,
      en: en.education[i].grade
    },
    category: {
      es: es.education[i].category,
      ca: ca.education[i].category,
      en: en.education[i].category
    },
    title: {
      es: es.education[i].title,
      ca: ca.education[i].title,
      en: en.education[i].title
    },
    explanation: {
      es: es.education[i].explanation,
      ca: ca.education[i].explanation,
      en: en.education[i].explanation
    },
    tfg: es.education[i].tfg ? {
      grade: es.education[i].tfg.grade,
      file: es.education[i].tfg.file,
      title: {
        es: es.education[i].tfg.title,
        ca: ca.education[i].tfg.title,
        en: en.education[i].tfg.title
      },
      description: {
        es: es.education[i].tfg.description,
        ca: ca.education[i].tfg.description,
        en: en.education[i].tfg.description
      }
    } : undefined
  })),
  projects: es.projects.map((_, i) => ({
    id: es.projects[i].id,
    date: es.projects[i].date,
    tags: es.projects[i].tags,
    techStack: es.projects[i].techStack,
    links: es.projects[i].links,
    name: {
      es: es.projects[i].name,
      ca: ca.projects[i].name,
      en: en.projects[i].name
    },
    desc: {
      es: es.projects[i].desc,
      ca: ca.projects[i].desc,
      en: en.projects[i].desc
    },
    points: {
      es: es.projects[i].points,
      ca: ca.projects[i].points,
      en: en.projects[i].points
    },
    security: {
      es: es.projects[i].security,
      ca: ca.projects[i].security,
      en: en.projects[i].security
    }
  })),
  volunteering: es.volunteering.map((_, i) => ({
    location: es.volunteering[i].location,
    date: es.volunteering[i].date,
    org: es.volunteering[i].org,
    desc: {
      es: es.volunteering[i].desc,
      ca: ca.volunteering[i].desc,
      en: en.volunteering[i].desc
    }
  }))
};
