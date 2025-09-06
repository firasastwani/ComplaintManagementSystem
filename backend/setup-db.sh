#!/bin/bash

# Simple database setup script for Complaint Management System
set -e

echo "Setting up database..."

# Start PostgreSQL container
docker run --name postgres-complaint -e POSTGRES_PASSWORD=mypassword -p 5001:5432 -d postgres:15

# Wait for PostgreSQL to start
echo "Waiting for PostgreSQL to start..."
sleep 10

# Initialize database
echo "Creating database and schema..."
docker exec -i postgres-complaint psql -U postgres < init-db.sql

echo "Database setup complete"
echo "You can now run: npm run dev"
