import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function syncData() {
  const cvDataPath = path.join(__dirname, 'cvData.json');
  const splitDir = path.join(__dirname, 'cv_data');

  const data = await fs.readJson(cvDataPath);
  
  const languages = ['es', 'ca', 'en'];
  const shared = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    location: data.location,
    linkedin: data.linkedin,
    github: data.github,
    skills: data.skills,
    certificates: data.certificates.map(c => ({
      id: c.id,
      title: c.title,
      issuer: c.issuer,
      date: c.date,
      file: c.file
    }))
  };

  const langData = {
    es: { profile: data.profile.es, skills: { leadership: data.skills.leadership || [] }, experience: [], education: [], projects: [], certificates: [], volunteering: [] },
    ca: { profile: data.profile.ca, skills: { leadership: data.skills.leadership || [] }, experience: [], education: [], projects: [], certificates: [], volunteering: [] },
    en: { profile: data.profile.en, skills: { leadership: data.skills.leadership || [] }, experience: [], education: [], projects: [], certificates: [], volunteering: [] }
  };

  // Experience
  data.experience.forEach(exp => {
    languages.forEach(l => {
      langData[l].experience.push({
        company: exp.company,
        role: exp.role?.[l] || exp.role || "",
        desc: exp.desc?.[l] || exp.desc || "",
        tags: exp.tags || [],
        points: exp.points?.[l] || exp.points || [],
        date: exp.date
      });
    });
  });

  // Education
  data.education.forEach(edu => {
    languages.forEach(l => {
      langData[l].education.push({
        id: edu.id,
        school: edu.school,
        date: edu.date,
        grade: edu.grade?.[l] || edu.grade || "",
        category: edu.category?.[l] || edu.category || "",
        title: edu.title?.[l] || edu.title || "",
        explanation: edu.explanation?.[l] || edu.explanation || "",
        tfg: edu.tfg ? {
          grade: edu.tfg.grade,
          file: edu.tfg.file,
          title: edu.tfg.title?.[l] || edu.tfg.title || "",
          description: edu.tfg.description?.[l] || edu.tfg.description || ""
        } : undefined
      });
    });
  });

  // Projects
  data.projects.forEach(p => {
    languages.forEach(l => {
      langData[l].projects.push({
        id: p.id,
        name: p.name?.[l] || p.name || "",
        date: p.date,
        tags: p.tags || [],
        desc: p.desc?.[l] || p.desc || "",
        points: p.points?.[l] || p.points || [],
        techStack: p.techStack || [],
        security: p.security?.[l] || p.security || [],
        links: p.links || {}
      });
    });
  });

  // Certificates
  data.certificates.forEach(c => {
    languages.forEach(l => {
      langData[l].certificates.push({
        description: c.description?.[l] || c.description || ""
      });
    });
  });

  // Volunteering
  data.volunteering.forEach(v => {
    languages.forEach(l => {
      langData[l].volunteering.push({
        location: v.location,
        date: v.date,
        org: v.org,
        desc: v.desc?.[l] || v.desc || ""
      });
    });
  });

  await fs.writeJson(path.join(splitDir, 'shared.json'), shared, { spaces: 2 });
  for (const l of languages) {
    await fs.writeJson(path.join(splitDir, `${l}.json`), langData[l], { spaces: 2 });
  }

  console.log('✅ Data synchronized successfully to cv_data/*.json');
}

// Run if direct execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncData().catch(console.error);
}

