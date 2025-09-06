-- Database initialization script for Complaint Management System
-- This script creates the database and initializes the schema

-- Create the database (this needs to be run as postgres superuser)
CREATE DATABASE complaints_db;

-- Connect to the new database
\c complaints_db;

-- Create the complaints table
CREATE TABLE complaints (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    complaint TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexing
CREATE INDEX idx_complaints_email ON complaints(email);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_created_at ON complaints(created_at);

-- Insert some dummy data
INSERT INTO complaints (name, email, complaint, status) VALUES
('Firas Astwani', 'firasastwani1@gmail.com', 'testing testing 123 testing.', 'Pending'),
('Jane Smith', 'jane.smith@example.com', 'Great service, the staff was very professional and resolved my issue quickly.', 'Resolved'),
('Unsatisfied customer', 'bob.johnson@example.com', 'I was charged incorrectly for my service. Please look into this matter.', 'Pending'),
('John Smith', 'johnsm@gmail.com', 'ServiceAgent saved me so much time on hiring! Thank You!!!!!', 'Pending');


SELECT 'Database initialization completed successfully!' as message;
