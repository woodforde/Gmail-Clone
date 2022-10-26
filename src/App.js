import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Mail from './pages/Mail';
import EmailList from './pages/EmailList';
import SendMail from './components/SendMail';
import Login from './components/Login';

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        //the user is logged in
        dispatch(login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }))
      } else {
        // the user is logged out
        dispatch(logout({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL,
        }))
      }
    })
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          {/* Header */}
          <Header />
            <div className="app__body">
              {/* Sidebar */}
              <Sidebar />

              {/* Body (Email List) */}
              <Routes>
                <Route path="/" element={<Navigate to="/inbox" />} />
                <Route path="/:sidebarOption" element={<EmailList />} />
                <Route path="/:sidebarOption/:id" element={<Mail />} />
              </Routes>
            </div>

            { sendMessageIsOpen && <SendMail /> }
        </div>
      )}
    </Router>
  );
}

export default App;
