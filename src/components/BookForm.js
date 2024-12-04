import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/BookForm.css';

const BookForm = () => {
    const [form] = Form.useForm();
    const [bookData, setBookData] = useState(null);
    const navigate = useNavigate();
    const { isbn } = useParams();

    useEffect(() => {
        if (isbn) {
            axios.get(`/book/getbook/${isbn}`)
                .then((response) => {
                    setBookData(response.data);
                    form.setFieldsValue(response.data);
                })
                .catch((error) => {
                    message.error('Failed to fetch book details');
                });
        }
    }, [isbn, form]);

    const handleSubmit = (values) => {
        if (isbn) {
            // Edit book
            axios.put(`/book/update/${isbn}`, values)
                .then(() => {
                    message.success('Book updated successfully');
                    navigate('/');
                })
                .catch((error) => {
                    message.error('Failed to update book');
                });
        } else {
            // Add new book
            axios.post('/book/add', values)
                .then(() => {
                    message.success('Book added successfully');
                    navigate('/');
                })
                .catch((error) => {
                    message.error('Failed to add book');
                });
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <div className="book-form-container">
            <h2>{isbn ? 'Edit Book' : 'Add New Book'}</h2>
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={bookData}
            >
                <Form.Item
                    label="ISBN"
                    name="isbn"
                    rules={[{ required: true, message: 'Please input ISBN!' }]}>
                    <Input disabled={isbn} />
                </Form.Item>
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input book title!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Author"
                    name="author"
                    rules={[{ required: true, message: 'Please input author name!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Year"
                    name="year"
                    rules={[{ required: true, message: 'Please input publisher!' }]}>
                    <Input />
                </Form.Item>
                <div className="form-actions">
                    <Button type="primary" htmlType="submit">
                        {isbn ? 'Update Book' : 'Add Book'}
                    </Button>
                    <Button
                        type="default"
                        onClick={handleCancel}
                        style={{ marginLeft: 10 }}
                    >
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default BookForm;
