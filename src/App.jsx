import React, { useState } from 'react'

const TRANSLATIONS = {
  es: {
    nav: {
      experience: 'Experiencia',
      projects: 'Proyectos',
      education: 'Formación',
      skills: 'Habilidades',
      certificates: 'Certificados',
      volunteering: 'Voluntariado',
      contact: 'Contacto'
    },
    hero: {
      subtitle: 'Ingeniero Informático y de Telecomunicación • Profesor Universitario • Data Scientist'
    },
    sections: {
      experience: 'Experiencia Profesional',
      projects: 'Proyectos de Ingeniería',
      education: 'Formación Académica',
      skills: 'Habilidades',
      languages: 'Idiomas',
      certificates: 'Certificados',
      volunteering: 'Voluntariado',
      contact: 'Contacto'
    },
    contact: {
      info: 'Información de contacto',
      social: 'Redes Profesionales'
    }
  },
  ca: {
    nav: {
      experience: 'Experiència',
      projects: 'Projectes',
      education: 'Formació',
      skills: 'Habilitats',
      certificates: 'Certificats',
      volunteering: 'Voluntariat',
      contact: 'Contacte'
    },
    hero: {
      subtitle: 'Enginyer Informàtic i de Telecomunicació • Professor Universitari • Data Scientist'
    },
    sections: {
      experience: 'Experiència Professional',
      projects: 'Projectes d\'Enginyeria',
      education: 'Formació Acadèmica',
      skills: 'Habilitats',
      languages: 'Idiomes',
      certificates: 'Certificats',
      volunteering: 'Voluntariat',
      contact: 'Contacte'
    },
    contact: {
      info: 'Informació de contacte',
      social: 'Xarxes Professionals'
    }
  },
  en: {
    nav: {
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      skills: 'Skills',
      certificates: 'Certificates',
      volunteering: 'Volunteering',
      contact: 'Contact'
    },
    hero: {
      subtitle: 'Computer & Telecom Engineer • University Professor • Data Scientist'
    },
    sections: {
      experience: 'Professional Experience',
      projects: 'Engineering Projects',
      education: 'Academic Background',
      skills: 'Skills',
      languages: 'Languages',
      certificates: 'Certificates',
      volunteering: 'Volunteering',
      contact: 'Contact'
    },
    contact: {
      info: 'Contact Information',
      social: 'Professional Networks'
    }
  }
}

const DATA = {
  name: "Joan Mata Pàrraga",
  email: "joanmata.parraga@gmail.com",
  phone: "+34 647 267 153",
  location: "Barcelona, España",
  linkedin: "linkedin.com/in/joan-mata",
  github: "github.com/joan-mata",
  profile: {
    es: "Ingeniero con doble titulación en Ingeniería Informática y Sistemas de Telecomunicación, con un perfil híbrido que une hardware, software y ciencia de datos. Actualmente ejerzo como Profesor Universitario especializado en ciberseguridad y redes, actividad que compagino con el desarrollo de soluciones de IA local, arquitecturas cloud escalables y sistemas embebidos. Me define una profunda curiosidad técnica y una mentalidad de aprendizaje continuo, lo que me permite adaptarme rápidamente a nuevas tecnologías e integrarlas en proyectos complejos y seguros.",
    ca: "Enginyer amb doble titulació en Enginyeria Informàtica i Sistemes de Telecomunicació, amb un perfil híbrid que uneix maquinari, programari i ciència de dades. Actualment exerceixo com a Professor Universitari especialitzat en ciberseguretat i xarxes, activitat que compagino amb el desenvolupament de solucions d'IA local, arquitectures cloud escalables i sistemes encastats. Em defineix una profunda curiositat tècnica i una mentalitat d'aprenentatge continu, la qual cosa em permet adaptar-me ràpidament a noves tecnologies i integrar-les en projectes complexos i segurs.",
    en: "Engineer with a double degree in Computer Engineering and Telecommunication Systems, with a hybrid profile combining hardware, software, and data science. Currently serving as a University Professor specializing in cybersecurity and networks, a role complemented by the development of local AI solutions, scalable cloud architectures, and embedded systems. I am defined by a deep technical curiosity and a continuous learning mindset, allowing me to quickly adapt to new technologies and integrate them into complex and secure projects."
  },
  experience: [
    {
      company: "Universitat Autònoma de Barcelona",
      role: { es: "Profesor de universidad", ca: "Professor d'universitat", en: "University Professor" },
      date: "09/2025 - Present",
      points: {
        es: [
          "Docente en 'Serveis de Telecomunicacions', liderando la formación práctica en desarrollo web full-stack y seguridad.",
          "Configuración avanzada de seguridad web: SSL/TLS, PKI y gestión de infraestructuras críticas.",
          "Docente en 'Fonaments de Xarxes', impartiendo fundamentos de comunicación IP y cliente-servidor.",
          "Tutor de TFG en ciberseguridad (hardening) y Data Engineering (scraping masivo)."
        ],
        ca: [
          "Docent en 'Serveis de Telecomunicacions', liderant la formació pràctica en desenvolupament web full-stack i seguretat.",
          "Configuració avançada de seguretat web: SSL/TLS, PKI i gestió d'infraestructures crítiques.",
          "Docent en 'Fonaments de Xarxes', impartint fonaments de comunicació IP i client-servidor.",
          "Tutor de TFG en ciberseguretat (hardening) i Data Engineering (scraping massiu)."
        ],
        en: [
          "Professor in 'Telecommunication Services', leading practical training in full-stack web development and security.",
          "Advanced web security configuration: SSL/TLS, PKI, and critical infrastructure management.",
          "Professor in 'Network Fundamentals', teaching IP communication and client-server architecture.",
          "Tutor for final projects in cybersecurity (hardening) and Data Engineering (massive scraping)."
        ]
      }
    },
    {
      company: "FlexiiC",
      role: { es: "Diseñador de Circuitos Integrados", ca: "Dissenyador de Circuits Integrats", en: "IC Designer" },
      date: "09/2024 - 11/2025",
      points: {
        es: [
          "Desarrollo de conectividad inalámbrica con nRF52840 y Bluetooth Low Energy (BLE).",
          "Diseño integral de PCBs y validación con sistemas embebidos.",
          "Verificación digital de hardware (RTL) en Verilog y optimización en ASM.",
          "Liderazgo en debugging lógico del chip para fase de producción."
        ],
        ca: [
          "Desenvolupament de connectivitat sense fils amb nRF52840 i Bluetooth Low Energy (BLE).",
          "Disseny integral de PCBs i validació amb sistemes encastats.",
          "Verificació digital de maquinari (RTL) en Verilog i optimització en ASM.",
          "Lideratge en debugging lògic del xip per a fase de producció."
        ],
        en: [
          "Wireless connectivity development using nRF52840 and Bluetooth Low Energy (BLE).",
          "Integral PCB design and validation with embedded systems.",
          "Hardware digital verification (RTL) in Verilog and ASM optimization.",
          "Leading role in logial debugging for the production phase."
        ]
      }
    },
    {
      company: "Universitat Autònoma de Barcelona",
      role: { es: "Técnico Especialista en Investigación", ca: "Tècnic Especialista en Investigació", en: "Research Specialist" },
      date: "07/2022 - 07/2023",
      points: {
        es: [
          "Diseño de arquitectura backend migrando de Django a Flask.",
          "Liderazgo en transición de SQL a NoSQL (MongoDB) para datos heterogéneos.",
          "Automatización de pipelines de datos en tiempo real."
        ],
        ca: [
          "Disseny d'arquitectura backend migrant de Django a Flask.",
          "Lideratge en transició de SQL a NoSQL (MongoDB) per a dades heterogènies.",
          "Automatització de pipelines de dades en temps real."
        ],
        en: [
          "Backend architecture design migrating from Django to Flask.",
          "Leading transition from SQL to NoSQL (MongoDB) for heterogeneous data.",
          "Data pipeline automation for real-time processing."
        ]
      }
    },
    {
      company: "Cellnex Telecom",
      role: { es: "Ingeniero de Ventas", ca: "Enginyer de Vendes", en: "Sales Engineer" },
      date: "06/2022 - 07/2023",
      points: {
        es: [
          "Modelado de sistemas de RF y gestión de alianzas estratégicas.",
          "Coordinación End-to-End del ciclo de vida del proyecto."
        ],
        ca: [
          "Modelatge de sistemes d'RF i gestió d'aliances estratègiques.",
          "Coordinació End-to-End del cicle de vida del projecte."
        ],
        en: [
          "RF systems modeling and strategic alliance management.",
          "End-to-End coordination of project lifecycle."
        ]
      }
    },
    {
      company: "Johnson Control Hitachi",
      role: { es: "QA Tester", ca: "QA Tester", en: "QA Tester" },
      date: "07/2021 - 02/2022",
      points: {
        es: [
          "Validación de sistemas mediante simuladores físicos y scripts en Python.",
          "Implementación de sistema de diagnóstico con Arduino."
        ],
        ca: [
          "Validació de sistemes mitjançant simuladors físics i scripts en Python.",
          "Implementació de sistema de diagnòstic amb Arduino."
        ],
        en: [
          "System validation using physical simulators and Python scripts.",
          "Diagnosis system implementation with Arduino."
        ]
      }
    },
    {
      company: "Federació Catalana de Futbol",
      role: { es: "Árbitro de fútbol", ca: "Àrbitre de futbol", en: "Soccer Referee" },
      date: "07/2016 - Present",
      points: {
        es: ["Gestión de la presión y toma de decisiones crítica."],
        ca: ["Gestió de la pressió i presa de decisions crítica."],
        en: ["Pressure management and critical decision making."]
      }
    }
  ],
  projects: [
    {
      name: "Editor de Documentos (IA Local)",
      date: "2026",
      tags: ["Local LLMs", "React", "PDF Engines"],
      desc: {
        es: "Plataforma web Privacy-First con asistentes de IA locales para edición y conversión de documentos.",
        ca: "Plataforma web Privacy-First amb assistents d'IA locals per a edició i conversió de documents.",
        en: "Privacy-First web platform with local AI assistants for document editing and conversion."
      }
    },
    {
      name: "Arquitectura de Ingesta (AWS)",
      date: "2025",
      tags: ["AWS", "PostgreSQL", "Data Engineering"],
      desc: {
        es: "Ecosistema de extracción masiva de dades web con escalabilidad en la nube.",
        ca: "Ecosistema d'extracció massiva de dades web amb escalabilitat al núvol.",
        en: "Massive web data extraction ecosystem with cloud scalability."
      }
    },
    {
      name: "Plataforma de Procesamiento (Docker)",
      date: "2025",
      tags: ["Docker", "Maths", "Security"],
      desc: {
        es: "Despliegue de microservicios para procesamiento matemático y visualización segura.",
        ca: "Desplegament de microserveis per a processament matemàtic i visualització segura.",
        en: "Microservices deployment for mathematical processing and secure visualization."
      }
    }
  ],
  education: [
    {
      title: { es: "Máster - Ciencia de Datos", ca: "Màster - Ciència de Dades", en: "Master - Data Science" },
      school: "Universitat Oberta de Catalunya",
      date: "2025 – Present"
    },
    {
      title: { es: "Grado en Ingeniería Informática", ca: "Grau en Enginyeria Informàtica", en: "BS in Computer Engineering" },
      school: "Universitat Autònoma de Barcelona",
      date: "2018 – 2025"
    },
    {
      title: { es: "Grado en Sistemas de Telecomunicación", ca: "Grau en Sistemes de Telecomunicació", en: "BS in Telecommunication Systems" },
      school: "Universitat Autònoma de Barcelona",
      date: "2018 – 2025"
    }
  ],
  skills: [
    "Python", "C++", "React", "Node.js", "Swift", "Machine Learning", "Local IA", "AWS", "Docker", "PKI/SSL", "PCB Design"
  ],
  volunteering: [
    {
      location: "Bolivia",
      date: "2025",
      org: "FASFI",
      desc: { es: "Apoyo educativo en Cochabamba.", ca: "Suport educatiu a Cochabamba.", en: "Educational support in Cochabamba." }
    },
    {
      location: "Haití",
      date: "2019",
      org: "TECHO",
      desc: { es: "Construcción de viviendas en Puerto Príncipe.", ca: "Construcció d'habitatges a Port-au-Prince.", en: "Emergency housing construction." }
    }
  ]
}

function App() {
  const [lang, setLang] = useState('es')
  const [activeTab, setActiveTab] = useState('experience')
  const t = TRANSLATIONS[lang]

  return (
    <div className="container">
      <div className="language-switcher">
        <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
        <button className={lang === 'ca' ? 'active' : ''} onClick={() => setLang('ca')}>CA</button>
        <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
      </div>

      <header className="premium-nav">
        <div className="logo" onClick={() => setActiveTab('experience')}>JOAN MATA</div>
        <nav>
          <ul>
            {Object.keys(t.nav).map(key => (
              <li 
                key={key} 
                className={activeTab === key ? 'active' : ''} 
                onClick={() => setActiveTab(key)}
              >
                {t.nav[key]}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Joan <span className="gradient-text">Mata</span> Pàrraga</h1>
          <p>{t.hero.subtitle}</p>
          <p className="profile-text">{DATA.profile[lang]}</p>
        </section>

        {activeTab === 'experience' && (
          <section>
            <h2 className="section-title">{t.sections.experience}</h2>
            <div className="card-grid">
              {DATA.experience.map((exp, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{exp.role[lang]}</h3>
                      <p className="card-subtitle">{exp.company}</p>
                    </div>
                    <span className="card-date">{exp.date}</span>
                  </div>
                  <ul className="card-list">
                    {exp.points[lang].map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section>
            <h2 className="section-title">{t.sections.projects}</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
              {DATA.projects.map((proj, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <h3 className="card-title">{proj.name}</h3>
                    <span className="card-date">{proj.date}</span>
                  </div>
                  <p className="card-content">{proj.desc[lang]}</p>
                  <div className="badge-container" style={{ marginTop: '1rem' }}>
                    {proj.tags.map((tag, j) => (
                      <span key={j} className="badge">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'education' && (
          <section>
            <h2 className="section-title">{t.sections.education}</h2>
            <div className="card-grid">
              {DATA.education.map((edu, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{edu.title[lang]}</h3>
                      <p className="card-subtitle">{edu.school}</p>
                    </div>
                    <span className="card-date">{edu.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'skills' && (
          <section>
            <h2 className="section-title">{t.sections.skills}</h2>
            <div className="card">
              <div className="badge-container">
                {DATA.skills.map((skill, i) => (
                  <span key={i} className="badge">{skill}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === 'certificates' && (
          <section id="certificates">
            <h2 className="section-title">{t.sections.certificates}</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {[
                { title: 'Desarrollo con IA', issuer: 'BIG School', date: '2026' },
                { title: 'Bluetooth Low Energy Fundamentals', issuer: 'Nordic Semiconductor', date: '2024' },
                { title: 'nRF Connect SDK Fundamentals', issuer: 'Nordic Semiconductor', date: '2024' },
                { title: 'Certificate of Python', issuer: 'University of Michigan', date: '2019' }
              ].map((cert, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{cert.title}</h3>
                      <p className="card-subtitle">{cert.issuer}</p>
                    </div>
                    <span className="card-date">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'volunteering' && (
          <section>
            <h2 className="section-title">{t.sections.volunteering}</h2>
            <div className="card-grid">
              {DATA.volunteering.map((v, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{v.location}</h3>
                      <p className="card-subtitle">{v.org}</p>
                    </div>
                    <span className="card-date">{v.date}</span>
                  </div>
                  <p className="card-content">{v.desc[lang]}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section>
            <h2 className="section-title">{t.sections.contact}</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="card-title">{t.contact.info}</h3>
                <p className="card-content">📧 {DATA.email}</p>
                <p className="card-content">📱 {DATA.phone}</p>
                <p className="card-content">📍 {DATA.location}</p>
              </div>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="card-title">{t.contact.social}</h3>
                <p className="card-content">🔗 <a href={`https://${DATA.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></p>
                <p className="card-content">💻 <a href={`https://${DATA.github}`} target="_blank" rel="noreferrer">GitHub</a></p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 {DATA.name}. Built with React & Vite.</p>
        <p style={{ marginTop: '0.5rem' }}>Barcelona • {DATA.email}</p>
      </footer>
    </div>
  )
}

export default App
