# FlightTools - Travel Companion App

## Overview

FlightTools is a comprehensive travel companion web application built with React, Express, and PostgreSQL. It provides essential flight-related tools for travelers including promo code discovery, baggage rules lookup, visa checking, delay tracking, fee exploration, and layover planning. The application follows a modern full-stack architecture with a React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with custom styling

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: In-memory storage (development) with extensible interface
- **Development**: Hot reloading with Vite integration

### Data Storage
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with TypeScript-first approach
- **Schema**: Shared schema definitions between frontend and backend
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Core Pages
1. **Home Page** - Landing page with tool overview and navigation
2. **Promo Code Finder** - Search for airline discount codes
3. **Baggage Rules Lookup** - Check airline baggage policies
4. **Visa Checker** - Verify travel document requirements
5. **Delay Radar** - Track flight delays and disruptions
6. **Fee Explorer** - Compare airline fees and charges
7. **Layover Planner** - Plan airport layover activities

### Shared Components
- **Layout Components**: Header with navigation, Footer with links
- **UI Components**: Comprehensive shadcn/ui component library
- **Tool Cards**: Reusable cards for feature presentation
- **Statistics Section**: User engagement metrics display

### Data Layer
- **User Management**: Basic user schema with authentication fields
- **Storage Interface**: Abstracted storage layer supporting multiple backends
- **API Structure**: RESTful endpoints with Express routing

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle business logic
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with error handling middleware
5. **State Updates**: React Query manages client-side cache updates

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with extensive Radix UI components
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React icon library
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date manipulation

### Backend Dependencies
- **Database**: Neon Database (PostgreSQL) with connection pooling
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **Development**: tsx for TypeScript execution
- **Build**: esbuild for server-side bundling

### Development Tools
- **TypeScript**: Strict type checking across the stack
- **ESLint**: Code linting (configured via shadcn/ui)
- **Vite**: Frontend build tool with development server
- **Replit Integration**: Runtime error overlay and development banner

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds optimized React application
2. **Backend Build**: esbuild bundles server code for production
3. **Database Setup**: Drizzle migrations applied to PostgreSQL
4. **Asset Optimization**: Static assets served from dist/public

### Environment Configuration
- **Development**: Hot reloading with Vite middleware
- **Production**: Compiled server serving static assets
- **Database**: Environment-based connection strings
- **Sessions**: Configurable storage backends

### Production Considerations
- **Static Assets**: Served directly by Express in production
- **Database Migrations**: Automated through Drizzle Kit
- **Error Handling**: Comprehensive error middleware
- **Security**: CORS and session configuration ready

The application is designed to be easily deployable to cloud platforms with minimal configuration changes, supporting both development and production environments seamlessly.