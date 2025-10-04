# Timesheet Management System - TenTwenty Assessment

A modern, full-featured timesheet management application built with React 18, TypeScript, Vite, React Router v6, and TailwindCSS. This project demonstrates clean code architecture, responsive design, and efficient state management.

![Timesheet App](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Vite](https://img.shields.io/badge/Vite-5.4-purple) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-teal)

## 🚀 Live Demo

**[View Live Application](your-deployment-url-here)**

## 📸 Screenshots

### Login Page
Clean, split-screen login with branded right panel

### Dashboard - Table View
Weekly timesheet overview with status indicators and pagination

### Dashboard - List View
Detailed card-based view with individual entry management

## ✨ Features

### Core Functionality
- ✅ **Secure Authentication** - Session-based login with dummy credentials
- ✅ **52 Weeks Management** - Complete 2025 calendar with auto-generated weeks
- ✅ **Dual View Modes** - Switch between table and list views
- ✅ **Pagination** - Display 5 weeks per page with smart navigation
- ✅ **CRUD Operations** - Create, read, update, and delete timesheet entries
- ✅ **Status Management** - Track Pending, Approved, and Rejected entries
- ✅ **Real-time Updates** - Instant reflection of changes across all views

### Technical Features
- ✅ **TypeScript** - Full type safety throughout the application
- ✅ **React Router v6** - Protected routes and navigation
- ✅ **Context API** - Global state management for authentication
- ✅ **API Layer** - Simulated backend with proper async operations
- ✅ **Responsive Design** - Mobile, tablet, and desktop optimized
- ✅ **Component Architecture** - Reusable, modular components
- ✅ **Error Handling** - User-friendly error messages and validation

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18.3 |
| **Build Tool** | Vite 5.4 |
| **Language** | TypeScript 5.0 |
| **Routing** | React Router v6 |
| **Styling** | TailwindCSS 3.4 |
| **State Management** | React Context API + Hooks |
| **Development** | ESLint, PostCSS, Autoprefixer |

## 📦 Installation & Setup

### Prerequisites
- Node.js 18.0 or higher
- npm or yarn package manager

### Quick Start


## 🔐 Demo Credentials

Use these credentials to access the application:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@tentwenty.com | admin123 |
| **Developer** | developer@tentwenty.com | dev123 |

## 📁 Project Structure

timesheet-app-react/
├── public/ # Static assets
├── src/
│ ├── api/ # API layer (simulated backend)
│ │ ├── authApi.ts # Authentication endpoints
│ │ └── timesheetApi.ts # Timesheet CRUD operations
│ ├── components/ # Reusable components
│ │ ├── DeleteConfirmModal.tsx
│ │ ├── EditModal.tsx
│ │ └── ProtectedRoute.tsx
│ ├── contexts/ # React Context providers
│ │ └── AuthContext.tsx # Authentication state management
│ ├── data/ # Mock data layer
│ │ └── mockData.ts # Sample users and entries
│ ├── pages/ # Page components
│ │ ├── Dashboard.tsx # Main dashboard with views
│ │ └── Login.tsx # Authentication page
│ ├── styles/ # Global styles
│ │ └── index.css # Tailwind imports
│ ├── types/ # TypeScript definitions
│ │ └── index.ts # Interface definitions
│ ├── App.tsx # Root component with routing
│ └── main.tsx # Application entry point
├── index.html # HTML template
├── package.json # Dependencies and scripts
├── tsconfig.json # TypeScript configuration
├── vite.config.ts # Vite configuration
├── tailwind.config.js # Tailwind CSS configuration
└── postcss.config.js # PostCSS configuration


## 🎯 Key Implementation Details

### Authentication Flow
- Session-based authentication using `sessionStorage`
- Protected routes with `ProtectedRoute` component
- Context API for global auth state management
- Automatic redirect on login/logout

### Data Management
- Simulated API with realistic async delays
- Mock data for 52 weeks of 2025
- Auto-generated weekly timesheets with date ranges
- CRUD operations with immediate UI updates

### Component Architecture
- Functional components with React Hooks
- Custom hooks for authentication (`useAuth`)
- Modal components for edit/delete operations
- Conditional rendering for view modes

### Styling Approach
- Utility-first CSS with TailwindCSS
- Responsive design with mobile-first approach
- Consistent color scheme and spacing
- Interactive hover states and transitions

## 📊 Features Breakdown

### Dashboard Views

#### Table View
- Compact weekly overview
- Sortable columns (Week #, Date Range, Hours, Entries, Status)
- Quick action buttons (View, Edit)
- Status badges with color coding
- Pagination with 5 weeks per page

#### List View
- Detailed card layout per week
- Expandable entry details
- Individual entry actions (Edit, Delete)
- Project and description visibility
- Status indicators for each entry

### Entry Management
- **Create**: Add new timesheet entries (future feature)
- **Read**: View all entries in table/list format
- **Update**: Edit entry details via modal form
- **Delete**: Remove entries with confirmation dialog

### Pagination System
- Smart page number display (shows 5 pages max)
- Previous/Next navigation
- Current page highlighting
- Dynamic range calculation
- Responsive to data changes

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create production build in `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development Notes

### Code Quality
- Strict TypeScript configuration
- ESLint for code consistency
- Component-based architecture
- Separation of concerns (API, UI, State)

### Performance Optimizations
- Vite for fast HMR (Hot Module Replacement)
- Lazy loading potential for routes
- Efficient re-rendering with React hooks
- Optimized production builds

### Future Enhancements
- [ ] Add new entry creation form
- [ ] Implement entry filtering and search
- [ ] Add export functionality (PDF/CSV)
- [ ] Weekly/monthly reports dashboard
- [ ] User profile management
- [ ] Dark mode toggle
- [ ] Unit and integration tests
- [ ] Backend API integration

## 🎨 Design Philosophy

This project follows modern React best practices:
- **Component Composition**: Breaking UI into reusable pieces
- **Type Safety**: Leveraging TypeScript for fewer runtime errors
- **State Management**: Context API for global state, local state for components
- **API Abstraction**: Separate layer for data operations
- **Responsive Design**: Mobile-first approach with TailwindCSS

## ⏱️ Development Timeline

- **Planning & Setup**: 2 hour
- **Authentication & Routing**: 2 hour
- **Dashboard & Views**: 3 hours
- **CRUD Operations**: 2.5 hours
- **Styling & Responsiveness**: 2 hour
- **Testing & Bug Fixes**: 1 hours

**Total Time**: ~12 hours

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [React Router Tutorial](https://reactrouter.com/en/main)

## 🤝 Assessment Requirements Checklist

### Required Features
- ✅ Login screen with authentication
- ✅ Dashboard with timesheet entries
- ✅ Table view with required columns
- ✅ Next.js/React with TypeScript
- ✅ TailwindCSS for styling
- ✅ API integration (internal routes)
- ✅ Proper state management
- ✅ Responsive layout

### Bonus Features Implemented
- ✅ Add/Edit modal for entries
- ✅ Form validation
- ✅ Error handling
- ✅ List view (additional view mode)
- ✅ Delete functionality with confirmation
- ✅ 52 weeks pagination

### Code Quality
- ✅ Reusable, modular components
- ✅ Clear naming conventions
- ✅ TypeScript interfaces
- ✅ Separated concerns (API, UI, State)
- ✅ Clean project structure

### Documentation
- ✅ Comprehensive README
- ✅ Setup instructions
- ✅ Code comments where needed
- ✅ Project structure explanation

## 🐛 Known Issues

None at the moment. If you encounter any issues, please report them.

## 📄 License

This project was created as part of a technical assessment for TenTwenty.

## 👨‍💻 Developer

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

Created for TenTwenty's front-end developer assessment. Thank you for the opportunity!

---

**Built with ❤️ using React + Vite + TypeScript**

*Last Updated: October 2025*
