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

- [Node.js](https://nodejs.org/) (v16 or higher)
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
   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start
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
