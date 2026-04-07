import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Notifications from './pages/Notifications/Notifications';
import AdminDashboard from './pages/Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="App" dir="rtl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;