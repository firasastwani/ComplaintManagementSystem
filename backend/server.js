const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 3001;

// PostgreSQL setup with Docker
const pool = new Pool({
  user: 'postgres',          
  host: 'localhost',
  database: 'complaints_db',
  password: 'mypassword',     
  port: 5001,                 // Changed from 5432 to 5001
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Complaint System Backend API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const validateComplaintInput = (data) => {

  

}