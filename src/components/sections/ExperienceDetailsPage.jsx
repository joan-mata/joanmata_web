import React, { useEffect } from 'react';
import { useParams, useNavigate, Link, useSearchParams } from 'react-router-dom';
import Badge from '../common/Badge';

const ExperienceDetailsPage = ({ data, lang, translations, isAdmin, onEdit, onEditSubItem }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const job = data.find(j => j.id === id);
  const activeItemId = searchParams.get('item');
  const activeSubItem = job?.subItems?.find(si => si.id === activeItemId);

  // Grouping logic
  const isTfg = (item) => item?.id?.startsWith('tfg-');
  const tfgItems = job?.subItems?.filter(isTfg) || [];
  const regularItems = job?.subItems?.filter(si => !isTfg(si)) || [];
  
  const [showTfgFolder, setShowTfgFolder] = React.useState(isTfg(activeSubItem));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isTfg(activeSubItem)) setShowTfgFolder(true);
  }, [id, activeItemId, activeSubItem]);

  if (!job) return (
    <div className="container centered-page">
      <h2>Job Experience Not Found</h2>
      <button className="cta-button" onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );

  return (
    <div className="project-detail-page">
      <div className="detail-top-nav">
        <Link to="/" className="back-link-btn">
          <span className="arrow">←</span> {translations.experience.close}
        </Link>
        {isAdmin && (
          <button className="cta-btn secondary edit-details-btn" onClick={() => onEdit(job.id)}>
            ✎ EDITAR TODO EL EMPLEO
          </button>
        )}
      </div>

      <header className="detail-hero">
        <div className="detail-hero-content">
          <span className="detail-category">{translations.sections.experience.toUpperCase()}</span>
          <h1 className="detail-main-title gradient-text">
            {activeSubItem ? activeSubItem.title[lang] : job.company}
          </h1>
          <div className="detail-meta">
            <span className="card-subtitle" style={{ fontSize: '1.4rem' }}>
              {activeSubItem ? job.company : job.role[lang]}
            </span>
            <span className="card-date" style={{ marginLeft: '1rem' }}>{job.date}</span>
          </div>
        </div>
      </header>

      <div className="detail-grid-layout">
        <div className="detail-main-column">
          {job.subItems && job.subItems.length > 0 && (
            <div className="sub-item-tiles-container">
              {!showTfgFolder ? (
                <>
                  <button 
                    className={`sub-item-tile ${!activeItemId ? 'active' : ''}`}
                    onClick={() => setSearchParams({})}
                  >
                    <div className="tile-icon">🏢</div>
                    <div className="tile-label">{translations.sections.experience}</div>
                  </button>
                  {regularItems.map(si => (
                    <button 
                      key={si.id}
                      className={`sub-item-tile ${activeItemId === si.id ? 'active' : ''}`}
                      onClick={() => setSearchParams({ item: si.id })}
                    >
                      <div className="tile-icon">🌐</div>
                      <div className="tile-label">{si.title[lang]}</div>
                    </button>
                  ))}
                  {tfgItems.length > 0 && (
                    <button 
                      className="sub-item-tile folder"
                      onClick={() => setShowTfgFolder(true)}
                    >
                      <div className="tile-icon">📁</div>
                      <div className="tile-label">TFGs ({tfgItems.length})</div>
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button 
                    className="sub-item-tile back"
                    onClick={() => {
                      setShowTfgFolder(false);
                      if (isTfg(activeSubItem)) setSearchParams({});
                    }}
                  >
                    <div className="tile-icon">🔙</div>
                    <div className="tile-label">Volver</div>
                  </button>
                  {tfgItems.map(si => (
                    <button 
                      key={si.id}
                      className={`sub-item-tile ${activeItemId === si.id ? 'active' : ''}`}
                      onClick={() => setSearchParams({ item: si.id })}
                    >
                      <div className="tile-icon">🎓</div>
                      <div className="tile-label">{si.title[lang]}</div>
                    </button>
                  ))}
                </>
              )}
            </div>
          )}

          <section className="detail-glass-card">
            <div className="detail-section-header">
              <h2 className="detail-section-title">
                {activeSubItem ? translations.experience.details : translations.experience.details}
              </h2>
              {isAdmin && (
                <button 
                  className="cta-btn mini edit-part-btn" 
                  onClick={() => {
                    if (activeSubItem) {
                      onEditSubItem(job.id, activeSubItem.id);
                    } else {
                      onEdit(job.id);
                    }
                  }}
                >
                  ✎ {activeSubItem ? 'EDITAR ESTE CUADRO' : 'EDITAR INFO GENERAL'}
                </button>
              )}
            </div>
            <p className="detail-long-description">
              {activeSubItem ? activeSubItem.desc?.[lang] : job.desc?.[lang]}
            </p>
            <ul className="detail-feature-list">
              {((activeSubItem ? activeSubItem.points?.[lang] : job.points?.[lang]) || []).map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="detail-sidebar-column">
          <div className="detail-glass-card">
            <h2 className="detail-section-title">Tecnologías y Competencias</h2>
            <div className="detail-badge-cloud">
              {job.tags && job.tags.map((tag, i) => (
                <Badge key={i} text={tag} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ExperienceDetailsPage;
