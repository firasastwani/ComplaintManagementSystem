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


// Helper function for input validation
const validateComplaintInput = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.complaint || data.complaint.trim().length === 0) {
    errors.push('Complaint message is required');
  }
  
  return errors;
};

// POST /complaints - Create a new complaint
app.post('/complaints', async (req, res) => {

  try {
    const { name, email, complaint } = req.body;

    // Validate the input
    const validationErrors = validateComplaintInput(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }

    // Insert into the database
    const query = `
      INSERT INTO complaints (name, email, complaint, status, created_at) 
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING *
    `;
    
    const values = [name.trim(), email.trim(), complaint.trim(), 'Pending'];
    
    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Error creating complaint:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to submit complaint'
    });
  }
});



// GET /complaints - Retrieve all complaints
app.get('/complaints', async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM complaints
      ORDER BY created_at DESC
    `;

    const result = await pool.query(query);
    
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
    
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to fetch complaints'
    });
  }
});



// update the complaint status
app.patch('/complaints/:id', async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body

    if(!status || !['Pending', 'Resolved'].includes(status)){
      return res.status(400).json({
        error: 'Invalid status: Must be "Pending" or "Resolved"'
      });
    }

    const query = `
      UPDATE complaints
      SET status= $1
      WHERE id = $2
      RETURNING *
   `; 


    const result = await pool.query(query, [status, id])

    if(result.rows.length === 0){
      return res.status(404).json({
        success: false,
        error: 'Complaint not found'
      });
    }

    res.status(200).json({
      success:true,
      message: 'Complaint updated successfully',
      data: result.rows[0]
    });
  } catch (error){

    console.error('Error updating complaint: ', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Failed to update complaint'
    });
  }
});


// DELETE /complaints/:id - Delete a complaint
app.delete('/complaints/:id', async (req, res) => {

  try {
    const { id } = req.params;
    
    const query = `
      DELETE FROM complaints 
      WHERE id = $1 
      RETURNING *
    `;
    
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Complaint not found' 
      });
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Complaint deleted successfully',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: 'Failed to delete complaint'
    });
    
  }
});