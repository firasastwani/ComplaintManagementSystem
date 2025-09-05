import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { ClientForm } from './components/ClientForm';
import { AdminDashboard } from './components/AdminDashboard';
import { SuccessPage } from './components/SuccessPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ClientForm />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;