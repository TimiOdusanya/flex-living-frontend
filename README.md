# Flex Living Reviews Dashboard - Frontend

A modern, responsive frontend application for managing property reviews and analytics for Flex Living.

## Tech Stack

- **Next.js 15** with **TypeScript**
- **Tailwind CSS** for styling
- **ShadCN/UI** for component library
- **Framer Motion** for animations
- **GSAP** for advanced animations
- **Zustand** for state management
- **Axios** for API communication
- **Lucide React** for icons

## Features

### 🏠 Landing Page
- Modern, responsive design replicating Flex Living website
- Hero section with call-to-action
- Feature highlights and benefits
- Property showcase with ratings and pricing
- Smooth animations and transitions

### 🔐 Manager Authentication
- Secure login system with JWT tokens
- Role-based access control
- Protected routes for dashboard access
- Demo credentials for testing

### 📊 Manager Dashboard
- Comprehensive review management interface
- Real-time statistics and analytics
- Advanced filtering and search capabilities
- Review approval/rejection workflow
- Property performance tracking
- Responsive design for all devices

### 🏡 Property Details Page
- Replicates Flex Living property page layout
- Displays approved reviews only
- Interactive booking interface
- Property amenities and features
- Guest review showcase with ratings

### 🎨 UI/UX Features
- Modern glass-morphism design
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Dark/light theme support
- Accessible components with proper ARIA labels
- Loading states and error handling

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── manager/           # Manager dashboard pages
│   ├── properties/        # Property detail pages
│   └── page.tsx          # Landing page
├── components/            # Reusable UI components
│   └── ui/               # ShadCN/UI components
├── lib/                  # Utility functions and API
├── store/                # Zustand state management
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Pages & Routes

### Public Pages
- `/` - Landing page with property showcase
- `/properties/[id]` - Property details with reviews

### Manager Pages
- `/manager/login` - Manager authentication
- `/manager/dashboard` - Review management dashboard

## State Management

### Auth Store (Zustand)
- User authentication state
- JWT token management
- Login/logout functionality
- Persistent storage with localStorage

### Review Store (Zustand)
- Review data management
- Filter and search state
- Dashboard statistics
- Loading and error states

## API Integration

### Authentication API
- Login with email/password
- JWT token management
- User profile retrieval
- Automatic token refresh

### Reviews API
- Fetch reviews with filtering
- Approve/reject reviews
- Get dashboard statistics
- Property management

## Design System

### Color Palette
- Primary: Blue (#2563eb)
- Secondary: Gray (#6b7280)
- Success: Green (#10b981)
- Warning: Yellow (#f59e0b)
- Error: Red (#ef4444)

### Typography
- Font Family: Inter (system fonts)
- Headings: Bold weights (600-700)
- Body: Regular weight (400)
- Captions: Medium weight (500)

### Spacing
- Consistent spacing scale using Tailwind CSS
- Responsive spacing for different screen sizes
- Proper component padding and margins

## Animation & Interactions

### Framer Motion
- Page transitions and route animations
- Component entrance animations
- Hover and focus states
- Loading animations

### GSAP
- Advanced scroll-triggered animations
- Complex timeline animations
- Performance-optimized animations
- Cross-browser compatibility

## Responsive Design

### Breakpoints
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

### Mobile-First Approach
- Optimized for mobile devices
- Touch-friendly interactions
- Responsive navigation
- Adaptive layouts

## Performance Optimizations

### Next.js Features
- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting and lazy loading

### Bundle Optimization
- Tree shaking for unused code
- Dynamic imports for large components
- Optimized bundle size
- Fast refresh in development

## Accessibility

### WCAG Compliance
- Proper semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### User Experience
- Intuitive navigation
- Clear visual hierarchy
- Consistent interaction patterns
- Error handling and feedback

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development Guidelines

### Code Style
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Consistent naming conventions

### Component Guidelines
- Reusable and composable components
- Proper prop typing
- Default props and fallbacks
- Error boundaries

