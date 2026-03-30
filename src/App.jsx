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

function App() {
  const [lang, setLang] = useState('es');
  const [activeTab, setActiveTab] = useState('experience');

  const translations = TRANSLATIONS[lang];

  return (
    <div className="container">
      <LanguageSwitcher lang={lang} onLangChange={setLang} />

      <Header 
        translations={translations} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      <main>
        {/* BUG FIX: Hero section only appears on the first tab */}
        {activeTab === 'experience' && (
          <Hero 
            name={DATA.name} 
            subtitle={translations.hero.subtitle} 
            profileText={DATA.profile[lang]} 
            translations={translations}
          />
        )}

        {activeTab === 'experience' && (
          <Experience 
            title={translations.sections.experience} 
            data={DATA.experience} 
            lang={lang} 
          />
        )}

        {activeTab === 'projects' && (
          <Projects 
            title={translations.sections.projects} 
            data={DATA.projects} 
            lang={lang} 
            translations={translations}
          />
        )}

        {activeTab === 'education' && (
          <Education 
            title={translations.sections.education} 
            data={DATA.education} 
            lang={lang} 
          />
        )}

        {activeTab === 'skills' && (
          <Skills 
            title={translations.sections.skills} 
            data={DATA.skills} 
          />
        )}

        {activeTab === 'certificates' && (
          <Certificates 
            title={translations.sections.certificates} 
            data={DATA.certificates} 
          />
        )}

        {activeTab === 'volunteering' && (
          <Volunteering 
            title={translations.sections.volunteering} 
            data={DATA.volunteering} 
            lang={lang} 
          />
        )}

        {activeTab === 'contact' && (
          <Contact 
            title={translations.sections.contact} 
            infoLabel={translations.contact.info}
            socialLabel={translations.contact.social}
            data={DATA} 
            translations={translations}
          />
        )}
      </main>

      <Footer name={DATA.name} email={DATA.email} />
    </div>
  );
}

export default App;
