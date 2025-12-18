import React from 'react'

interface FlagProps {
  className?: string
}

export const UKFlag: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => {
  return (
    <img
      src="/images/flags/gb.svg"
      alt="UK Flag"
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

export const CroatianFlag: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => {
  return (
    <img
      src="/images/flags/hr.svg"
      alt="Croatian Flag"
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

export const GermanFlag: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => {
  return (
    <img
      src="/images/flags/de.svg"
      alt="German Flag"
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

