'use client'

import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Skills from '@/components/Skills'
import Packages from '@/components/Packages'
import Contact from '@/components/Contact'
import SEO from '@/components/SEO'

export default function Home() {
  return (
    <>
      <SEO />
      <main className="min-h-screen">
        <Hero />
        <Portfolio />
        <Skills />
        <Packages />
        <Contact />
      </main>
    </>
  )
}

