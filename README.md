# Edin Live - Luxury Portfolio Website

A modern, luxury portfolio website built with Next.js 14, featuring premium web design, development services, and AI integration.

## Features

- 🎨 **Luxury Dark Theme** - Elegant dark design with gold accents
- 🌍 **Multi-Language Support** - English, Croatian, and German
- 📧 **Email Notifications** - Automated email system for inquiries
- 🎭 **Smooth Animations** - Framer Motion for beautiful transitions
- 📱 **Fully Responsive** - Mobile-first design
- 🔍 **SEO Optimized** - Complete SEO setup with metadata and structured data
- 🗄️ **Database** - PostgreSQL with Prisma ORM

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: react-i18next
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Email**: Nodemailer

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Email account (for notifications)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd EdinLive
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/edinlive?schema=public"
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
EdinLive/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   ├── lib/              # Utilities and services
│   └── locales/          # Translation files
├── prisma/               # Database schema
├── public/               # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Email Setup

For Gmail:
1. Enable 2-factor authentication
2. Generate an App Password
3. Use the App Password in `EMAIL_PASS`

For other providers, adjust `EMAIL_HOST` and `EMAIL_PORT` accordingly.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database

Use a managed PostgreSQL service:
- [Supabase](https://supabase.com)
- [Railway](https://railway.app)
- [Neon](https://neon.tech)

Update `DATABASE_URL` in your deployment environment.

## Features Overview

### Hero Section
- Large hero image with overlay
- Smooth scroll animations
- CTA button to packages

### Portfolio Section
- Grid layout showcasing projects
- Project cards with links
- Technology tags

### Skills Section
- Categorized expertise display
- Interactive skill cards

### Service Packages
- Three pricing tiers
- Package inquiry modal with payment method selection

### Contact Section
- Contact form
- Social media links
- Email notifications

## License

Private - All rights reserved

## Contact

For inquiries, email: info@edin.live

