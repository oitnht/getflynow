# GetFlyNow - Flight Tools & Travel Planning Application

## Overview

GetFlyNow is a comprehensive travel companion web application built as a React SPA (Single Page Application) that provides essential travel planning tools. The application focuses on helping travelers with visa requirements, promo codes, baggage rules, flight delays, and other travel-related information. It's designed as a modern, responsive web application optimized for both desktop and mobile users.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with a custom design system using CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **UI Components**: Radix UI primitives with custom styled components for accessible, reusable UI

### Component Structure
- **Layout Components**: Header, Footer, and page-specific layouts
- **Feature Components**: Tool-specific components for each travel service
- **UI Components**: Reusable design system components in `/src/components/ui/`
- **Page Components**: Route-specific page components in `/src/pages/`

### Data Management
- **Static Data**: Travel data (airlines, countries, promo codes) stored in TypeScript files
- **Mock API**: Currently uses simulated API calls with setTimeout for development
- **Caching**: React Query handles client-side caching with 5-minute stale time
- **No Backend**: Pure frontend application with no database requirements

## Key Components

### Core Pages
1. **Home Page**: Landing page with hero section, feature highlights, and tool navigation
2. **Visa Checker**: Country-to-country visa requirement checking tool
3. **Promo Code Finder**: Airline promotional code discovery and verification
4. **Baggage Rules**: Airline baggage policy and fee information
5. **Delay Radar**: Flight delay tracking and statistics
6. **Fee Explorer**: Comprehensive airline fee calculator
7. **Layover Planner**: Airport layover activity suggestions
8. **Support Pages**: Help center, contact form, privacy policy, terms of service

### UI System
- **Design Tokens**: CSS custom properties for consistent theming
- **Component Library**: Built on Radix UI for accessibility
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: CSS variable-based theming system (configured but not actively used)

### Data Sources
- **Airlines**: 50+ major airlines with codes and names
- **Countries**: 190+ countries with flags and visa information
- **Promo Codes**: Curated promotional codes with verification status
- **Mock APIs**: Simulated responses for all travel tools

## Data Flow

### Application Initialization
1. React app mounts and initializes React Query client
2. Wouter router handles client-side navigation
3. Header/Footer components provide consistent navigation
4. Individual pages load with their specific functionality

### Tool Interaction Pattern
1. User selects tool from homepage or navigation
2. Tool page renders with input forms (dropdowns, text inputs)
3. User fills required fields and submits search
4. Loading state shows while mock API "processes" request
5. Results display with formatted data and relevant actions
6. Users can copy codes, view details, or navigate to related tools

### State Management
- **Local State**: React useState for form inputs and UI state
- **Server State**: React Query for simulated API responses and caching
- **No Global State**: Application doesn't require complex state sharing

## External Dependencies

### Core Dependencies
- **React & React DOM**: UI framework and rendering
- **TypeScript**: Type safety and developer experience
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Wouter**: Lightweight routing library
- **React Query**: Server state management and caching

### UI Libraries
- **Radix UI**: Comprehensive set of accessible component primitives
- **Lucide React**: Modern icon library
- **Class Variance Authority**: Utility for building variant APIs
- **Tailwind Merge**: Utility for merging Tailwind classes

### Monetization
- **Google AdSense**: Integrated ad banner component for revenue generation
- **Ad Placements**: Strategic placement on high-traffic pages

### Development Tools
- **ESLint**: Code linting and quality enforcement
- **TypeScript**: Type checking and IntelliSense
- **PostCSS**: CSS processing for Tailwind

## Deployment Strategy

### Build Configuration
- **Vite Build**: Optimized production builds with code splitting
- **Manual Chunks**: Vendor libraries separated for better caching
- **TypeScript Compilation**: Full type checking during build process

### Hosting Options
- **Vercel**: Configured with vercel.json for static deployment
- **Replit**: Development environment with custom server configuration
- **Static Hosting**: Application is purely client-side and can be deployed anywhere

### Performance Optimizations
- **Code Splitting**: Vendor chunks separated for optimal loading
- **Asset Optimization**: Vite handles asset bundling and optimization
- **CDN Ready**: Static assets can be served from CDN
- **React Query Caching**: Reduces redundant API calls and improves UX

### Security Headers
- **X-Content-Type-Options**: MIME type sniffing protection
- **X-Frame-Options**: Clickjacking protection
- **X-XSS-Protection**: Cross-site scripting protection

The application is designed to be a comprehensive travel tool with room for future enhancements like real API integrations, user accounts, and expanded travel services.