// app/[locale]/page.tsx
import React from 'react';
import NavBar from 'components/navbar';
import Hero from 'components/hero';
import Presentation from '@/app/components/presentation/presentation';
import ProjectTimeline from '../components/timeline/timeline';
import TechnologieGrid from '../components/technologie-grid';
import Footer from '../components/footer';

export const metadata = {
  title: "Maxime Carpentier - Portfolio",
  description: "Maxime Carpentier's portfolio",
};

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
