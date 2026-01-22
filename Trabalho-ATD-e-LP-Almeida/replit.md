# replit.md

## Overview

This is a "Click Tracker" application - a simple full-stack web app that records button clicks with timestamps and daily sequence numbers. Users click buttons to register interactions, and the app displays the click's sequence number (which resets daily), date, and time. The frontend shows a history of today's clicks with smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: shadcn/ui component library (Radix UI primitives)
- **Animations**: Framer Motion for smooth list and button animations
- **Build Tool**: Vite with path aliases (@/ for client/src, @shared for shared)

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **Language**: TypeScript with tsx for development
- **API Design**: REST endpoints with Zod validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Response Format**: JSON with structured error responses

### Data Storage
- **Database**: PostgreSQL (required via DATABASE_URL environment variable)
- **Schema Location**: shared/schema.ts
- **Migrations**: Drizzle Kit with migrations in /migrations folder
- **Key Table**: `clicks` table with id, buttonLabel, sequenceNumber, and clickedAt timestamp

### API Structure
- `POST /api/clicks` - Create a new click record (returns sequence, date, time, buttonLabel)
- `GET /api/clicks/today` - List all clicks from today
- Routes are defined declaratively in shared/routes.ts with Zod schemas for type safety

### Build Process
- Development: `npm run dev` runs tsx with Vite middleware
- Production: `npm run build` uses esbuild for server and Vite for client
- Output: dist/index.cjs (server) and dist/public (client assets)

## External Dependencies

### Database
- **PostgreSQL**: Required, connection via DATABASE_URL environment variable
- **Session Storage**: connect-pg-simple for session management (available but not currently used)

### Key NPM Packages
- **drizzle-orm / drizzle-kit**: Database ORM and migration tooling
- **@tanstack/react-query**: Async state management
- **framer-motion**: Animation library
- **date-fns**: Date formatting (Portuguese locale support)
- **zod / drizzle-zod**: Schema validation and type generation

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development banner