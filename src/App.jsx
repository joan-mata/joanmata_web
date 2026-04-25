import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TRANSLATIONS } from './models/translations';
import { DATA } from './models/cvData';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LanguageSwitcher from './components/layout/LanguageSwitcher';
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import ProjectDetailsPage from './components/sections/ProjectDetailsPage';
import Education from './components/sections/Education';
import EducationDetailsPage from './components/sections/EducationDetailsPage';
import Skills from './components/sections/Skills';
import Certificates from './components/sections/Certificates';
import CertificateDetailsPage from './components/sections/CertificateDetailsPage';
import Volunteering from './components/sections/Volunteering';
import ExperienceDetailsPage from './components/sections/ExperienceDetailsPage';
import Contact from './components/sections/Contact';
import AdminEntry from './components/admin/AdminEntry';
import AdminModal from './components/admin/AdminModal';

export default function App() {
  const [lang, setLang] = useState('es');
  const [currentData, setCurrentData] = useState(() => {
    try {
      const saved = localStorage.getItem('curcv_data');
      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to parse saved CV data", e);
    }
    return DATA;
  });
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === 'true');
  const [showModal, setShowModal] = useState(null);
  const [showExportSelector, setShowExportSelector] = useState(false);
  const timeoutRef = React.useRef(null);

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    localStorage.setItem('curcv_data', JSON.stringify(currentData));
  }, [currentData]);

  // Idle timeout: 15 minutes (900,000 ms)
  useEffect(() => {
    if (!isAdmin) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }

    const resetTimer = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        console.log('Session expired due to inactivity');
        logout();
      }, 15 * 60 * 1000); 
    };

    // Initial timer
    resetTimer();

    // Event listeners for activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [isAdmin]);

  // Carga inicial persistente (Cerebro Full-Stack)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/cv');
        if (res.ok) {
          const serverData = await res.json();
          setCurrentData(serverData);
          localStorage.setItem('curcv_data', JSON.stringify(serverData));
        }
      } catch (err) {
        console.warn('Backend no detectado. Usando almacenamiento local.');
      }
    };
    fetchData();
  }, []);

  const handleSave = async (item) => {
    const { context, itemIndex, type } = showModal;
    const next = { ...currentData };
    if (type === 'skills') next.skills = item;
    else if (type === 'profile') next.profile = item;
    else if (type === 'subitem') {
      const { parentIndex, subItemIndex } = showModal;
      next[context][parentIndex].subItems[subItemIndex] = item;
    }
    else if (itemIndex !== undefined) next[context][itemIndex] = item;
    else next[context].push({ ...item, id: Date.now().toString() });
    
    // 1. Efecto inmediato en el navegador
    setCurrentData(next);
    localStorage.setItem('curcv_data', JSON.stringify(next));
    setShowModal(null);

    // 2. Persistencia REAL en el Servidor
    if (isAdmin) {
      try {
        const authHash = sessionStorage.getItem('adminAuthHash');
        const response = await fetch('/api/cv', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ authHash, newData: next })
        });
        
        if (!response.ok) {
          console.error('Error al persistir en el servidor');
          alert('⚠️ Aviso: Los cambios se guardaron en tu navegador pero el servidor no respondió. Asegúrate de estar conectado.');
        } else {
          console.log('💎 Cambios sincronizados con el servidor');
        }
      } catch (err) {
        console.error('Fallo crítico de conexión con la API:', err);
      }
    }
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "cvData.json");
    dl.click();
  };

  const exportYaml = (targetLang) => {
    const d = currentData;
    const l = targetLang || lang;
    const isEn = l === 'en';

    // Helper to format strings with quotes if needed
    const q = (s) => `"${(s || '').toString().replace(/"/g, '\\"')}"`;
    
    // Helper to format lists as multiline YAML strings with |
    const fmtList = (list, indent) => {
      const sp = ' '.repeat(indent);
      if (!list || list.length === 0) return '""';
      return '|\n' + list.map(item => `${sp}- ${item}`).join('\n');
    };

    // Manual YAML construction specifically for the requested AI format
    let yaml = `${isEn ? 'name' : 'nombre'}: ${q(d.name)}\n`;
    yaml += `email: ${q(d.email)}\n`;
    yaml += `${isEn ? 'phone' : 'telefono'}: ${q(d.phone)}\n`;
    yaml += `${isEn ? 'location' : 'ubicacion'}: ${q(d.location)}\n`;
    yaml += `website: "joanmata.com"\n\n`;

    yaml += `profile:\n  ${isEn ? 'text' : 'texto'}: ${q(d.profile[l])}\n\n`;

    yaml += `experience:\n`;
    d.experience.forEach(exp => {
      yaml += `  - company: ${q(exp.company)}\n`;
      yaml += `    ${isEn ? 'position' : 'puesto'}: ${q(exp.role[l])}\n`;
      yaml += `    date: ${q(exp.date)}\n`;
      yaml += `    resumen: ${q(exp.desc[l])}\n`;
      yaml += `    tags: [${(exp.tags || []).map(t => q(t)).join(', ')}]\n`;
      yaml += `    ${isEn ? 'description' : 'descripcion'}: ${fmtList(exp.points[l], 6)}\n`;
    });

    yaml += `\n${isEn ? 'projects' : 'proyectos_ingenieria'}:\n`;
    d.projects.forEach(p => {
      yaml += `  - name: ${q(p.name[l])}\n`;
      yaml += `    date: ${q(p.date)}\n`;
      yaml += `    ${isEn ? 'technologies' : 'tecnologias'}: [${p.techStack.map(t => q(t)).join(', ')}]\n`;
      yaml += `    ${isEn ? 'description' : 'descripcion'}: ${fmtList(p.points[l], 6)}\n`;
      if (p.security && p.security[l]) {
        yaml += `    ${isEn ? 'security' : 'seguridad'}: ${fmtList(p.security[l], 6)}\n`;
      }
    });

    yaml += `\neducation:\n`;
    d.education.forEach(edu => {
      yaml += `  - ${isEn ? 'title' : 'titulo'}: ${q(edu.title[l])}\n`;
      yaml += `    ${isEn ? 'institution' : 'centro'}: ${q(edu.school)}\n`;
      yaml += `    date: ${q(edu.date)}\n`;
    });

    yaml += `\nvoluntariado:\n`;
    d.volunteering.forEach(v => {
      yaml += `  - ${isEn ? 'organization' : 'organizacion'}: ${q(v.org)}\n`;
      yaml += `    ${isEn ? 'role' : 'puesto'}: ${q(v.location)}\n`;
      yaml += `    date: ${q(v.date)}\n`;
      yaml += `    ${isEn ? 'description' : 'descripcion'}: ${q(v.desc[l])}\n`;
    });

    yaml += `\nskills:\n`;
    yaml += `  ${isEn ? 'technical' : 'tecnicas'}:\n`;
    if (d.skills.software) yaml += `    - "${isEn ? 'Programming' : (l === 'ca' ? 'Programació' : 'Programación')}: ${d.skills.software.join(', ')}."\n`;
    if (d.skills.ai) yaml += `    - "${isEn ? 'Data & AI' : (l === 'ca' ? 'Dades i IA' : 'Datos e IA')}: ${d.skills.ai.join(', ')}."\n`;
    if (d.skills.scraping) yaml += `    - "Web & Scraping: ${d.skills.scraping.join(', ')}."\n`;
    if (d.skills.infrastructure) yaml += `    - "${isEn ? 'Infrastructure' : (l === 'ca' ? 'Infraestructura' : 'Infraestructura')}: ${d.skills.infrastructure.join(', ')}."\n`;
    if (d.skills.hardware) yaml += `    - "${isEn ? 'Hardware' : (l === 'ca' ? 'Maquinari' : 'Hardware')}: ${d.skills.hardware.join(', ')}."\n`;

    yaml += `  ${isEn ? 'soft_skills' : 'competencias'}:\n`;
    (d.skills.leadership[l] || []).forEach(c => {
      yaml += `    - ${q(c)}\n`;
    });

    yaml += `  ${isEn ? 'languages' : 'idiomas'}:\n`;
    const idiomas = l === 'es' ? ["Español (nativo)", "Catalán (nativo)", "Inglés (B2)", "Francés (A2)"] :
                   l === 'ca' ? ["Espanyol (natiu)", "Català (natiu)", "Anglès (B2)", "Francès (A2)"] :
                   ["Spanish (native)", "Catalan (native)", "English (B2)", "French (A2)"];
    idiomas.forEach(i => {
      yaml += `    - ${q(i)}\n`;
    });

    yaml += `\ncertificados:\n`;
    d.certificates.forEach(c => {
      yaml += `  - ${isEn ? 'name' : 'nombre'}: ${q(c.title)}\n`;
      yaml += `    ${isEn ? 'issuer' : 'emisor'}: ${q(c.issuer)}\n`;
      yaml += `    date: ${q(c.date)}\n`;
      yaml += `    ${isEn ? 'description' : 'descripcion'}: ${q(c.description[l])}\n`;
    });

    const blob = new Blob([yaml], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const dl = document.createElement('a');
    dl.href = url;
    dl.download = `cvData_${l}.yaml`;
    dl.click();
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (re) => {
      try {
        // Validate JSON structure before storing
        const parsed = JSON.parse(re.target.result);
        const requiredKeys = ['name', 'experience', 'projects', 'education', 'skills', 'certificates', 'volunteering'];
        const missingKeys = requiredKeys.filter(k => !(k in parsed));
        if (missingKeys.length > 0) {
          alert(`JSON inválido. Faltan campos: ${missingKeys.join(', ')}`);
          return;
        }
        if (!Array.isArray(parsed.experience) || !Array.isArray(parsed.projects)) {
          alert('JSON inválido. experience y projects deben ser arrays.');
          return;
        }
        localStorage.setItem('curcv_data', JSON.stringify(parsed));
        window.location.reload();
      } catch (err) {
        alert('Error: El archivo no es un JSON válido.');
      }
    };
    reader.readAsText(file);
  };

  const t = TRANSLATIONS[lang];
  const adminProps = (ctx, tCode) => ({
    isAdmin,
    onEdit: (idx) => setShowModal({ type: tCode || ctx, context: ctx, itemIndex: idx, data: currentData[ctx][idx] }),
    onAdd: () => setShowModal({ type: tCode || ctx, context: ctx })
  });

  return (
    <HashRouter>
      <div className={`container ${isAdmin ? 'is-admin' : ''}`}>
        <LanguageSwitcher lang={lang} onLangChange={setLang} />
        
        {isAdmin && (
          <div className="admin-toolbar">
            <label className="admin-tool-btn" title="Import JSON">
              📥
              <input type="file" onChange={importData} style={{display:'none'}}/>
            </label>
            <button onClick={exportData} className="admin-tool-btn" title="Export JSON">💾</button>
            <button onClick={() => setShowExportSelector(true)} className="admin-tool-btn" title="Export to AI (YAML)">🤖</button>
            <button onClick={logout} className="admin-tool-btn" title="Exit Admin">🚪</button>
          </div>
        )}

        <Header translations={t} isAdmin={isAdmin} currentData={currentData} />
        
        <main>
          <Routes>
            <Route path="/" element={<><Hero name={currentData.name} profileText={currentData.profile[lang]} translations={t} isAdmin={isAdmin} onEdit={() => setShowModal({ type: 'profile', context: 'profile', data: currentData.profile })} /><Experience title={t.sections.experience} data={currentData.experience} lang={lang} translations={t} {...adminProps('experience', 'experience')} /></>} />
            <Route path="/projects" element={<Projects title={t.sections.projects} data={currentData.projects} lang={lang} translations={t} {...adminProps('projects', 'project')} />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage data={currentData.projects} lang={lang} translations={t} isAdmin={isAdmin} onEdit={(id) => setShowModal({ type: 'project', context: 'projects', itemIndex: currentData.projects.findIndex(p => p.id === id), data: currentData.projects.find(p => p.id === id) })} />} />
            <Route path="/education" element={<Education title={t.sections.education} data={currentData.education} lang={lang} translations={t} {...adminProps('education', 'education')} />} />
            <Route path="/education/:id" element={<EducationDetailsPage data={currentData.education} lang={lang} translations={t} isAdmin={isAdmin} onEdit={(id) => setShowModal({ type: 'education', context: 'education', itemIndex: currentData.education.findIndex(e => e.id === id), data: currentData.education.find(e => e.id === id) })} />} />
            <Route path="/skills" element={<Skills title={t.sections.skills} data={currentData.skills} lang={lang} isAdmin={isAdmin} onEdit={() => setShowModal({ type: 'skills', context: 'skills', data: currentData.skills })} translations={t} />} />
            <Route path="/certificates" element={<Certificates title={t.sections.certificates} data={currentData.certificates} lang={lang} translations={t} {...adminProps('certificates', 'certificate')} />} />
            <Route path="/certificates/:id" element={<CertificateDetailsPage data={currentData.certificates} lang={lang} translations={t} isAdmin={isAdmin} onEdit={(id) => setShowModal({ type: 'certificates', context: 'certificates', itemIndex: currentData.certificates.findIndex(c => c.id === id), data: currentData.certificates.find(c => c.id === id) })} />} />
            <Route path="/volunteering" element={<Volunteering title={t.sections.volunteering} data={currentData.volunteering} lang={lang} translations={t} {...adminProps('volunteering', 'volunteering')} />} />
            <Route path="/experience/:id" element={
              <ExperienceDetailsPage 
                data={currentData.experience} 
                lang={lang} 
                translations={t} 
                isAdmin={isAdmin} 
                onEdit={(id) => setShowModal({ 
                  type: 'experience', 
                  context: 'experience', 
                  itemIndex: currentData.experience.findIndex(e => e.id === id), 
                  data: currentData.experience.find(e => e.id === id) 
                })} 
                onEditSubItem={(jobId, subItemId) => {
                  const jobIdx = currentData.experience.findIndex(e => e.id === jobId);
                  const subIdx = currentData.experience[jobIdx].subItems.findIndex(si => si.id === subItemId);
                  setShowModal({
                    type: 'subitem',
                    context: 'experience',
                    parentIndex: jobIdx,
                    subItemIndex: subIdx,
                    data: currentData.experience[jobIdx].subItems[subIdx]
                  });
                }}
              />
            } />
            <Route path="/contact" element={<Contact title={t.sections.contact} data={currentData} translations={t} />} />
            <Route path="/private-portal" element={isAdmin ? <Navigate to="/" /> : <AdminEntry onLogin={() => {setIsAdmin(true); sessionStorage.setItem('isAdmin', 'true');}} translations={t} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer name={currentData.name} email={currentData.email} />
        {showModal && <AdminModal type={showModal.type} initialData={showModal.data} onSave={handleSave} onCancel={() => setShowModal(null)} translations={t} />}
        {showExportSelector && (
          <div className="admin-modal-overlay" onClick={() => setShowExportSelector(false)}>
            <div className="admin-modal-container export-selector-modal" onClick={e => e.stopPropagation()}>
              <h2 className="detail-section-title" style={{textAlign: 'center', fontSize: '1.5rem', border: 'none'}}>{t.exportAI.title}</h2>
              <div className="export-options">
                <button 
                  className="cta-btn full-width" 
                  onClick={() => { exportYaml('es'); setShowExportSelector(false); }}
                >
                  {t.exportAI.spanish}
                </button>
                <button 
                  className="cta-btn full-width" 
                  onClick={() => { exportYaml('en'); setShowExportSelector(false); }}
                >
                  {t.exportAI.english}
                </button>
                <button 
                  className="cta-btn secondary full-width" 
                  onClick={() => setShowExportSelector(false)}
                >
                  {t.exportAI.cancel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </HashRouter>
  );
}
