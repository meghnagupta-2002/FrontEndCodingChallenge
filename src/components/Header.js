import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import { BookOutlined, PlusOutlined, LogoutOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/Header.css';

const { Header: AntHeader } = Layout;

const Header = ({ isLoggedIn, showLoginModal, showSignupModal, showUpdatePasswordModal, onLogout }) => {
    return (
        <AntHeader>
            <div className="logo">Book Management</div>
            {isLoggedIn ? (
                <div className="header-content">
                    <Link to="/">
                        <Button icon={<BookOutlined />} type="link" className="header-btn">
                            Home
                        </Button>
                    </Link>
                    <Link to="/add">
                        <Button icon={<PlusOutlined />} type="link" className="header-btn">
                            Add Book
                        </Button>
                    </Link>
                    {/* <Button
                        icon={<LockOutlined />}
                        type="link"
                        className="header-btn"
                        onClick={showUpdatePasswordModal}
                    >
                        Update Password
                    </Button> */}
                    <Button
                        icon={<LogoutOutlined />}
                        onClick={onLogout}
                        className="logout-btn"
                    >
                        Logout
                    </Button>
                </div>
            ) : (
                <div style={{ float: 'right' }}>
                    <Button type="primary" onClick={showLoginModal} style={{ marginRight: '10px' }}>
                        Login
                    </Button>
                    <Button type="primary" onClick={showSignupModal} style={{ marginRight: '10px' }}>
                        Sign Up
                    </Button>
                </div>
            )}
        </AntHeader>
    );
};

export default Header;
