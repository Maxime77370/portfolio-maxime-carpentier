// app/[locale]/page.tsx
'use client';
import React from 'react';
import NavBar from 'components/navbar';
import Hero from 'components/hero';
import Presentation from '@/app/components/presentation/presentation';
import ProjectTimeline from '../components/timeline/timeline';
import TechnologieGrid from '../components/technologie-grid';
import Footer from '../components/footer';

export default function HomePage() {
  return (
    <div className="bg-gradient-to-bl from-purple-900 to-blue-900 min-h-screen">
      <NavBar />
      <Hero />
      <Presentation />
      <ProjectTimeline />
      <TechnologieGrid />
      <Footer />
    </div>
  );
}
