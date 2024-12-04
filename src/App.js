// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import axios from 'axios';
import Header from './components/Header';
import BookList from './components/BookList.js';
import BookForm from './components/BookForm';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import UpdatePasswordModal from './components/UpdatePasswordModal';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './components/HomePage';
import 'antd/dist/reset.css';
import './styles/App.css';

const { Content } = Layout;

// Set up axios defaults
axios.defaults.baseURL = 'http://localhost:8080';
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function App() {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isSignupModalVisible, setIsSignupModalVisible] = useState(false);
  const [isForgotPasswordModalVisible, setIsForgotPasswordModalVisible] = useState(false);
  const [isUpdatePasswordModalVisible, setIsUpdatePasswordModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    setIsLoginModalVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Layout className="layout">
        <Header
          isLoggedIn={isLoggedIn}
          showLoginModal={() => setIsLoginModalVisible(true)}
          showSignupModal={() => setIsSignupModalVisible(true)}
          showUpdatePasswordModal={() => setIsUpdatePasswordModalVisible(true)}
          onLogout={handleLogout}
        />
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Routes>
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    <PrivateRoute>
                      <BookList />
                    </PrivateRoute>
                  ) : (
                    <HomePage
                      showLoginModal={() => setIsLoginModalVisible(true)}
                      showSignupModal={() => setIsSignupModalVisible(true)}
                    />
                  )
                }
              />
              <Route
                path="/add"
                element={
                  <PrivateRoute>
                    <BookForm />
                  </PrivateRoute>
                }
              />
              <Route
                path="/edit/:isbn"
                element={
                  <PrivateRoute>
                    <BookForm />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </Content>
        {/* Modal Components */}
        <LoginModal
          visible={isLoginModalVisible}
          onCancel={() => setIsLoginModalVisible(false)}
          onLogin={handleLogin}
          showSignupModal={() => {
            setIsLoginModalVisible(false);
            setIsSignupModalVisible(true);
          }}
          showForgotPasswordModal={() => {
            setIsLoginModalVisible(false);
            setIsForgotPasswordModalVisible(true);
          }}
        />
        <SignupModal
          visible={isSignupModalVisible}
          onCancel={() => setIsSignupModalVisible(false)}
        />
        <ForgotPasswordModal
          visible={isForgotPasswordModalVisible}
          onCancel={() => setIsForgotPasswordModalVisible(false)}
        />
        <UpdatePasswordModal
          visible={isUpdatePasswordModalVisible}
          onCancel={() => setIsUpdatePasswordModalVisible(false)}
        />
      </Layout>
    </Router>
  );
}

export default App;
