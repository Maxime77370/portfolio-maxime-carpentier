// app/[locale]/page.tsx
'use client';
import React from 'react';
import NavBar from 'components/navbar';
import Hero from 'components/hero';
import Presentation from 'components/presentation';
import ProjectTimeline from '../components/project-timeline';
import LanguageGrid from '../components/language-grid';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen">
      <NavBar />
      <Hero />
      <Presentation />
      <ProjectTimeline />
      <LanguageGrid />
      <footer className="text-center text-grey-700 py-4">
        <p>&copy; 2025 - Carpentier Maxime - Tous droits réservés</p>
      </footer>
    </div>
  );
}