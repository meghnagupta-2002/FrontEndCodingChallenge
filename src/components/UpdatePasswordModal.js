import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';

const UpdatePasswordModal = ({ visible, onCancel }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Request payload:', values); // Debugging
        axios.put('/user/updatePassword', values)
            .then(() => {
                message.success('Password updated successfully');
                form.resetFields(); // Clear form after success
                onCancel();
            })
            .catch((error) => {
                console.error('Password update error:', error.response || error.message);
                if (error.response && error.response.data && error.response.data.message) {
                    message.error(error.response.data.message); // Show backend error message
                } else {
                    message.error('Failed to update password');
                }
            });
    };

    return (
        <Modal
            visible={visible}
            title="Update Password"
            onCancel={onCancel}
            footer={null}
        >
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{ username: '', newPassword: '' }} // Default empty values
            >
                <Form.Item
                    name="userName"
                    label="Username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Enter your username" />
                </Form.Item>
                <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                        { required: true, message: 'Please input your new password!' },
                        { min: 6, message: 'Password must be at least 6 characters long!' },
                    ]}
                >
                    <Input.Password placeholder="Enter your new password" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                        Update Password
                    </Button>
                    <Button onClick={onCancel}>Cancel</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdatePasswordModal;
