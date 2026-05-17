# 📝 Team-B Inkpad

A modern, feature-rich note-taking application built with React, Vite, and Tailwind CSS. Create, manage, and organize your notes with an intuitive user interface and seamless authentication.

![React](https://img.shields.io/badge/React-19.2.6-61DAFB?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?style=flat&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.3.0-38B2AC?style=flat&logo=tailwindcss)
![Node](https://img.shields.io/badge/Node-16%2B-339933?style=flat&logo=node.js)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn installed
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd team-b-inkpad
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📋 Available Scripts

- **`npm run dev`** - Start the development server with hot module replacement
- **`npm run build`** - Build the project for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

## 🏗️ Project Structure

```
team-b-inkpad/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.jsx       # Primary button component
│   │   ├── Input.jsx        # Form input component
│   │   ├── Modal.jsx        # Modal & ConfirmModal components
│   │   ├── Toast.jsx        # Toast notification system
│   │   ├── Navbar.jsx       # Navigation bar
│   │   ├── Footer.jsx       # Footer component
│   │   ├── Layout.jsx       # Layout wrapper
│   │   ├── NotePad.jsx      # Note editor component
│   │   ├── Loader.jsx       # Loading indicator
│   │   ├── LoadingSpinnal.jsx # Spinning loader animation
│   │   └── ProtectedRoute.jsx # Route protection HOC
│   ├── pages/               # Page components
│   │   ├── login.jsx        # Login page
│   │   ├── register.jsx     # Registration page
│   │   ├── DashboardPage.jsx # Main notes dashboard
│   │   └── NotePage.jsx     # Individual note view/edit
│   ├── context/             # React Context for state management
│   │   └── AuthContext.jsx  # Authentication context
│   ├── services/            # API service layer
│   │   ├── api.js          # Base API configuration
│   │   ├── auth.js         # Authentication API calls
│   │   └── notes.js        # Notes API calls
│   ├── layouts/             # Layout components
│   │   └── RootLayout.jsx   # Root layout with routing
│   ├── assets/              # Static assets
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Public static files
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── eslint.config.js         # ESLint configuration
└── README.md               # This file
```

## ✨ Key Features

### 🔐 Authentication

- User registration with secure password handling
- Login with session management
- JWT token-based authentication
- Protected routes for authenticated users
- Persistent session management

### 📝 Note Management

- Create new notes with a rich text editor
- Edit existing notes with real-time updates
- Delete notes with confirmation modal
- View all notes in an organized dashboard
- Individual note view and editing page
- Fast search and filtering capabilities

### 🎨 UI/UX

- Responsive design optimized for all devices
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and spinners
- Modal dialogs for confirmations
- Clean, modern interface with Tailwind CSS
- Accessibility-first component design

### 🔌 API Integration

- RESTful API integration with backend
- API proxy configuration for development
- Comprehensive error handling
- User-friendly error messages
- Loading states management

## 🛠️ Tech Stack

### Frontend Framework

- **React 19.2.6** - Modern UI library with hooks
- **React Router DOM 7.15.1** - Client-side routing
- **React DOM 19.2.6** - DOM rendering

### Build & Development

- **Vite 8.0.12** - Lightning-fast build tool
- **@vitejs/plugin-react 6.0.1** - React plugin for Vite

### Styling & UI

- **Tailwind CSS 4.3.0** - Utility-first CSS framework
- **@tailwindcss/vite 4.3.0** - Tailwind integration with Vite
- **Lucide React 1.16.0** - Beautiful icon library

### Utilities

- **PropTypes 15.8.1** - Runtime type checking for props

### Development Tools

- **ESLint 10.3.0** - Code quality and style checking
- **ESLint Plugin React Hooks 7.1.1** - React Hooks linting
- **ESLint Plugin React Refresh 0.5.2** - Fast Refresh support

## 🎯 Component Documentation

### Button Component

Versatile button component with multiple variants and sizes.

```jsx
<Button
  variant="primary" // primary, secondary, outline, danger
  size="md" // sm, md, lg
  fullWidth={false}
  loading={false}
  onClick={handleClick}
  disabled={false}
>
  Click Me
</Button>
```

**Props:**

- `variant` - Style variant (primary, secondary, outline, danger)
- `size` - Button size (sm, md, lg)
- `fullWidth` - Stretch to container width
- `loading` - Show loading state with disabled button
- `onClick` - Click handler function
- `disabled` - Disable button interaction
- `className` - Additional CSS classes

### Input Component

Form input with label, error handling, and validation.

```jsx
<Input
  label="Username"
  type="text"
  placeholder="Enter username"
  value={value}
  onChange={handleChange}
  error={errorMessage}
  name="username"
/>
```

**Props:**

- `label` - Input label text
- `type` - Input type (text, email, password, etc.)
- `placeholder` - Placeholder text
- `value` - Current value
- `onChange` - Change handler
- `error` - Error message to display
- `name` - Input name attribute
- `className` - Additional CSS classes

### Modal Component

Flexible modal with title and customizable content.

```jsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Modal Title"
  size="md" // sm, md, lg, xl
>
  Modal content here
</Modal>
```

**Props:**

- `isOpen` - Control modal visibility
- `onClose` - Close handler
- `title` - Modal title
- `children` - Modal content
- `size` - Modal size (sm, md, lg, xl)

### ConfirmModal Component

Confirmation dialog with action buttons.

```jsx
<ConfirmModal
  isOpen={isOpen}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Delete Note?"
  message="This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger" // primary, secondary, outline, danger
  loading={false}
/>
```

**Props:**

- `isOpen` - Control visibility
- `onClose` - Close handler
- `onConfirm` - Confirm action handler
- `title` - Dialog title
- `message` - Confirmation message
- `confirmText` - Confirm button label
- `cancelText` - Cancel button label
- `variant` - Button variant
- `loading` - Loading state

### Toast System

Global toast notifications for user feedback.

```jsx
import { useToast } from "./App";

function MyComponent() {
  const toast = useToast();

  toast.success("Operation successful!");
  toast.error("An error occurred");
  toast.info("Information message");
  toast.warning("Warning message");
}
```

**Available Methods:**

- `toast.success(message, duration)` - Success notification
- `toast.error(message, duration)` - Error notification
- `toast.info(message, duration)` - Info notification
- `toast.warning(message, duration)` - Warning notification

## 🔄 API Integration

### Authentication Endpoints

- `POST /auth/register` - Register new user with email and password
- `POST /auth/login` - Authenticate user and receive token
- `POST /auth/logout` - Clear session and logout

### Notes Endpoints

- `GET /notes` - Fetch all notes for authenticated user
- `GET /notes/:id` - Fetch single note by ID
- `POST /notes` - Create new note (requires title, content)
- `PUT /notes/:id` - Update existing note
- `DELETE /notes/:id` - Delete note

### API Configuration

- **Base URL**: `https://task-manager-olk2.onrender.com`
- **Development Proxy**: `/api` routes are proxied in development
- **Authentication**: JWT token included in request headers

## 🎨 Styling & Theming

### Tailwind CSS Configuration

The project uses **Tailwind CSS 4.3.0** with custom extensions:

**Custom Animations:**

- `fade-in` - Smooth fade in animation (0.2s)
- `slide-up` - Slide up from bottom (0.3s)
- `slide-in` - Slide in from left (0.3s)

**Theme Colors:**

- Primary brand color: `#0E7C66` (teal)
- Custom color palette defined in `tailwind.config.js`

### CSS Variables

Global styles and variables are defined in `src/index.css`

## 🔐 Authentication & Authorization

### Authentication Flow

1. User registers with email and password
2. Credentials validated on backend
3. JWT token issued on successful login
4. Token stored in `AuthContext` for protected routes
5. Protected routes verify authentication status
6. Logout clears token and redirects to login

### Protected Routes

Routes under `/notes` are protected and require authentication. Unauthenticated users are redirected to login page.

### Session Persistence

Authentication state is managed through React Context and stored in browser storage for session persistence.

## 📱 Responsive Design

The application is fully responsive and optimized for:

- 📱 **Mobile**: 320px and up
- 📲 **Tablet**: 768px and up
- 💻 **Desktop**: 1024px and up
- 🖥️ **Large Desktop**: 1280px and up

All components use Tailwind's responsive prefixes for breakpoint-specific styling.

## 🚀 Deployment

### Production Build

Generate optimized production bundle:

```bash
npm run build
```

### Preview Production Build

Test the production build locally:

```bash
npm run preview
```

Build output is generated in the `dist/` directory, ready for deployment to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Any static hosting service

### Environment Configuration

Create `.env` file for environment-specific variables:

```env
VITE_API_URL=https://api.example.com
```

## 🐛 Development Tips

### Enable Fast Refresh

Vite's Fast Refresh automatically updates components during development without losing state.

### Tailwind IntelliSense

Install the "Tailwind CSS IntelliSense" VSCode extension for better autocomplete and suggestions.

### React DevTools

Install React DevTools browser extension for component debugging.

### ESLint

Run linter regularly to maintain code quality:

```bash
npm run lint
```

### Debug Mode

Check browser console for error messages and warnings during development.

## 📊 Performance Optimizations

- Code splitting via Vite
- Fast Refresh for instant updates
- Lazy loading of routes
- Optimized Tailwind CSS bundle
- Minimal dependencies for faster load

## 🤝 Contributing

This is a team project. Please follow these guidelines:

1. **Create feature branches** for new features

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Commit with clear messages**

   ```bash
   git commit -m "Add: description of changes"
   ```

3. **Follow code style** (ESLint enforced)

   ```bash
   npm run lint
   ```

4. **Test thoroughly** before submitting
5. **Submit pull requests** for code review
6. **Keep commits atomic** with focused changes

### Code Style Guidelines

- Use functional components with hooks
- Prefer const over let
- Use destructuring for props
- Keep components focused and single-purpose
- Document complex logic with comments

## 📝 Git Workflow

```bash
# Update from remote
git pull origin main

# Create and switch to feature branch
git checkout -b feature/feature-name

# Make changes and stage
git add .

# Commit changes
git commit -m "Type: description"

# Push to remote
git push origin feature/feature-name

# Create pull request
# (via GitHub interface)
```

## 📞 Support & Contact

For issues or questions:

1. Check existing GitHub issues first
2. Create new issue with detailed description
3. Include error messages and steps to reproduce
4. Contact team members for assistance

## 👥 Team

**Team B** - TECHX Coursework Project

### Team Members

- Add team member names here

## 📄 License

This project is part of an educational coursework and is proprietary to Team B.

---

**Last Updated**: May 2026  
**Version**: 0.0.0 (Development)  
**Status**: 🚧 In Development
