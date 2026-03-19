import React, { useState } from 'react'

const EXPERIENCE = [
  {
    title: 'Profesor de Universidad',
    company: 'Universitat Autònoma de Barcelona',
    date: '09/2025 – Presente',
    points: [
      'Docente en "Serveis de Telecomunicacions", liderando la formación en desarrollo web full-stack y seguridad.',
      'Instrucción técnica en arquitecturas web completas, bases de datos y seguridad avanzada (SSL/TLS, PKI).',
      'Docente en "Fonaments de Xarxes", enseñando protocolos IP y arquitectura cliente-servidor.',
      'Diseño y simulación de topologías de red con protocolos de encaminamiento avanzado (VLSM).',
      'Tutor de TFG en ciberseguridad y Data Engineering (web scraping masivo).'
    ]
  },
  {
    title: 'Técnico Superior Especialista en Investigación',
    company: 'Universitat Autònoma de Barcelona',
    date: '07/2022 – 07/2023',
    points: [
      'Diseño y desarrollo backend para una plataforma de gestión de datos (migración de Django a Flask).',
      'Liderazgo en la transición de SQL a MongoDB para datos heterogéneos.',
      'Automatización de pipelines para ingesta, limpieza y normalización de datos.'
    ]
  },
  {
    title: 'Ingeniero de Ventas',
    company: 'Cellnex Telecom',
    date: '06/2022 – 07/2023',
    points: [
      'Análisis y modelado de sistemas de RF.',
      'Gestión de alianzas estratégicas con proveedores de fibra óptica.',
      'Coordinación integral del ciclo de vida del proyecto (End-to-End).'
    ]
  },
  {
    title: 'QA Tester',
    company: 'Johnson Control Hitachi',
    date: '07/2021 – 02/2022',
    points: [
      'Validación de sistemas de climatización con simuladores físicos.',
      'Desarrollo de sistemas de diagnóstico con Arduino (comunicación serie).',
      'Automatización de tests mediante scripts en Python.'
    ]
  },
  {
    title: 'Ingeniero de Hardware',
    company: 'IMB-CNM (CSIC)',
    date: '05/2021',
    points: [
      'Caracterización física y validación de circuitos integrados.',
      'Verificación digital de hardware (RTL) mediante Testbenches en Verilog.',
      'Liderazgo en la fase de debugging lógico del chip.'
    ]
  },
  {
    title: 'Árbitro de Fútbol',
    company: 'Federación Catalana de Fútbol',
    date: '10/2012 – 06/2022',
    points: [
      'Toma de decisiones crítica en entornos de alta presión.',
      'Resolución de conflictos y mediación asertiva.'
    ]
  }
]

const PROJECTS = [
  {
    title: 'Editor de Documentos Inteligente con IA Local',
    date: '2026',
    description: 'Plataforma web con LLMs locales para edición y conversión a PDF en tiempo real, garantizando 100% de privacidad.'
  },
  {
    title: 'Arquitectura de Ingesta y Análisis Estadístico',
    date: '2025',
    description: 'Ecosistema de Web Scraping masivo con AWS y PostgreSQL.'
  },
  {
    title: 'Plataforma de Procesamiento y Clasificación de Datos',
    date: '2025',
    description: 'Microservicios con Docker para algoritmos de clasificación automatizada.'
  },
  {
    title: 'Ecosistema de Aplicaciones Móviles y Educativas',
    date: '2024',
    description: 'Apps nativas iOS con persistencia de datos local y sincronización.'
  }
]

const LANGUAGES = [
  { name: 'Español', level: 'Nativo' },
  { name: 'Catalán', level: 'Nativo' },
  { name: 'Inglés', level: 'B2' },
  { name: 'Francés', level: 'A2' }
]

const SKILLS = [
  'Python', 'C++', 'Node.js', 'React', 'Java', 'Swift', 'ASM', 'Verilog',
  'Machine Learning', 'IA Local (Ollama)', 'Web Scraping', 'Data Engineering',
  'Django', 'Flask', 'FastAPI', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'Linux', 'nRF52 SDK'
]

const VOLUNTEERING = [
  {
    location: 'Bolivia',
    date: '2025',
    org: 'FASFI',
    description: 'Apoyo educativo en programas para niños vulnerables en Cochabamba.'
  },
  {
    location: 'Haití',
    date: '2019',
    org: 'TECHO',
    description: 'Construcción de viviendas de emergencia en Puerto Príncipe.'
  }
]

const CERTIFICATES = [
  { title: 'Desarrollo con IA', issuer: 'BIG School', date: '2026' },
  { title: 'Bluetooth Low Energy Fundamentals', issuer: 'Nordic Semiconductor', date: '2024' },
  { title: 'nRF Connect SDK Fundamentals', issuer: 'Nordic Semiconductor', date: '2024' },
  { title: 'Certificate of Python', issuer: 'University of Michigan', date: '2019' }
]

const CONTACT = {
  email: 'joanmata.parraga@gmail.com',
  phone: '+34 647 267 153',
  location: 'Barcelona, España',
  linkedin: 'linkedin.com/in/joan-mata',
  github: 'github.com/joan-mata'
}

function App() {
  const [activeTab, setActiveTab] = useState('experience')

  return (
    <div className="container">
      <header>
        <div className="logo" onClick={() => setActiveTab('experience')}>JOAN MATA</div>
        <nav>
          <ul>
            <li className={activeTab === 'experience' ? 'active' : ''} onClick={() => setActiveTab('experience')}>Experiencia</li>
            <li className={activeTab === 'projects' ? 'active' : ''} onClick={() => setActiveTab('projects')}>Proyectos</li>
            <li className={activeTab === 'skills' ? 'active' : ''} onClick={() => setActiveTab('skills')}>Habilidades</li>
            <li className={activeTab === 'certificates' ? 'active' : ''} onClick={() => setActiveTab('certificates')}>Certificados</li>
            <li className={activeTab === 'volunteering' ? 'active' : ''} onClick={() => setActiveTab('volunteering')}>Voluntariado</li>
            <li className={activeTab === 'contact' ? 'active' : ''} onClick={() => setActiveTab('contact')}>Contacto</li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Joan <span className="gradient-text">Mata</span> Pàrraga</h1>
          <p>Ingeniero Informático y de Telecomunicación • Profesor Universitario • Data Scientist</p>
        </section>

        {activeTab === 'experience' && (
          <section id="experience">
            <h2 className="section-title">Experiencia Profesional</h2>
            <div className="card-grid">
              {EXPERIENCE.map((exp, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{exp.title}</h3>
                      <p className="card-subtitle">{exp.company}</p>
                    </div>
                    <span className="card-date">{exp.date}</span>
                  </div>
                  <ul className="card-list">
                    {exp.points.map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section id="projects">
            <h2 className="section-title">Proyectos de Ingeniería</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
              {PROJECTS.map((proj, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <h3 className="card-title">{proj.title}</h3>
                    <span className="card-date">{proj.date}</span>
                  </div>
                  <p className="card-content">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'skills' && (
          <section id="skills">
            <h2 className="section-title">Habilidades y Tecnologías</h2>
            <div className="card">
              <div className="badge-container">
                {SKILLS.map((skill, i) => (
                  <span key={i} className="badge">{skill}</span>
                ))}
              </div>
            </div>
            
            <h2 className="section-title" style={{ marginTop: '4rem' }}>Idiomas</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              {LANGUAGES.map((lang, i) => (
                <div key={i} className="card" style={{ textAlign: 'center' }}>
                  <h3 className="card-title">{lang.name}</h3>
                  <p className="card-subtitle" style={{ color: 'var(--text-dim)' }}>{lang.level}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'certificates' && (
          <section id="certificates">
            <h2 className="section-title">Certificados</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {CERTIFICATES.map((cert, i) => (
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
          <section id="volunteering">
            <h2 className="section-title">Voluntariado</h2>
            <div className="card-grid">
              {VOLUNTEERING.map((v, i) => (
                <div key={i} className="card">
                  <div className="card-header">
                    <div>
                      <h3 className="card-title">{v.location}</h3>
                      <p className="card-subtitle">{v.org}</p>
                    </div>
                    <span className="card-date">{v.date}</span>
                  </div>
                  <p className="card-content">{v.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section id="contact">
            <h2 className="section-title">Contacto</h2>
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="card-title">Información de contacto</h3>
                <p className="card-content">📧 {CONTACT.email}</p>
                <p className="card-content">📱 {CONTACT.phone}</p>
                <p className="card-content">📍 {CONTACT.location}</p>
              </div>
              <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 className="card-title">Redes Profesionales</h3>
                <p className="card-content">🔗 <a href={`https://${CONTACT.linkedin}`} target="_blank" rel="noreferrer">LinkedIn</a></p>
                <p className="card-content">💻 <a href={`https://${CONTACT.github}`} target="_blank" rel="noreferrer">GitHub</a></p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Joan Mata Pàrraga. Creado con React y Vite.</p>
        <p style={{ marginTop: '0.5rem' }}>Barcelona, España • joanmata.parraga@gmail.com</p>
      </footer>
    </div>
  )
}

export default App
