import React from 'react';
import { Modal, Form, Input, Button, message, Typography } from 'antd';
import axios from 'axios';
import '../styles/Modal.css';

const { Text, Link } = Typography;

const LoginModal = ({ visible, onCancel, onLogin, showSignupModal, showForgotPasswordModal }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        axios.post('/user/login', values)
            .then(response => {
                localStorage.setItem('token', response.data);
                message.success('Logged in successfully');
                onLogin(response.data);
                onCancel();
            })
            .catch(error => {
                console.error('Login error:', error);
                message.error('Login failed');
            });
    };

    return (
        <Modal
            visible={visible}
            title="Login"
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="username"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Text>Not a user? <Link onClick={() => { onCancel(); showSignupModal(); }}>Sign Up</Link></Text>
                </Form.Item>
                <Form.Item>
                    <Link onClick={() => { onCancel(); showForgotPasswordModal(); }}>Forgot Password</Link>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default LoginModal;