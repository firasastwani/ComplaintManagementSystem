# Complaint Management System

### Frontend

- React 19.1.1 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons

### Backend

- Node.js with Express
- PostgreSQL database
- Input validation and error handling

### Database

- PostgreSQL 15 (Dockerized)
- Connection pooling for performance

## Set up and installation instructions:

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) 
- [Docker](https://www.docker.com/) (for PostgreSQL)

### 1. Clone the Repository

### 2. Database Setup (Automated)

I've provided an automated setup script that handles all database initialization:

#### Quick Setup (Recommended)

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Run the automated setup script:**

   ```bash
   ./setup-db.sh
   ```

#### Database Schema

The database includes the following table structure:

```sql
CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    complaint TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Note:** The automated script also creates indexes for better performance and includes sample data for testing.

### 3. Backend Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the backend server:**

   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:3001`

### 4. Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

### Project Structure

```
ServiceAgent/
├── backend/
│   ├── server.js          # Express server and API routes
│   ├── setup-db.sh        # Database setup script
│   ├── init-db.sql        # Database initialization SQL
│   ├── package.json       # Backend dependencies
│   └── node_modules/      # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── App.tsx        # Main React component
│   ├── package.json       # Frontend dependencies
│   └── vite.config.ts     # Vite configuration
└── README.md              # This file
```

## Assumptions and Tradeoffs

This section outlines the design decisions, assumptions, and tradeoffs made during development, along with potential improvements for production deployment.

### Backend Architecture

#### Current Implementation

- **Monolithic Express server** with all routes in a single file
- **Direct database queries** in route handlers
- **Basic input validation** using custom functions
- **Simple error handling** with try-catch blocks

#### Tradeoffs Made

- **Simplicity over Scalability**: Single-file approach prioritizes quick development over enterprise patterns
- **Direct DB Access**: Not using an ORM or quuery builder, but rather just hitting the DB directly
- **Minimal Error Handling**: Basic error responses to keep code concise

#### Potential Improvements

- **Service Layer Separation**: Better seperation of concerns, in my experience building out APIs in Spring Boot, seperating business logic from API request logic keeps the system scalable, readable and reusable, even with 100s of APIs and service methods. Given more time I would strip this out better
- **Repository Pattern**: Implement data access abstraction for better testability
- **Middleware Architecture**: Add authentication, logging, and rate limiting middleware
- **Database Migrations**: Add proper migration system for schema changes
- **Connection Pooling**: Optimize database connections for high-traffic scenarios 

### Frontend Architecture

#### Current Implementation

- **Inline Type Definitions**: Types defined within components to avoid import issues (had some trouble with this in development)
- **Direct API Calls**: Fetch calls directly in components 
- **No State Management**: Using local component state only
- **No Authentication**: Public access to admin dashboard

#### Tradeoffs Made

- **Type Safety vs. Simplicity**: Inline types avoid build issues but reduce reusability
- **Component Coupling**: API logic mixed with UI components (bad practice in production setting)
- **No Auth for Demo**: Admin dashboard accessible without authentication for testing

#### Potential Improvements

- **Centralized Type System**: Create proper type definitions with better organization
- **API Service Layer**: Centralize API calls with proper error handling and caching
- **Authentication System**: Add JWT-based auth with role-based access control (have implemneted in a different project, time consuming but smooth and secure)
- **Route Protection**: Implement protected routes for admin functionality 

### Data Validation & Security

#### Current Implementation

- **Basic Email Regex**: Simple regex for email validation, just checking basic format
- **No Input Sanitization**: Direct database insertion, without checks on user inputs

#### Tradeoffs Made

- **Speed over Security**: Prioritized quick implementation over comprehensive security
- **Client Validation**: Relied on frontend validation for user experience

#### Potential Improvements

- **Robust Email Validation**: Implement comprehensive 2 factor email authentication
- **SQL Injection Prevention**: Add parameterized queries and input validation
- **Rate Limiting**: Implement request throttling to prevent abuse...

### Database Design

#### Current Implementation

- **Simple Schema**: Basic table structure with minimal relationships
- **No Indexing Strategy**: Basic primary key only
- **No Data Archiving**: All data stored in single table

#### Tradeoffs Made

- **Simplicity over Optimization**: Basic schema for quick development
- **No Data Retention Policy**: All complaints stored indefinitely

#### Potential Improvements

- **Data Archiving**: Implement soft deletes and data retention policies
- **Audit Logging**: Track all changes to complaints for compliance
- **Backup Strategy**: Implement automated backup and recovery procedures


### Performance Considerations


### Testing Strategy

#### Current Implementation

- **No Test Coverage**: No automated tests implemented
- **Manual Testing Only**: Relied on manual testing during development using Postman

#### Tradeoffs Made

- **Speed over Quality**: Prioritized development speed over test coverage

#### Potential Improvements

- **Unit Testing**: Comprehensive unit tests for all components and functions
- **Integration Testing**: API endpoint testing with test database
- **End-to-End Testing**: Automated browser testing for user workflows
- **Test Coverage**: Aim for 80%+ code coverage
- **Performance Testing**: Load testing for scalability validation
- **Security Testing**: Automated security vulnerability scanning

### Future Enhancements

#### Short-term (1-2 weeks)

- Add proper authentication system
- Implement server-side validation
- Add comprehensive error handling
- Create proper type definitions

#### Medium-term (1-2 months)

- Implement state management
- Add comprehensive testing
- Optimize database queries
- Add monitoring and logging

#### Long-term (3-6 months)

- Microservices architecture
- Advanced security features
- Performance optimization
- Scalability improvements

---

