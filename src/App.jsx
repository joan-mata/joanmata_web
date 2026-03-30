import React, { useState } from 'react';
import { TRANSLATIONS } from './models/translations';
import { DATA } from './models/cvData';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LanguageSwitcher from './components/layout/LanguageSwitcher';

// Section components
import Hero from './components/sections/Hero';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Skills from './components/sections/Skills';
import Certificates from './components/sections/Certificates';
import Volunteering from './components/sections/Volunteering';
import Contact from './components/sections/Contact';

// Admin components
import AdminEntry from './components/admin/AdminEntry';
import AdminDashboard from './components/admin/AdminDashboard';

function App() {
  const [lang, setLang] = useState('es');
  const [activeTab, setActiveTab] = useState('experience');
  const [currentData, setCurrentData] = useState(DATA);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const translations = TRANSLATIONS[lang];

  const handleAdminUpdate = (newData) => {
    setCurrentData(newData);
    setIsAdminMode(false);
  };

  return (
    <div className={`container ${isAdminMode ? 'admin-active' : ''}`}>
      <LanguageSwitcher lang={lang} onLangChange={setLang} />

      <Header 
        translations={translations} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <main>
        {isAdminMode ? (
          !isAdminLoggedIn ? (
            <AdminEntry 
              onLogin={() => setIsAdminLoggedIn(true)} 
              translations={translations}
            />
          ) : (
            <AdminDashboard 
              data={currentData} 
              onSave={handleAdminUpdate} 
              onCancel={() => setIsAdminMode(false)}
              translations={translations}
              lang={lang}
            />
          )
        ) : (
          <>
            {activeTab === 'experience' && (
              <Hero 
                name={currentData.name} 
                subtitle={translations.hero.subtitle} 
                profileText={currentData.profile[lang]} 
                translations={translations}
              />
            )}

            {activeTab === 'experience' && (
              <Experience 
                title={translations.sections.experience} 
                data={currentData.experience} 
                lang={lang} 
              />
            )}

            {activeTab === 'projects' && (
              <Projects 
                title={translations.sections.projects} 
                data={currentData.projects} 
                lang={lang} 
                translations={translations}
              />
            )}

            {activeTab === 'education' && (
              <Education 
                title={translations.sections.education} 
                data={currentData.education} 
                lang={lang} 
              />
            )}

            {activeTab === 'skills' && (
              <Skills 
                title={translations.sections.skills} 
                data={currentData.skills} 
              />
            )}

            {activeTab === 'certificates' && (
              <Certificates 
                title={translations.sections.certificates} 
                data={currentData.certificates} 
              />
            )}

            {activeTab === 'volunteering' && (
              <Volunteering 
                title={translations.sections.volunteering} 
                data={currentData.volunteering} 
                lang={lang} 
              />
            )}

            {activeTab === 'contact' && (
              <Contact 
                title={translations.sections.contact} 
                infoLabel={translations.contact.info}
                socialLabel={translations.contact.social}
                data={currentData} 
                translations={translations}
              />
            )}
          </>
        )}
      </main>

      <Footer 
        name={currentData.name} 
        email={currentData.email} 
        onAdminClick={() => setIsAdminMode(true)}
      />
    </div>
  );
}

export default App;
