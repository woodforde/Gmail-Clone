import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Mail from './components/Mail';
import EmailList from './components/EmailList';

function App() {
  return (
    <Router>
      <div className="app">
        {/* Header */}
        <Header />
          <div className="app__body">
            {/* Sidebar */}
            <Sidebar />

            {/* Body (Email List) */}
            <Routes>
              <Route path="/mail" element={<Mail />} />
              <Route path="/" element={<EmailList />} />
            </Routes>
          </div>
      </div>
    </Router>
  );
}

export default App;
