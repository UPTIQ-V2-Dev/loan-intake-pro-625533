# Loan Intake App - Technical Implementation Plan

## Project Overview

A comprehensive loan intake application built with React 19, Vite, shadcn/ui, and Tailwind v4. The app will guide users through a multi-step loan application process with form validation, document uploads, and real-time progress tracking.

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4
- **Form Management**: React Hook Form + Zod validation
- **State Management**: TanStack Query for server state
- **Routing**: React Router DOM v7
- **Testing**: Vitest + React Testing Library
- **HTTP Client**: Axios

## Core Features

1. Multi-step loan application form
2. Document upload and management
3. Real-time form validation
4. Application progress tracking
5. Admin dashboard for loan review
6. User authentication and profile management

## Page-by-Page Implementation Plan

### 1. Authentication Pages

#### `/login` - Login Page

**Components:**

- `LoginForm` - Form with email/password fields
- `AuthLayout` - Wrapper layout for auth pages

**Utils/Services:**

- `authService.login()` - API call for authentication
- `validateLoginForm()` - Form validation helper

**Types:**

- `LoginCredentials` interface
- `AuthUser` interface

**API Endpoints:**

- `POST /api/auth/login`
- `POST /api/auth/refresh`

#### `/register` - Registration Page

**Components:**

- `RegisterForm` - Multi-step registration form
- `StepIndicator` - Progress indicator component

**Utils/Services:**

- `authService.register()` - User registration API
- `validateRegistrationForm()` - Form validation

**Types:**

- `RegistrationData` interface
- `RegistrationStep` enum

**API Endpoints:**

- `POST /api/auth/register`
- `POST /api/auth/verify-email`

### 2. Main Application Pages

#### `/dashboard` - User Dashboard

**Components:**

- `DashboardLayout` - Main app layout with sidebar
- `ApplicationCard` - Loan application summary card
- `RecentActivity` - Activity timeline component
- `QuickActions` - Action buttons for common tasks

**Utils/Services:**

- `loanService.getUserApplications()` - Fetch user's applications
- `formatApplicationStatus()` - Status formatting utility

**Types:**

- `LoanApplication` interface
- `ApplicationStatus` enum
- `UserActivity` interface

**API Endpoints:**

- `GET /api/loans/user/{userId}`
- `GET /api/user/activity`

#### `/apply` - Loan Application Form

**Components:**

- `ApplicationWizard` - Multi-step form container
- `PersonalInfoStep` - Personal information form
- `EmploymentStep` - Employment details form
- `FinancialStep` - Financial information form
- `DocumentsStep` - Document upload interface
- `ReviewStep` - Application review and submission
- `ProgressBar` - Application progress indicator
- `FormNavigation` - Previous/Next navigation

**Utils/Services:**

- `loanService.createApplication()` - Create new application
- `loanService.updateApplication()` - Update existing application
- `uploadService.uploadDocument()` - Document upload
- `validateApplicationData()` - Form validation per step
- `calculateLoanEligibility()` - Eligibility calculation
- `formatCurrency()` - Currency formatting utility

**Types:**

- `PersonalInfo` interface
- `EmploymentInfo` interface
- `FinancialInfo` interface
- `DocumentType` enum
- `ApplicationStep` enum
- `LoanApplicationData` interface

**API Endpoints:**

- `POST /api/loans/applications`
- `PUT /api/loans/applications/{id}`
- `POST /api/documents/upload`
- `GET /api/loans/eligibility`

#### `/applications` - Applications List

**Components:**

- `ApplicationsTable` - Sortable/filterable table
- `StatusBadge` - Status indicator component
- `ApplicationActions` - Action dropdown menu
- `FilterPanel` - Advanced filtering options

**Utils/Services:**

- `loanService.getApplications()` - Fetch applications with pagination
- `formatDate()` - Date formatting utility
- `exportApplications()` - Export functionality

**Types:**

- `ApplicationsFilter` interface
- `PaginationParams` interface
- `SortOption` interface

**API Endpoints:**

- `GET /api/loans/applications`
- `GET /api/loans/applications/export`

#### `/application/{id}` - Application Details

**Components:**

- `ApplicationHeader` - Application summary header
- `ApplicationTimeline` - Status timeline component
- `DocumentViewer` - Document preview component
- `NotesSection` - Internal notes (admin only)
- `ActionButtons` - Approve/Reject/Request More Info

**Utils/Services:**

- `loanService.getApplicationById()` - Fetch single application
- `loanService.updateApplicationStatus()` - Status updates
- `documentService.getDocument()` - Document retrieval

**Types:**

- `ApplicationDetails` interface
- `ApplicationNote` interface
- `StatusUpdate` interface

**API Endpoints:**

- `GET /api/loans/applications/{id}`
- `PUT /api/loans/applications/{id}/status`
- `GET /api/documents/{id}`
- `POST /api/loans/applications/{id}/notes`

#### `/profile` - User Profile Management

**Components:**

- `ProfileForm` - User information form
- `PasswordChangeForm` - Password update form
- `NotificationSettings` - Notification preferences

**Utils/Services:**

- `userService.getProfile()` - Get user profile
- `userService.updateProfile()` - Update profile
- `userService.changePassword()` - Password change

**Types:**

- `UserProfile` interface
- `NotificationPreferences` interface

**API Endpoints:**

- `GET /api/users/profile`
- `PUT /api/users/profile`
- `PUT /api/users/change-password`

### 3. Admin Pages (Role-based Access)

#### `/admin/dashboard` - Admin Dashboard

**Components:**

- `AdminStats` - Key metrics cards
- `ApplicationsChart` - Analytics charts
- `RecentApplications` - Latest applications table

**Utils/Services:**

- `adminService.getDashboardStats()` - Admin statistics
- `chartDataFormatter()` - Chart data processing

**Types:**

- `AdminStats` interface
- `ChartData` interface

**API Endpoints:**

- `GET /api/admin/stats`
- `GET /api/admin/applications/recent`

#### `/admin/applications` - Admin Applications Management

**Components:**

- `AdminApplicationsTable` - Enhanced table with admin actions
- `BulkActionsToolbar` - Bulk operation controls
- `ApplicationFilters` - Advanced admin filters

**Utils/Services:**

- `adminService.getApplications()` - Admin applications view
- `adminService.bulkUpdateApplications()` - Bulk operations

**API Endpoints:**

- `GET /api/admin/applications`
- `PUT /api/admin/applications/bulk`

## Common Components & Utils

### Layout Components

- `AppLayout` - Main application wrapper
- `AuthLayout` - Authentication pages wrapper
- `Sidebar` - Navigation sidebar
- `Header` - Top navigation bar
- `Footer` - Application footer

### Shared UI Components

- `LoadingSpinner` - Loading states
- `ErrorBoundary` - Error handling
- `ConfirmDialog` - Confirmation modals
- `NotificationToast` - Toast notifications
- `FileUpload` - Drag-and-drop file upload
- `DataTable` - Reusable data table
- `SearchInput` - Search with debouncing
- `DateRangePicker` - Date selection

### Common Utils

- `api.ts` - Axios configuration and interceptors
- `auth.ts` - Authentication helpers
- `validation.ts` - Zod schemas and validators
- `formatters.ts` - Data formatting utilities
- `constants.ts` - Application constants
- `storage.ts` - Local storage utilities
- `permissions.ts` - Role-based access control

### Custom Hooks

- `useAuth()` - Authentication state management
- `useLoanApplication()` - Application form state
- `useDocumentUpload()` - File upload handling
- `usePermissions()` - Role-based permissions
- `useDebounce()` - Input debouncing
- `usePagination()` - Table pagination

## API Service Layer

### Core Services

- `authService.ts` - Authentication operations
- `loanService.ts` - Loan application CRUD
- `userService.ts` - User profile management
- `documentService.ts` - Document upload/retrieval
- `adminService.ts` - Admin operations
- `notificationService.ts` - Push notifications

### API Types

- `api/auth.ts` - Authentication types
- `api/loans.ts` - Loan application types
- `api/users.ts` - User management types
- `api/documents.ts` - Document handling types
- `api/common.ts` - Shared API types

## Testing Strategy

### Testing Framework Setup

- **Test Runner**: Vitest with React Testing Library
- **Test Environment**: happy-dom for lightweight DOM simulation
- **Coverage**: Vitest coverage with v8 provider
- **Mocking**: MSW (Mock Service Worker) for API mocking

### Test File Organization

```
src/
├── test/
│   ├── setup.ts                    # Global test setup
│   ├── test-utils.tsx              # Custom render utilities
│   ├── mocks/
│   │   ├── handlers.ts             # MSW request handlers
│   │   ├── server.ts               # MSW server setup
│   │   └── data/                   # Mock data fixtures
│   └── __fixtures__/               # Test data fixtures
├── components/
│   ├── ui/
│   │   ├── button.test.tsx
│   │   ├── form.test.tsx
│   │   └── ...
│   └── loan/
│       ├── ApplicationWizard.test.tsx
│       ├── PersonalInfoStep.test.tsx
│       └── ...
├── pages/
│   ├── Login.test.tsx
│   ├── Dashboard.test.tsx
│   ├── LoanApplication.test.tsx
│   └── ...
├── hooks/
│   ├── useAuth.test.tsx
│   ├── useLoanApplication.test.tsx
│   └── ...
├── services/
│   ├── authService.test.ts
│   ├── loanService.test.ts
│   └── ...
└── utils/
    ├── validation.test.ts
    ├── formatters.test.ts
    └── ...
```

### Unit/Component Testing Strategy

#### Component Tests

- **UI Components**: Test rendering, props, user interactions
- **Form Components**: Validation, submission, error states
- **Layout Components**: Responsive behavior, navigation

#### Hook Tests

- **Custom Hooks**: State management, side effects, error handling
- **Form Hooks**: Validation, field updates, submission flow

#### Service Tests

- **API Services**: HTTP calls, error handling, data transformation
- **Utility Functions**: Input/output validation, edge cases

### Integration Testing

#### Page-Level Tests

- **Authentication Flow**: Login/logout, registration, password reset
- **Loan Application**: Multi-step form completion, validation
- **Dashboard**: Data loading, user interactions
- **Admin Features**: Role-based access, bulk operations

#### API Integration Tests

- **Request/Response**: Proper API communication
- **Error Handling**: Network failures, validation errors
- **Authentication**: Token management, refresh logic

### Test Utilities

#### Custom Render Utilities (`src/test/test-utils.tsx`)

```typescript
// Custom render with providers
export const renderWithProviders = (ui, options?) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClient client={testQueryClient}>
        <BrowserRouter>
          <AuthProvider>
            {children}
          </AuthProvider>
        </BrowserRouter>
      </QueryClient>
    ),
    ...options,
  });
};

// Render hook with providers
export const renderHookWithProviders = (hook, options?) => {
  return renderHook(hook, {
    wrapper: ProvidersWrapper,
    ...options,
  });
};
```

#### Mock Service Worker Setup (`src/test/mocks/`)

- **API Handlers**: Mock all backend endpoints
- **Authentication**: Mock login/logout flows
- **File Uploads**: Mock document upload responses
- **Error Scenarios**: Mock various error conditions

### Key Test Cases

#### Form Validation Tests

- Required field validation
- Format validation (email, phone, SSN)
- Cross-field validation
- File upload validation
- Real-time validation feedback

#### State Transition Tests

- Application status changes
- Multi-step form navigation
- Authentication state changes
- Loading and error states

#### Error Handling Tests

- Network error scenarios
- Validation error display
- Retry mechanisms
- Fallback UI states

#### Accessibility Tests

- Keyboard navigation
- Screen reader compatibility
- Focus management
- ARIA attributes

### Test Data Management

- **Fixtures**: Consistent test data across tests
- **Factories**: Dynamic test data generation
- **Mock Responses**: Realistic API response data
- **User Scenarios**: Different user types and permissions

### Performance Testing

- **Component Rendering**: Measure render performance
- **Memory Leaks**: Cleanup after tests
- **Bundle Size**: Monitor component bundle impact
- **Load Testing**: Simulate high user interaction

### Test Commands

- `npm run test` - Run tests in watch mode
- `npm run test:ci` - Run tests once for CI
- `npm run test:coverage` - Generate coverage report
- `npm run test:ui` - Interactive test UI

## Implementation Phases

### Phase 1: Foundation (Week 1-2)

- Set up routing and layout components
- Implement authentication system
- Create base UI components and form infrastructure
- Set up testing framework and basic tests

### Phase 2: Core Application (Week 3-4)

- Build loan application wizard
- Implement document upload system
- Create user dashboard
- Add comprehensive form validation

### Phase 3: Advanced Features (Week 5-6)

- Build admin dashboard and management tools
- Add application review workflow
- Implement notifications system
- Complete test coverage

### Phase 4: Polish & Optimization (Week 7)

- Performance optimization
- Accessibility improvements
- Error handling and edge cases
- Final testing and bug fixes

This plan provides a comprehensive roadmap for building a robust loan intake application with proper testing coverage and maintainable code architecture.
