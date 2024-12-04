import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ForgotPasswordModal = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        axios.put('/user/updatePassword', values)
            .then(() => {
                message.success('Password updated successfully');
                onCancel();
            })
            .catch(error => {
                console.error('Password update error:', error);
                message.error('Failed to update password');
            });
    };

    return (
        <Modal
            visible={visible}
            title="Forgot Password"
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
                    label="New Password"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Password
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ForgotPasswordModal;