/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import BeyondWeb from './components/BeyondWeb';
import Skills from './components/Skills';
import Education from './components/Education';
import DesignProcess from './components/DesignProcess';
import DesignSystem from './components/DesignSystem';
import CaseStudiesSection from './components/CaseStudiesSection';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Ambient, Animation & Customizer Widgets
import InteractiveBackground from './components/InteractiveBackground';
import ScrollProgress from './components/ScrollProgress';
import ColorwayWidget from './components/ColorwayWidget';
import AnimatedSection from './components/AnimatedSection';

// Modals & Overlays
import CaseStudyModal from './components/CaseStudyModal';
import AboutModal from './components/AboutModal';
import CVModal from './components/CVModal';
import ImageLightbox from './components/ImageLightbox';
import PhotoUpdateModal from './components/PhotoUpdateModal';
import AdminGateModal from './components/AdminGateModal';
import UploadManagerModal from './components/UploadManagerModal';
import { portfolio } from './config/portfolio';

import { ProjectItem } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [caseStudyProject, setCaseStudyProject] = useState<ProjectItem | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isPhotoUpdateModalOpen, setIsPhotoUpdateModalOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    return localStorage.getItem('custom_profile_image') || '/images/alfi-shahriyar.jpg';
  });
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null);

  // Protected Admin Vault & Upload Management State
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return typeof window !== 'undefined' ? sessionStorage.getItem('alfi_admin_token') : null;
  });
  const [isAdminGateOpen, setIsAdminGateOpen] = useState(false);
  const [isUploadStudioOpen, setIsUploadStudioOpen] = useState(false);
  const [customProjects, setCustomProjects] = useState<ProjectItem[]>([]);
  const [allProjects, setAllProjects] = useState<ProjectItem[]>(portfolio.projects);

  // Fetch dynamically uploaded projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.customProjects)) {
            setCustomProjects(data.customProjects);
            setAllProjects([...data.customProjects, ...portfolio.projects]);
          }
        }
      } catch (err) {
        console.warn('Could not load custom projects from server:', err);
      }
    };
    fetchProjects();
  }, []);

  const handleOpenAdmin = () => {
    if (adminToken) {
      setIsUploadStudioOpen(true);
    } else {
      setIsAdminGateOpen(true);
    }
  };

  const handleAuthenticated = (token: string) => {
    setAdminToken(token);
    setIsAdminGateOpen(false);
    setIsUploadStudioOpen(true);
  };

  const handleLogout = async () => {
    if (adminToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` }
        });
      } catch (e) {
        console.warn('Logout error:', e);
      }
    }
    sessionStorage.removeItem('alfi_admin_token');
    setAdminToken(null);
    setIsUploadStudioOpen(false);
  };

  const handleProjectAdded = (newProj: ProjectItem) => {
    setCustomProjects((prev) => [newProj, ...prev]);
    setAllProjects((prev) => [newProj, ...prev]);
  };

  const handleProjectDeleted = (projId: string) => {
    setCustomProjects((prev) => prev.filter((p) => p.id !== projId));
    setAllProjects((prev) => prev.filter((p) => p.id !== projId));
  };

  // Day / Night Theme Management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
    localStorage.setItem('portfolio_theme', theme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#070a12' : '#f8fafc');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Monitor active section for navigation highlight
  useEffect(() => {
    const sections = ['home', 'about', 'projects', 'research', 'skills', 'education', 'case-studies', 'contact'];

    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenLightbox = (src: string, alt: string, caption?: string) => {
    setLightboxImage({ src, alt, caption });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070a12] dark:text-slate-100 selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden transition-colors duration-300 relative">
      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgress />

      {/* Floating Interactive Dynamic Background */}
      <InteractiveBackground />

      {/* Floating RGB Accent Customizer Widget */}
      <ColorwayWidget />

      {/* Top Fixed Navigation Bar */}
      <Navbar
        onOpenCV={() => setIsCVModalOpen(true)}
        activeSection={activeSection}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAdminGate={handleOpenAdmin}
      />

      <main className="relative z-10">
        {/* 1. Hero Section */}
        <Hero
          onOpenCV={() => setIsCVModalOpen(true)}
          onOpenImage={handleOpenLightbox}
          onOpenPhotoUpdater={() => setIsPhotoUpdateModalOpen(true)}
          profileImage={profilePhoto}
        />

        {/* 2. Editorial About Me */}
        <AnimatedSection>
          <About
            onOpenAboutModal={() => setIsAboutModalOpen(true)}
            onOpenImage={handleOpenLightbox}
            onOpenPhotoUpdater={() => setIsPhotoUpdateModalOpen(true)}
            profileImage={profilePhoto}
          />
        </AnimatedSection>

        {/* 3. Selected Projects & Filter System */}
        <AnimatedSection>
          <Projects
            onViewCaseStudy={(proj) => setCaseStudyProject(proj)}
            onOpenImage={handleOpenLightbox}
            projects={allProjects}
            onOpenAdminUpload={handleOpenAdmin}
          />
        </AnimatedSection>

        {/* 4. Research & Technology (Federated Learning & IDS) */}
        <AnimatedSection>
          <Research
            onOpenImage={handleOpenLightbox}
          />
        </AnimatedSection>

        {/* 5. Beyond the Web (Mobile, Visual Design, Interactive Game) */}
        <AnimatedSection>
          <BeyondWeb />
        </AnimatedSection>

        {/* 6. Skills & Tech Stack */}
        <AnimatedSection>
          <Skills />
        </AnimatedSection>

        {/* 7. Education, Academic Journey & Leadership */}
        <AnimatedSection>
          <Education
            onOpenImage={handleOpenLightbox}
          />
        </AnimatedSection>

        {/* 8. My Design Process (6 Phases) */}
        <AnimatedSection>
          <DesignProcess />
        </AnimatedSection>

        {/* 9. Interactive Design System Showcase */}
        <AnimatedSection>
          <DesignSystem
            theme={theme}
            onToggleTheme={handleToggleTheme}
          />
        </AnimatedSection>

        {/* 10. UX Case Studies In-Depth Section */}
        <AnimatedSection>
          <CaseStudiesSection
            onViewCaseStudy={(proj) => setCaseStudyProject(proj)}
            onOpenImage={handleOpenLightbox}
          />
        </AnimatedSection>

        {/* 11. Contact & Outreach */}
        <AnimatedSection>
          <Contact />
        </AnimatedSection>
      </main>

      {/* Footer & Back to Top */}
      <Footer />

      {/* Global Modals */}
      <CaseStudyModal
        project={caseStudyProject}
        isOpen={caseStudyProject !== null}
        onClose={() => setCaseStudyProject(null)}
        onOpenImage={handleOpenLightbox}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        profileImage={profilePhoto}
      />

      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
      />

      <ImageLightbox
        isOpen={lightboxImage !== null}
        onClose={() => setLightboxImage(null)}
        imageSrc={lightboxImage?.src || ''}
        imageAlt={lightboxImage?.alt || ''}
        caption={lightboxImage?.caption}
      />

      <PhotoUpdateModal
        isOpen={isPhotoUpdateModalOpen}
        onClose={() => setIsPhotoUpdateModalOpen(false)}
        onPhotoUpdated={(newMain) => {
          setProfilePhoto(newMain);
        }}
      />

      {/* Strict Security & Password Gate Modal */}
      <AdminGateModal
        isOpen={isAdminGateOpen}
        onClose={() => setIsAdminGateOpen(false)}
        onAuthenticated={handleAuthenticated}
      />

      {/* Protected Content Upload & Management Studio */}
      <UploadManagerModal
        isOpen={isUploadStudioOpen}
        onClose={() => setIsUploadStudioOpen(false)}
        token={adminToken}
        onLogout={handleLogout}
        onProjectAdded={handleProjectAdded}
        onProjectDeleted={handleProjectDeleted}
        customProjects={customProjects}
      />
    </div>
  );
}
