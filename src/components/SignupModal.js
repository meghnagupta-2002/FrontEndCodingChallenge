import React, {useState} from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import '../styles/Modal.css';

const SignupModal = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.post('/user/register', values)
            .then(() => {
                message.success('Signed up successfully');
                onCancel();
            })
            .catch(error => {
                console.error('Signup error:', error);
                message.error('Signup failed');
            });
    };

    return (
        <Modal
            visible={visible}
            title="Sign Up"
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="userName"
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
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SignupModal;