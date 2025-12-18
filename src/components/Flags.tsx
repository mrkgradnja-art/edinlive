import React from 'react'
import Image from 'next/image'

interface FlagProps {
  className?: string
}

export const UKFlag: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => {
  return (
    <Image
      src="/images/flags/gb.svg"
      alt="UK Flag"
      width={24}
      height={16}
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

export const CroatianFlag: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => {
  return (
    <Image
      src="/images/flags/hr.svg"
      alt="Croatian Flag"
      width={24}
      height={16}
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

export const GermanFlag: React.FC<FlagProps> = ({ className = 'w-6 h-4' }) => {
  return (
    <Image
      src="/images/flags/de.svg"
      alt="German Flag"
      width={24}
      height={16}
      className={className}
      style={{ objectFit: 'contain', display: 'block' }}
    />
  )
}

