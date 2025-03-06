// app/[locale]/page.tsx
'use client';
import React from 'react';
import NavBar from 'components/navbar';
import Hero from 'components/hero';
import Presentation from 'components/presentation';
import ProjectTimeline from '../components/project-timeline';
import LanguageGrid from '../components/language-grid';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen">
      <NavBar />
      <Hero />
      <Presentation />
      <ProjectTimeline />
      <LanguageGrid />
      <Footer />
    </div>
  );
}