// app/[locale]/page.tsx
import React from 'react';
import NavBar from 'components/navbar';
import Hero from 'components/hero';
import Presentation from 'components/presentation';
import ProjectTimeline from '../components/timeline';
import LanguageGrid from '../components/language-grid';
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
      <LanguageGrid />
      <Footer />
    </div>
  );
}
