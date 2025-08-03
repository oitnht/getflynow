# GetFlyNow - Free AI Travel Planning Tool

## Overview

GetFlyNow is a completely free web application for generating quick 3-5 day budget-friendly trip itineraries using AI. No registration, no limits, no premium features - just simple, fast travel planning for everyone.

The application features a modern React frontend with shadcn/ui components, an Express.js backend, and integrates with Google Gemini AI for intelligent itinerary generation. Users can generate unlimited AI-powered itineraries and download them as PDFs for offline use. The app includes affiliate links for flight and hotel bookings to monetize the free service.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript in a single-page application (SPA) architecture
- **Routing**: Wouter for lightweight client-side routing with main routes for auth, dashboard, and trips
- **UI Framework**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS for styling
- **State Management**: TanStack React Query for server state management and caching
- **Authentication**: Context-based auth provider with JWT token storage in localStorage
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework using ES modules
- **API Design**: RESTful API architecture with JWT-based authentication middleware
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Authentication**: bcrypt for password hashing and jsonwebtoken for session management
- **AI Integration**: OpenAI API integration for generating trip itineraries using GPT-4
- **Environment Configuration**: Environment variables for sensitive data like database URLs and API keys

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless connection pooling
- **Schema Structure**: 
  - Users table with email/password authentication
  - Trips table with foreign key relationship to users
  - JSONB storage for flexible itinerary data structure
- **Migration Strategy**: Drizzle Kit for schema migrations and database synchronization

### Authentication & Security
- **Password Security**: bcrypt hashing with salt rounds for secure password storage
- **Session Management**: JWT tokens with configurable secret key
- **API Protection**: Authentication middleware protecting all trip-related endpoints
- **CORS Configuration**: Development and production CORS policies for cross-origin requests

### AI Integration Strategy
- **AI Provider**: OpenAI GPT-4 API for natural language processing and itinerary generation
- **Prompt Engineering**: Structured prompts optimized for travel planning with budget constraints
- **Data Structure**: Standardized itinerary format with days, activities, costs, and categories
- **Error Handling**: Graceful fallbacks and user feedback for AI generation failures

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database for scalable data storage
- **AI Services**: OpenAI API for GPT-4 powered itinerary generation
- **Development Platform**: Replit with cartographer plugin for enhanced development experience

### Frontend Dependencies
- **UI Components**: Extensive Radix UI component library for accessible, unstyled primitives
- **Styling**: Tailwind CSS with custom design tokens and responsive utilities
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Icons**: Lucide React for consistent iconography throughout the application

### Backend Dependencies
- **Database**: Drizzle ORM for type-safe database queries and migrations
- **Security**: bcrypt for password hashing, CORS for cross-origin security
- **Utilities**: Various middleware for logging, JSON parsing, and request handling

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript for static typing across the entire codebase
- **Database Tools**: Drizzle Kit for schema management and database operations