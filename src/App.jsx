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
  const [currentData, setCurrentData] = useState(() => JSON.parse(localStorage.getItem('curcv_data')) || DATA);
  const [isAdmin, setIsAdmin] = useState(() => sessionStorage.getItem('isAdmin') === 'true');
  const [showModal, setShowModal] = useState(null);

  useEffect(() => localStorage.setItem('curcv_data', JSON.stringify(currentData)), [currentData]);

  const handleSave = (item) => {
    const { context, itemIndex, type } = showModal;
    const next = { ...currentData };
    if (type === 'skills') next.skills = item;
    else if (type === 'profile') next.profile = item;
    else if (itemIndex !== undefined) next[context][itemIndex] = item;
    else next[context].push({ ...item, id: Date.now().toString() });
    setCurrentData(next);
    setShowModal(null);
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "cvData.json");
    dl.click();
  };

  const exportYaml = () => {
    const d = currentData;
    const l = lang;

    // Helper to format strings with quotes if needed
    const q = (s) => `"${(s || '').toString().replace(/"/g, '\\"')}"`;
    
    // Helper to format lists as multiline YAML strings with |
    const fmtList = (list, indent) => {
      const sp = ' '.repeat(indent);
      if (!list || list.length === 0) return '""';
      return '|\n' + list.map(item => `${sp}- ${item}`).join('\n');
    };

    // Manual YAML construction specifically for the requested AI format
    let yaml = `nombre: ${q(d.name)}\n`;
    yaml += `email: ${q(d.email)}\n`;
    yaml += `telefono: ${q(d.phone)}\n`;
    yaml += `ubicacion: ${q(d.location)}\n`;
    yaml += `website: "joanmata.com"\n\n`;

    yaml += `perfil:\n  texto: ${q(d.profile[l])}\n\n`;

    yaml += `experiencia:\n`;
    d.experience.forEach(exp => {
      yaml += `  - empresa: ${q(exp.company)}\n`;
      yaml += `    puesto: ${q(exp.role[l])}\n`;
      yaml += `    fecha: ${q(exp.date)}\n`;
      yaml += `    resumen: ${q(exp.desc[l])}\n`;
      yaml += `    tags: [${(exp.tags || []).map(t => q(t)).join(', ')}]\n`;
      yaml += `    descripcion: ${fmtList(exp.points[l], 6)}\n`;
    });

    yaml += `\nproyectos_ingenieria:\n`;
    d.projects.forEach(p => {
      yaml += `  - nombre: ${q(p.name[l])}\n`;
      yaml += `    fecha: ${q(p.date)}\n`;
      yaml += `    tecnologias: [${p.techStack.map(t => q(t)).join(', ')}]\n`;
      yaml += `    descripcion: ${fmtList(p.points[l], 6)}\n`;
      if (p.security && p.security[l]) {
        yaml += `    seguridad: ${fmtList(p.security[l], 6)}\n`;
      }
    });

    yaml += `\nformacion:\n`;
    d.education.forEach(edu => {
      yaml += `  - titulo: ${q(edu.title[l])}\n`;
      yaml += `    centro: ${q(edu.school)}\n`;
      yaml += `    fecha: ${q(edu.date)}\n`;
    });

    yaml += `\nvoluntariado:\n`;
    d.volunteering.forEach(v => {
      yaml += `  - organizacion: ${q(v.org)}\n`;
      yaml += `    puesto: ${q(v.location)}\n`;
      yaml += `    fecha: ${q(v.date)}\n`;
      yaml += `    descripcion: ${q(v.desc[l])}\n`;
    });

    yaml += `\nhabilidades:\n`;
    yaml += `  tecnicas:\n`;
    if (d.skills.software) yaml += `    - "Programación: ${d.skills.software.join(', ')}."\n`;
    if (d.skills.ai) yaml += `    - "Datos e IA: ${d.skills.ai.join(', ')}."\n`;
    if (d.skills.scraping) yaml += `    - "Web & Scraping: ${d.skills.scraping.join(', ')}."\n`;
    if (d.skills.infrastructure) yaml += `    - "Infraestructura: ${d.skills.infrastructure.join(', ')}."\n`;
    if (d.skills.hardware) yaml += `    - "Hardware: ${d.skills.hardware.join(', ')}."\n`;
    
    yaml += `  competencias:\n`;
    (d.skills.leadership || []).forEach(c => { yaml += `    - ${q(c)}\n`; });
    
    yaml += `  idiomas:\n`;
    const idiomas = l === 'es' ? ["Español (nativo)", "Catalán (nativo)", "Inglés (B2)", "Francés (A2)"] :
                   l === 'ca' ? ["Espanyol (natiu)", "Català (natiu)", "Anglès (B2)", "Francès (A2)"] :
                   ["Spanish (native)", "Catalan (native)", "English (B2)", "French (A2)"];
    idiomas.forEach(i => { yaml += `    - ${q(i)}\n`; });

    yaml += `\ncertificados:\n`;
    d.certificates.forEach(c => {
      yaml += `  - nombre: ${q(c.title)}\n`;
      yaml += `    emisor: ${q(c.issuer)}\n`;
      yaml += `    fecha: ${q(c.date)}\n`;
      yaml += `    descripcion: ${q(c.description[l])}\n`;
    });

    const blob = new Blob([yaml], { type: 'text/yaml;charset=utf-8' });
    const dl = document.createElement('a');
    dl.href = URL.createObjectURL(blob);
    dl.download = `cvData_${l}.yaml`;
    dl.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (re) => {
        try {
          localStorage.setItem('curcv_data', re.target.result);
          window.location.reload();
        } catch (err) { alert("Error"); }
      };
      reader.readAsText(file);
    }
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
            <button onClick={exportYaml} className="admin-tool-btn" title="Export to AI (YAML)">🤖</button>
            <button onClick={() => {setIsAdmin(false); sessionStorage.removeItem('isAdmin');}} className="admin-tool-btn" title="Exit Admin">🚪</button>
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
            <Route path="/skills" element={<Skills title={t.sections.skills} data={currentData.skills} isAdmin={isAdmin} onEdit={() => setShowModal({ type: 'skills', context: 'skills', data: currentData.skills })} onAdd={() => setShowModal({ type: 'skills', context: 'skills' })} translations={t} />} />
            <Route path="/certificates" element={<Certificates title={t.sections.certificates} data={currentData.certificates} lang={lang} translations={t} {...adminProps('certificates', 'certificate')} />} />
            <Route path="/certificates/:id" element={<CertificateDetailsPage data={currentData.certificates} lang={lang} translations={t} isAdmin={isAdmin} onEdit={(id) => setShowModal({ type: 'certificates', context: 'certificates', itemIndex: currentData.certificates.findIndex(c => c.id === id), data: currentData.certificates.find(c => c.id === id) })} />} />
            <Route path="/volunteering" element={<Volunteering title={t.sections.volunteering} data={currentData.volunteering} lang={lang} {...adminProps('volunteering', 'volunteering')} />} />
            <Route path="/experience/:id" element={<ExperienceDetailsPage data={currentData.experience} lang={lang} translations={t} isAdmin={isAdmin} onEdit={(id) => setShowModal({ type: 'experience', context: 'experience', itemIndex: currentData.experience.findIndex(e => e.id === id), data: currentData.experience.find(e => e.id === id) })} />} />
            <Route path="/contact" element={<Contact title={t.sections.contact} data={currentData} translations={t} />} />
            <Route path="/admin" element={isAdmin ? <Navigate to="/" /> : <AdminEntry onLogin={() => {setIsAdmin(true); sessionStorage.setItem('isAdmin', 'true');}} translations={t} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer name={currentData.name} email={currentData.email} />
        {showModal && <AdminModal type={showModal.type} initialData={showModal.data} onSave={handleSave} onCancel={() => setShowModal(null)} translations={t} />}
      </div>
    </HashRouter>
  );
}
