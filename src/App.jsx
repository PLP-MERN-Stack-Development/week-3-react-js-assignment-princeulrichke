import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import ApiData from './pages/ApiData';
import './App.css';

/**
 * Main App component with routing and theme context
 * @returns {JSX.Element} - App component
 */
function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/api-data" element={<ApiData />} />
          </Routes>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
