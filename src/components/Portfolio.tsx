'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const projects = [
  {
    name: 'Shillworks',
    url: 'https://shillworks.com',
    description: 'Premium web platform showcasing innovative solutions',
    tech: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'PostgreSQL', 'Prisma'],
    image: '/images/shillworks.png',
  },
  {
    name: 'Collabora',
    url: 'https://collaboranow.com',
    description: 'Collaboration platform for modern teams',
    tech: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'PostgreSQL', 'Prisma'],
    image: '/images/collabora.png',
  },
  {
    name: 'Go Amico',
    url: 'https://goamico.com',
    description: 'Social networking and community platform',
    tech: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'PostgreSQL', 'Prisma'],
    image: '/images/goamico.png',
  },
  {
    name: 'Borsa',
    url: 'https://borsa.com.hr',
    description: 'Financial news and market analysis platform',
    tech: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'PostgreSQL', 'Prisma'],
    image: '/images/borsa.png',
  },
  {
    name: 'Mr Electric',
    url: 'https://mr-electric.hr',
    description: 'Professional electrical services website',
    tech: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'PostgreSQL', 'Prisma'],
    image: '/images/mrelectric.png',
  },
  {
    name: 'Fix Sleep',
    url: 'https://www.fixsleep.app/',
    description: 'Smart alarm app that helps you wake up refreshed based on sleep cycles',
    tech: ['React', 'TypeScript', 'Next.js', 'HTML', 'CSS', 'PostgreSQL', 'Prisma'],
    image: '/images/fixsleep.png',
  },
]

export default function Portfolio() {
  const { t } = useTranslation()

  return (
    <section id="portfolio" className="py-20 bg-luxury-black-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 text-gradient-gold">
            {t('portfolio.title')}
          </h2>
          <p className="text-xl text-luxury-text-muted font-montserrat">
            {t('portfolio.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-effect rounded-xl overflow-hidden hover:luxury-glow transition-all duration-300 group cursor-pointer"
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {/* Project Image */}
                <div className="relative w-full h-48 bg-luxury-black overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-luxury-gold/20 to-luxury-gold/5">
                      <div className="text-6xl font-serif text-luxury-gold/30">
                        {project.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold text-luxury-gold mb-2 group-hover:text-luxury-gold-light transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-luxury-text-muted mb-4 text-sm leading-relaxed font-montserrat">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-luxury-gold/20 text-luxury-gold text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 text-luxury-gold hover:text-luxury-gold-light transition-colors group-hover:gap-3">
                    {t('portfolio.viewSite')}
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

