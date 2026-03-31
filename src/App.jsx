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
import Skills from './components/sections/Skills';
import Certificates from './components/sections/Certificates';
import Volunteering from './components/sections/Volunteering';
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
    else if (itemIndex !== undefined) next[context][itemIndex] = item;
    else next[context].push({ ...item, id: Date.now().toString() });
    setCurrentData(next);
    setShowModal(null);
  };

  const t = TRANSLATIONS[lang];
  const adminProps = (ctx, type='generic') => ({
    isAdmin,
    onEdit: (idx) => setShowModal({ type, context: ctx, itemIndex: idx, data: currentData[ctx][idx] }),
    onAdd: () => setShowModal({ type, context: ctx })
  });

  return (
    <HashRouter>
      <div className={`container ${isAdmin ? 'is-admin' : ''}`}>
        <LanguageSwitcher lang={lang} onLangChange={setLang} />
        <Header translations={t} isAdmin={isAdmin} onLogout={() => {setIsAdmin(false); sessionStorage.removeItem('isAdmin');}} currentData={currentData} />
        <main>
          <Routes>
            <Route path="/" element={<><Hero name={currentData.name} profileText={currentData.profile[lang]} translations={t} /><Experience title={t.sections.experience} data={currentData.experience} lang={lang} {...adminProps('experience')} /></>} />
            <Route path="/projects" element={<Projects title={t.sections.projects} data={currentData.projects} lang={lang} translations={t} {...adminProps('projects', 'project')} />} />
            <Route path="/projects/:id" element={<ProjectDetailsPage data={currentData.projects} lang={lang} translations={t} isAdmin={isAdmin} onEdit={(id) => setShowModal({ type: 'project', context: 'projects', itemIndex: currentData.projects.findIndex(p => p.id === id), data: currentData.projects.find(p => p.id === id) })} />} />
            <Route path="/education" element={<Education title={t.sections.education} data={currentData.education} lang={lang} {...adminProps('education')} />} />
            <Route path="/skills" element={<Skills title={t.sections.skills} data={currentData.skills} isAdmin={isAdmin} onEdit={() => setShowModal({ type: 'skills', context: 'skills', data: currentData.skills })} />} />
            <Route path="/certificates" element={<Certificates title={t.sections.certificates} data={currentData.certificates} lang={lang} {...adminProps('certificates')} />} />
            <Route path="/volunteering" element={<Volunteering title={t.sections.volunteering} data={currentData.volunteering} lang={lang} {...adminProps('volunteering')} />} />
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
